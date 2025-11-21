
import React from 'react';
import { motion } from 'framer-motion';

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'md',
    className = '', 
    type = 'button', 
    disabled = false 
}) => {
    const baseStyle = "rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    
    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    };

    const variants = {
        primary: "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(15,23,42,0.3)] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-transparent",
        secondary: "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-750 shadow-sm",
        outline: "bg-transparent border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 dark:border-slate-600 dark:text-slate-300 dark:hover:border-white dark:hover:text-white",
        danger: "bg-red-500/10 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30 dark:hover:bg-red-600 dark:hover:text-white",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
    };

    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled} 
            className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

// Card Component - Liquid Glass Style
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '' }) => (
    <div className={`liquid-glass rounded-[2rem] transition-all duration-500 ${className} ${className.includes('group') || className.includes('hover') ? 'interactive' : ''}`}>
        {children}
    </div>
);

// Badge Component
interface BadgeProps {
    children: React.ReactNode;
    color?: 'blue' | 'green' | 'purple' | 'gold' | 'red';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'blue', className = '' }) => {
    const colors = {
        blue: 'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20',
        green: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
        purple: 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20',
        gold: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
        red: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${colors[color]} ${className}`}>
            {children}
        </span>
    );
};

// Glass Input Field
interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    icon?: React.ReactNode;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const GlassInput: React.FC<GlassInputProps> = ({ label, icon, error, className = '', onChange, ...props }) => (
    <div className={`w-full ${className}`}>
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 ml-4">{label}</label>
        <div className="relative group">
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 rounded-2xl blur-sm transition-all group-focus-within:bg-sky-500/20 group-focus-within:blur-md"></div>
            <div className="relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 shadow-sm transition-all group-focus-within:border-sky-500/50 group-focus-within:ring-4 ring-sky-500/10">
                {icon && <div className="pl-4 text-slate-400 group-focus-within:text-sky-500 transition-colors">{icon}</div>}
                <input 
                    {...props}
                    onChange={onChange}
                    className="w-full bg-transparent border-none outline-none p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
                />
            </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1 ml-4 font-medium animate-fade-in">{error}</p>}
    </div>
);

// Glass Select Field
interface GlassSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label: string;
    options: { value: string; label: string }[];
    icon?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const GlassSelect: React.FC<GlassSelectProps> = ({ label, options, icon, className = '', onChange, ...props }) => (
    <div className={`w-full ${className}`}>
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 ml-4">{label}</label>
        <div className="relative group">
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 rounded-2xl blur-sm transition-all group-focus-within:bg-sky-500/20 group-focus-within:blur-md"></div>
            <div className="relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 shadow-sm transition-all group-focus-within:border-sky-500/50">
                {icon && <div className="pl-4 text-slate-400 group-focus-within:text-sky-500 transition-colors">{icon}</div>}
                <select 
                    {...props}
                    onChange={onChange}
                    className="w-full bg-transparent border-none outline-none p-4 text-slate-900 dark:text-white font-medium appearance-none cursor-pointer"
                >
                    {options.map(opt => <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900">{opt.label}</option>)}
                </select>
            </div>
        </div>
    </div>
);

// Glass Toggle Switch
interface GlassToggleProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}
export const GlassToggle: React.FC<GlassToggleProps> = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 liquid-glass rounded-2xl interactive cursor-pointer" onClick={onChange}>
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
    </div>
);

// Glass Tabs Component
interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}
interface GlassTabsProps {
    tabs: TabItem[];
    activeTab: string;
    onChange: (id: string) => void;
}
export const GlassTabs: React.FC<GlassTabsProps> = ({ tabs, activeTab, onChange }) => (
    <div className="flex gap-2 bg-slate-100/50 dark:bg-black/20 p-1.5 rounded-2xl backdrop-blur-md border border-white/10 w-full md:w-auto overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors z-10 whitespace-nowrap ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    {isActive && (
                        <motion.div
                            layoutId="glass-tab-bg"
                            className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-sm"
                            initial={false}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{ zIndex: -1 }}
                        />
                    )}
                    {tab.icon}
                    {tab.label}
                </button>
            );
        })}
    </div>
);

// Credit Card Display
interface CreditCardProps {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
    brand?: 'visa' | 'mastercard';
}
export const CreditCardDisplay: React.FC<CreditCardProps> = ({ number, name, expiry, cvc, brand }) => (
    <div className="w-full aspect-[1.586] rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 p-8 text-white relative overflow-hidden shadow-2xl border border-white/10 group hover:scale-105 transition-transform duration-500">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-500/20 rounded-full blur-[60px] -z-0"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-violet-500/20 rounded-full blur-[50px] -z-0"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] z-0"></div>

        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
                <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-200 to-yellow-400 opacity-80"></div>
                <div className="text-xl font-bold italic opacity-50">BANK</div>
            </div>
            
            <div className="space-y-1">
                <div className="text-2xl font-mono tracking-widest drop-shadow-md">
                    {number || '•••• •••• •••• ••••'}
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <div className="text-[10px] uppercase opacity-70 tracking-wider mb-1">Card Holder</div>
                    <div className="font-medium tracking-wide uppercase">{name || 'YOUR NAME'}</div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] uppercase opacity-70 tracking-wider mb-1">Expires</div>
                    <div className="font-mono">{expiry || 'MM/YY'}</div>
                </div>
            </div>
        </div>
    </div>
);
