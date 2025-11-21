import React, { useRef, useEffect, useState } from 'react';
import { Icons } from './Icons';
import { Button } from './UI';

interface MiniGameProps {
    onClose: () => void;
}

export const MiniGame: React.FC<MiniGameProps> = ({ onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highScore, setHighScore] = useState(0);

    // Game State Refs (pour éviter les re-renders pendant la boucle de jeu)
    const gameState = useRef({
        plane: { x: 100, y: 300, width: 60, height: 30, dy: 0, speed: 5 },
        obstacles: [] as { x: number, y: number, width: number, height: number, type: 'bird' | 'storm' }[],
        coins: [] as { x: number, y: number, size: number, value: number }[],
        clouds: [] as { x: number, y: number, size: number, speed: number }[],
        keys: { ArrowUp: false, ArrowDown: false },
        frame: 0,
        score: 0,
        speed: 3,
        lastTime: 0
    });

    const requestRef = useRef<number>(0);

    // Initialisation et redimensionnement
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gameState.current.plane.y = canvas.height / 2;
        };
        window.addEventListener('resize', resize);
        resize();

        // Initial Clouds
        for (let i = 0; i < 10; i++) {
            gameState.current.clouds.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 40 + 20,
                speed: Math.random() * 1 + 0.5
            });
        }

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Gestion des contrôles
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowUp' || e.code === 'Space') gameState.current.keys.ArrowUp = true;
            if (e.code === 'ArrowDown') gameState.current.keys.ArrowDown = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'ArrowUp' || e.code === 'Space') gameState.current.keys.ArrowUp = false;
            if (e.code === 'ArrowDown') gameState.current.keys.ArrowDown = false;
        };

        // Touch controls
        const handleTouchStart = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            if (touchY < window.innerHeight / 2) gameState.current.keys.ArrowUp = true;
            else gameState.current.keys.ArrowDown = true;
        };
        const handleTouchEnd = () => {
            gameState.current.keys.ArrowUp = false;
            gameState.current.keys.ArrowDown = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const startGame = () => {
        setIsPlaying(true);
        setGameOver(false);
        setScore(0);
        gameState.current.score = 0;
        gameState.current.speed = 3;
        gameState.current.obstacles = [];
        gameState.current.coins = [];
        if (canvasRef.current) gameState.current.plane.y = canvasRef.current.height / 2;
        
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const gameLoop = (time: number) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        const canvas = canvasRef.current;
        const state = gameState.current;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Sky Background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0ea5e9'); // Sky 500
        gradient.addColorStop(1, '#bae6fd'); // Sky 200
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update Physics
        if (state.keys.ArrowUp) state.plane.dy = -state.speed * 1.5;
        else if (state.keys.ArrowDown) state.plane.dy = state.speed * 1.5;
        else state.plane.dy = state.plane.dy * 0.9; // Friction/Gravity reset

        state.plane.y += state.plane.dy;

        // Boundaries
        if (state.plane.y < 0) state.plane.y = 0;
        if (state.plane.y > canvas.height - state.plane.height) state.plane.y = canvas.height - state.plane.height;

        // Move Environment
        state.frame++;
        state.score += 0.1;
        if (state.frame % 600 === 0) state.speed += 0.5; // Increase speed

        // Handle Clouds
        state.clouds.forEach(cloud => {
            cloud.x -= cloud.speed;
            if (cloud.x + cloud.size < 0) {
                cloud.x = canvas.width + Math.random() * 100;
                cloud.y = Math.random() * canvas.height;
            }
            // Draw Cloud
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Spawners
        if (state.frame % 120 === 0) {
            // Spawn Obstacle
            const type = Math.random() > 0.5 ? 'bird' : 'storm';
            state.obstacles.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - 50),
                width: type === 'bird' ? 30 : 50,
                height: type === 'bird' ? 20 : 50,
                type
            });
        }
        if (state.frame % 80 === 0) {
            // Spawn Coin
            state.coins.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - 30),
                size: 15,
                value: 10
            });
        }

        // Draw & Update Coins
        state.coins.forEach((coin, index) => {
            coin.x -= state.speed;
            // Draw Coin (Star)
            ctx.fillStyle = '#fbbf24'; // Amber 400
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(Math.cos((18 + i * 72) * 0.0174532925) * coin.size + coin.x, 
                           -Math.sin((18 + i * 72) * 0.0174532925) * coin.size + coin.y);
                ctx.lineTo(Math.cos((54 + i * 72) * 0.0174532925) * (coin.size/2) + coin.x, 
                           -Math.sin((54 + i * 72) * 0.0174532925) * (coin.size/2) + coin.y);
            }
            ctx.closePath();
            ctx.fill();

            // Collision Coin
            if (
                state.plane.x < coin.x + coin.size &&
                state.plane.x + state.plane.width > coin.x - coin.size &&
                state.plane.y < coin.y + coin.size &&
                state.plane.y + state.plane.height > coin.y - coin.size
            ) {
                state.score += 50;
                state.coins.splice(index, 1);
            }

            // Cleanup
            if (coin.x < -50) state.coins.splice(index, 1);
        });

        // Draw & Update Obstacles
        state.obstacles.forEach((obs, index) => {
            obs.x -= state.speed * (obs.type === 'bird' ? 1.5 : 1); // Birds fly faster towards you
            
            // Draw
            if (obs.type === 'bird') {
                ctx.fillStyle = '#374151'; // Gray 700
                ctx.beginPath();
                ctx.moveTo(obs.x, obs.y);
                ctx.lineTo(obs.x + 15, obs.y + 10);
                ctx.lineTo(obs.x + 30, obs.y);
                ctx.lineTo(obs.x + 15, obs.y + 5);
                ctx.fill();
            } else {
                // Storm Cloud
                ctx.fillStyle = '#475569'; // Slate 600
                ctx.beginPath();
                ctx.arc(obs.x + 25, obs.y + 25, 25, 0, Math.PI * 2);
                ctx.arc(obs.x + 10, obs.y + 30, 15, 0, Math.PI * 2);
                ctx.arc(obs.x + 40, obs.y + 30, 15, 0, Math.PI * 2);
                ctx.fill();
                // Lightning
                if (state.frame % 20 < 10) {
                    ctx.strokeStyle = '#fef08a';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(obs.x + 25, obs.y + 25);
                    ctx.lineTo(obs.x + 15, obs.y + 60);
                    ctx.stroke();
                }
            }

            // Collision Obstacle
            if (
                state.plane.x < obs.x + obs.width &&
                state.plane.x + state.plane.width > obs.x &&
                state.plane.y < obs.y + obs.height &&
                state.plane.y + state.plane.height > obs.y
            ) {
                // Game Over
                setGameOver(true);
                setIsPlaying(false);
                if (state.score > highScore) setHighScore(Math.floor(state.score));
                cancelAnimationFrame(requestRef.current);
            }

            // Cleanup
            if (obs.x < -100) state.obstacles.splice(index, 1);
        });

        // Draw Plane
        ctx.fillStyle = '#fff';
        // Simple Plane Shape
        ctx.beginPath();
        ctx.moveTo(state.plane.x, state.plane.y + 15); // Nose
        ctx.lineTo(state.plane.x - 40, state.plane.y); // Tail Top
        ctx.lineTo(state.plane.x - 40, state.plane.y + 30); // Tail Bottom
        ctx.fill();
        // Wing
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(state.plane.x - 15, state.plane.y + 15);
        ctx.lineTo(state.plane.x - 30, state.plane.y + 45);
        ctx.lineTo(state.plane.x - 10, state.plane.y + 25);
        ctx.fill();

        // Update UI Score (throttled visual update could be better but this is fine for simple game)
        setScore(Math.floor(state.score));

        if (!gameOver) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center overflow-hidden font-sans">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            
            {/* UI Layer */}
            <div className="absolute top-4 left-0 w-full flex justify-between px-6">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-3 text-white font-bold text-xl border border-white/30 shadow-lg">
                    Score: {score}
                </div>
                <div className="flex gap-4">
                     {highScore > 0 && (
                        <div className="bg-yellow-500/80 backdrop-blur-md rounded-full px-6 py-3 text-white font-bold border border-yellow-400/50 hidden md:block shadow-lg">
                            Record: {highScore}
                        </div>
                    )}
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-colors shadow-lg z-50">
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Start / Game Over Screen */}
            {!isPlaying && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-40 p-4 text-center">
                    <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full transform transition-all scale-100 animate-fade-in-up border border-white/20">
                        <div className="bg-sky-100 dark:bg-sky-900/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-sky-600 dark:text-sky-400 shadow-inner">
                            <Icons.Plane className="w-12 h-12 rotate-45" />
                        </div>
                        
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                            {gameOver ? 'Crash !' : 'SkyRunner'}
                        </h2>
                        
                        {gameOver && (
                            <div className="mb-8">
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Votre score final</p>
                                <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500 my-2">{score}</p>
                                {score >= highScore && score > 0 && <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mt-2">Nouveau Record !</span>}
                            </div>
                        )}

                        {!gameOver && (
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                                Pilotez à travers les nuages, évitez les orages et battez le record !
                            </p>
                        )}

                        <div className="space-y-4">
                            <Button onClick={startGame} size="lg" className="w-full py-4 text-lg shadow-xl shadow-sky-500/30">
                                {gameOver ? 'Rejouer' : 'Décoller'}
                            </Button>

                            <button onClick={onClose} className="block w-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-medium py-2">
                                Retour au site
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};