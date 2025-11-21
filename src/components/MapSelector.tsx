
import React from 'react';
import { Icons } from './Icons';
import { SearchParams, ViewState, GlobeSettings } from '../types';
import { Globe3D } from './Globe3D';

interface MapSelectorProps {
    searchParams: SearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
    setView: React.Dispatch<React.SetStateAction<ViewState>>;
    settings: GlobeSettings;
}

export const MapSelector: React.FC<MapSelectorProps> = ({ searchParams, setSearchParams, setView, settings }) => (
    <div className="container mx-auto px-6 py-12 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-white flex items-center gap-3 justify-center">
            <span className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-xl text-sky-600 dark:text-sky-400"><Icons.Globe className="w-8 h-8" /></span>
            Explorer le monde
        </h2>
        
        <div className="relative liquid-glass rounded-[3rem] h-[600px] overflow-hidden flex items-center justify-center group interactive shadow-2xl border border-white/20 dark:border-white/5">
            
            {/* Composant 3D Interactif */}
            <div className="absolute inset-0 w-full h-full z-0 bg-[#020617] dark:bg-[#020617]">
                <Globe3D searchParams={searchParams} setSearchParams={setSearchParams} setView={setView} settings={settings} />
            </div>
            
            {/* Overlay UI */}
            <div className="absolute top-6 bg-white/10 dark:bg-black/40 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold text-white border border-white/20 shadow-lg z-20 pointer-events-none select-none">
                <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                    Interagissez avec le globe pour choisir une destination
                </span>
            </div>
        </div>
    </div>
);
