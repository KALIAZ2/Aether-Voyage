
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { SearchParams, ViewState, GlobeSettings, Flight } from '../types';

// Constants to bypass TypeScript IntrinsicElements check for R3F elements
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const DirectionalLight = 'directionalLight' as any;
const SphereGeometry = 'sphereGeometry' as any;
const MeshPhongMaterial = 'meshPhongMaterial' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const CircleGeometry = 'circleGeometry' as any;
const RingGeometry = 'ringGeometry' as any;

// Fonction pour convertir Lat/Lon en Vector3 sur une sphère
function getPosition(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return new THREE.Vector3(x, y, z);
}

// --- ASSETS & TEXTURES ---
const TEXTURES = {
    map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
};

// Composant Marqueur de Ville
const CityMarker = ({ position, name, type }: any) => {
  const ref = useRef<THREE.Group>(null);
  
  const color = type === 'origin' ? '#0ea5e9' : '#f43f5e'; // Blue for origin, Red for dest

  useFrame((state) => {
    if (ref.current) {
        ref.current.lookAt(state.camera.position);
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
        ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Group position={position} ref={ref}>
      <Mesh>
        <CircleGeometry args={[0.05, 16]} />
        <MeshBasicMaterial color={color} transparent opacity={1} />
      </Mesh>
      <Mesh>
        <RingGeometry args={[0.06, 0.08, 32]} />
        <MeshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </Mesh>
      <Html distanceFactor={12} zIndexRange={[100, 0]} style={{pointerEvents: 'none'}}>
        <div className={`px-2 py-0.5 rounded text-[8px] font-bold backdrop-blur-md border transition-all duration-300 whitespace-nowrap bg-black/60 border-white/10 text-white`}>
          {name}
        </div>
      </Html>
    </Group>
  );
};

const FlightPath = ({ start, end, color = "#38bdf8" }: { start: THREE.Vector3, end: THREE.Vector3, color?: string }) => {
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(start.length() + 1.5);
    return (
        <QuadraticBezierLine
            start={start}
            end={end}
            mid={mid}
            color={color}
            lineWidth={1.5}
            transparent
            opacity={0.8}
        />
    );
}

const Earth = ({ showAtmosphere }: { showAtmosphere: boolean }) => {
    const [colorMap, specularMap, normalMap, cloudsMap] = useLoader(THREE.TextureLoader, [
        TEXTURES.map,
        TEXTURES.specular,
        TEXTURES.normal,
        TEXTURES.clouds
    ]);

    const cloudsRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0003;
        }
    });

    return (
        <Group>
            <Mesh>
                <SphereGeometry args={[2.5, 64, 64]} />
                <MeshPhongMaterial
                    map={colorMap}
                    specularMap={specularMap}
                    normalMap={normalMap}
                    specular={new THREE.Color(0x333333)}
                    shininess={15}
                />
            </Mesh>

            {showAtmosphere && (
                <>
                    <Mesh ref={cloudsRef} scale={[1.015, 1.015, 1.015]}>
                        <SphereGeometry args={[2.5, 64, 64]} />
                        <MeshStandardMaterial
                            map={cloudsMap}
                            transparent
                            opacity={0.4}
                            blending={THREE.AdditiveBlending}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                        />
                    </Mesh>
                    <Mesh scale={[1.1, 1.1, 1.1]}>
                        <SphereGeometry args={[2.5, 32, 32]} />
                        <MeshBasicMaterial
                            color="#0ea5e9"
                            transparent
                            opacity={0.15}
                            side={THREE.BackSide}
                            blending={THREE.AdditiveBlending}
                        />
                    </Mesh>
                </>
            )}
        </Group>
    );
};

// Scène Principale
interface GlobeSceneProps {
    flights?: Flight[];
    settings: GlobeSettings;
}

const GlobeScene = ({ flights = [], settings }: GlobeSceneProps) => {
  const globeRadius = 2.5;

  // Calculate paths based on available filtered flights
  const flightPaths = useMemo(() => {
      return flights.map(f => ({
          id: f.id,
          start: getPosition(f.coordinates.start.lat, f.coordinates.start.lon, globeRadius),
          end: getPosition(f.coordinates.end.lat, f.coordinates.end.lon, globeRadius),
          color: f.type === 'Première' ? '#fbbf24' : f.type === 'Business' ? '#a78bfa' : '#38bdf8',
          originName: f.origin.split(' ')[0],
          destName: f.dest.split(' ')[0]
      }));
  }, [flights]);

  return (
    <>
      <AmbientLight intensity={0.4} color="#ffffff" />
      <DirectionalLight position={[15, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <PointLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />

      <Group rotation={[0, 0, 0.41]}>
        <Suspense fallback={
             <Mesh>
                <SphereGeometry args={[globeRadius, 32, 32]} />
                <MeshBasicMaterial color="#1e293b" wireframe />
             </Mesh>
        }>
            <Earth showAtmosphere={settings?.showAtmosphere ?? true} />
        </Suspense>

        {flightPaths.map((path, i) => (
            <React.Fragment key={i}>
                <CityMarker position={path.start} name={path.originName} type="origin" />
                <CityMarker position={path.end} name={path.destName} type="dest" />
                <FlightPath start={path.start} end={path.end} color={path.color} />
            </React.Fragment>
        ))}

      </Group>

      <OrbitControls 
        enablePan={false} 
        enableZoom={settings?.zoomEnabled ?? true} 
        minDistance={4} 
        maxDistance={8}
        autoRotate={settings?.rotationSpeed > 0}
        autoRotateSpeed={settings?.rotationSpeed ?? 0.5}
        rotateSpeed={0.4}
        zoomSpeed={0.6}
      />
      <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

interface Globe3DProps {
    searchParams: SearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
    setView: React.Dispatch<React.SetStateAction<ViewState>>;
    settings?: GlobeSettings;
    flights?: Flight[];
}

export const Globe3D: React.FC<Globe3DProps> = ({ flights, settings, ...props }) => {
  return (
    <div className="w-full h-full cursor-move">
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}>
            <GlobeScene flights={flights} settings={settings || { rotationSpeed: 0.5, showAtmosphere: true, zoomEnabled: true }} />
        </Canvas>
    </div>
  );
};
