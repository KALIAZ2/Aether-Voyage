
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './Icons';
import { User, ViewState } from '../types';

interface NavBarProps {
    view: ViewState;
    setView: (view: ViewState) => void;
    user: User | null;
    cartCount: number;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ view, setView, user, cartCount, darkMode, toggleDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Accueil' },
        { id: 'flights', label: 'Vols' },
        { id: 'dashboard', label: 'Compte' },
    ];

    return (
        <>
            {/* Floating Dock Navigation */}
            <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isScrolled ? 'w-[95%] md:w-auto' : 'w-[95%] md:w-[85%]'}`}>
                <div className={`liquid-glass rounded-full px-3 py-2 md:px-6 md:py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl shadow-slate-300/50 dark:shadow-black/50' : ''}`}>
                    
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer group pl-2" onClick={() => setView('home')}>
                        <div className="bg-slate-900 dark:bg-white p-2 rounded-full text-white dark:text-slate-900 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                            <Icons.Plane className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg tracking-tight hidden sm:block dark:text-white">Aether</span>
                    </div>

                    {/* Desktop Liquid Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-white/5 p-1.5 rounded-full backdrop-blur-md border border-white/10">
                        {navItems.map((item) => {
                            const isActive = view === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setView(item.id as ViewState)}
                                    className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors z-10 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="liquid-nav-bg"
                                            className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            style={{ zIndex: -1 }}
                                        />
                                    )}
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pr-2">
                        <button onClick={toggleDarkMode} className="p-3 rounded-full hover:bg-slate-100/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors">
                            {darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                        </button>
                        
                        <button onClick={() => setView('cart')} className="relative p-3 rounded-full hover:bg-slate-100/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors group">
                            <Icons.ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg animate-scale-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="w-px h-6 bg-slate-200/50 dark:bg-slate-700/50 mx-1 hidden sm:block"></div>

                        {user ? (
                            <div className="hidden sm:flex items-center gap-3 pl-2 cursor-pointer" onClick={() => setView('dashboard')}>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 p-[2px] hover:shadow-lg hover:shadow-sky-500/30 transition-all">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-xs font-bold backdrop-blur-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => setView('login')} className="hidden sm:flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/10">
                                <span>Connexion</span>
                            </button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-900 dark:text-white">
                            {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu Dropdown with Liquid Glass */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute top-full left-0 w-full mt-4 liquid-glass rounded-[2rem] p-4 flex flex-col gap-2 md:hidden shadow-2xl border border-white/20 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl -z-10"></div>
                             <button onClick={() => {setView('home'); setIsMobileMenuOpen(false)}} className="text-left p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/10 font-bold text-slate-800 dark:text-slate-200 transition-colors">Accueil</button>
                             <button onClick={() => {setView('flights'); setIsMobileMenuOpen(false)}} className="text-left p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/10 font-bold text-slate-800 dark:text-slate-200 transition-colors">Nos Vols</button>
                             <button onClick={() => {setView('dashboard'); setIsMobileMenuOpen(false)}} className="text-left p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/10 font-bold text-slate-800 dark:text-slate-200 transition-colors">Mon Compte</button>
                             {!user && <button onClick={() => {setView('login'); setIsMobileMenuOpen(false)}} className="text-center p-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold mt-2 shadow-lg">Connexion</button>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export const Footer: React.FC = () => (
    <footer className="relative mt-32 pb-10">
        <div className="container mx-auto px-6">
            <div className="liquid-glass rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row justify-between gap-12 items-start relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-400 opacity-30"></div>
                
                <div className="max-w-sm relative z-10">
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                        <div className="bg-slate-900 dark:bg-white p-2 rounded-xl text-white dark:text-slate-900"><Icons.Plane className="w-6 h-6" /></div>
                        Aether
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                        Redéfinir l'expérience du voyage avec élégance, simplicité et technologie. Le monde vous attend.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto relative z-10">
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Découvrir</h4>
                        <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                            <li className="hover:text-sky-500 transition-colors cursor-pointer">Destinations</li>
                            <li className="hover:text-sky-500 transition-colors cursor-pointer">Carte interactive</li>
                            <li className="hover:text-sky-500 transition-colors cursor-pointer">Offres Flash</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
                        <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                            <li className="hover:text-sky-500 transition-colors cursor-pointer">FAQ</li>
                            <li className="hover:text-sky-500 transition-colors cursor-pointer">Contact</li>
                            <li className="hover:text-sky-500 transition-colors cursor-pointer">Assurance</li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                         <h4 className="font-bold text-slate-900 dark:text-white mb-6">Restez informé</h4>
                         <div className="flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-full p-1 pl-4 focus-within:ring-2 ring-sky-500/20 transition-all border border-white/20 backdrop-blur-sm">
                             <input type="email" placeholder="Email" className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-white placeholder:text-slate-400" />
                             <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-full hover:scale-105 transition-transform"><Icons.ChevronRight className="w-4 h-4" /></button>
                         </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-12 text-slate-400 text-sm font-medium">
                © 2024 Aether Voyages. Designed for the future.
            </div>
        </div>
    </footer>
);
