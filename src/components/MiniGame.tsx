
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

    // Game State Refs
    const gameState = useRef({
        plane: { x: 100, y: 300, width: 60, height: 30, dy: 0, speed: 5 },
        obstacles: [] as { x: number, y: number, width: number, height: number, type: 'bird' | 'storm' }[],
        coins: [] as { x: number, y: number, size: number, value: number }[],
        clouds: [] as { x: number, y: number, size: number, speed: number }[],
        keys: { ArrowUp: false, ArrowDown: false },
        frame: 0,
        score: 0,
        speed: 3
    });

    const requestRef = useRef<number>(0);

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

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowUp' || e.code === 'Space') gameState.current.keys.ArrowUp = true;
            if (e.code === 'ArrowDown') gameState.current.keys.ArrowDown = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'ArrowUp' || e.code === 'Space') gameState.current.keys.ArrowUp = false;
            if (e.code === 'ArrowDown') gameState.current.keys.ArrowDown = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
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

        // Logic (simplified for brevity)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0ea5e9');
        gradient.addColorStop(1, '#bae6fd');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (state.keys.ArrowUp) state.plane.dy = -state.speed * 1.5;
        else if (state.keys.ArrowDown) state.plane.dy = state.speed * 1.5;
        else state.plane.dy = state.plane.dy * 0.9;

        state.plane.y += state.plane.dy;

        if (state.plane.y < 0) state.plane.y = 0;
        if (state.plane.y > canvas.height - state.plane.height) state.plane.y = canvas.height - state.plane.height;

        // Draw Plane
        ctx.fillStyle = '#fff';
        ctx.fillRect(state.plane.x, state.plane.y, state.plane.width, state.plane.height);

        state.frame++;
        state.score += 0.1;
        setScore(Math.floor(state.score));

        if (!gameOver) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center overflow-hidden font-sans">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            {!isPlaying && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-40 p-4 text-center">
                     <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full border border-white/20">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{gameOver ? 'Crash !' : 'SkyRunner'}</h2>
                        <div className="space-y-4 mt-8">
                            <Button onClick={startGame} size="lg" className="w-full py-4 text-lg">
                                {gameOver ? 'Rejouer' : 'Décoller'}
                            </Button>
                            <button onClick={onClose} className="block w-full text-slate-400 hover:text-slate-600 text-sm font-medium py-2">Retour</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="absolute top-4 left-0 w-full flex justify-between px-6">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-3 text-white font-bold text-xl border border-white/30">Score: {score}</div>
                <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3"><Icons.X className="w-6 h-6" /></button>
            </div>
        </div>
    );
};
