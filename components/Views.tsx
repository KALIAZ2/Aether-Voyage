
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Badge, GlassInput, GlassSelect, GlassToggle, GlassTabs, CreditCardDisplay } from './UI';
import { Icons } from './Icons';
import { MapSelector } from './MapSelector';
import { Globe3D } from './Globe3D';
import { FLIGHTS_DATA, FALLBACK_IMG_URL } from '../constants';
import { Flight, SearchParams, ViewState, User, FiltersState, PassengerInfo, AppSettings, GlobeSettings } from '../types';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMG_URL;
};

// --- HOME PAGE ---
interface HomePageProps {
    searchParams: SearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
    setView: React.Dispatch<React.SetStateAction<ViewState>>;
    onBook: (flight: Flight) => void;
    appSettings: AppSettings;
}

export const HomePage: React.FC<HomePageProps> = ({ searchParams, setSearchParams, setView, onBook, appSettings }) => {
    return (
        <>
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
                {/* Background elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-black -z-20"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-400/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-400/10 rounded-full blur-[100px] -z-10"></div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <div className="space-y-8 max-w-5xl flex flex-col items-center">
                        <Badge color="blue">Futur du voyage</Badge>
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Voyagez <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500">Au delà</span>
                            <br/> des nuages.
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Une expérience de réservation immersive, propulsée par l'élégance et la technologie.
                        </p>

                        <div className="liquid-glass p-2 rounded-full flex items-center w-full max-w-md shadow-2xl border border-white/20 mx-auto mt-8">
                            <div className="flex-1 px-6 text-left">
                                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Destination</label>
                                <input 
                                    type="text" 
                                    placeholder="Où allez-vous ?" 
                                    value={searchParams.dest}
                                    onChange={(e) => setSearchParams({...searchParams, dest: e.target.value})}
                                    className="w-full bg-transparent outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-300"
                                />
                            </div>
                            <button onClick={() => setView('flights')} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-full hover:scale-110 transition-transform shadow-lg">
                                <Icons.Search className="w-6 h-6" />
                            </button>
                        </div>
                        
                         <div className="flex gap-8 pt-8 justify-center">
                            <div className="flex -space-x-4">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-slate-900 dark:text-white">4.9/5</div>
                                <div className="text-sm text-slate-500">Note moyenne</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <MapSelector searchParams={searchParams} setSearchParams={setSearchParams} setView={setView} settings={appSettings.globe} />
        </>
    );
};

// --- AUTH PAGE ---
interface AuthPageProps {
    type: 'login' | 'register';
    handleLogin: (email: string, pass: string) => void;
    handleRegister: (name: string, email: string) => void;
    setView: (view: ViewState) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ type, handleLogin, handleRegister, setView }) => {
    const [email, setEmail] = useState('demo@aether.com');
    const [password, setPassword] = useState('password');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === 'login') handleLogin(email, password);
        else handleRegister(name, email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
             <div className="w-full max-w-md liquid-glass p-10 rounded-[3rem] relative z-10 border border-white/20">
                <div className="text-center mb-10">
                    <div className="bg-slate-900 dark:bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white dark:text-slate-900 shadow-xl transform -rotate-6">
                        <Icons.Plane className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{type === 'login' ? 'Bon retour' : 'Bienvenue'}</h2>
                    <p className="text-slate-500">Entrez vos détails pour continuer.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {type === 'register' && (
                        <GlassInput label="Nom complet" icon={<Icons.User />} value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                    )}
                    <GlassInput label="Email" icon={<Icons.Mail />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemple.com" />
                    <GlassInput label="Mot de passe" icon={<Icons.Lock />} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

                    <Button type="submit" className="w-full py-4 text-lg shadow-xl shadow-sky-500/20">
                        {type === 'login' ? 'Se connecter' : "S'inscrire"}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <button onClick={() => setView(type === 'login' ? 'register' : 'login')} className="text-sm font-bold text-slate-500 hover:text-sky-500 transition-colors">
                        {type === 'login' ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
                    </button>
                </div>
             </div>
        </div>
    );
};

// --- CART PAGE ---
interface CartPageProps {
    cart: Flight[];
    user: User | null;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    setView: (view: ViewState) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ cart, user, removeFromCart, clearCart, setView }) => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    const taxes = total * 0.10;

    return (
        <div className="container mx-auto px-6 py-20 mt-10 animate-fade-in min-h-screen">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-white flex items-center gap-4">
                <span className="bg-slate-100 dark:bg-white/10 p-3 rounded-2xl"><Icons.ShoppingBag className="w-8 h-8"/></span>
                Votre Panier
            </h2>

            {cart.length === 0 ? (
                <div className="text-center py-20 liquid-glass rounded-[3rem]">
                    <div className="bg-slate-100 dark:bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"><Icons.ShoppingBag className="w-10 h-10 text-slate-400" /></div>
                    <h3 className="text-2xl font-bold dark:text-white mb-2">Votre panier est vide</h3>
                    <p className="text-slate-500 mb-8">Prêt à partir ? Découvrez nos meilleures offres.</p>
                    <Button onClick={() => setView('flights')} size="lg">Explorer les vols</Button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                        {cart.map((flight) => (
                            <div key={flight.id} className="liquid-glass rounded-[2rem] p-6 flex items-center gap-6 relative group overflow-hidden">
                                <img src={flight.image} className="w-24 h-24 rounded-2xl object-cover" alt="" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{flight.origin} ➝ {flight.dest}</h3>
                                            <p className="text-slate-500">{flight.date} • {flight.airline}</p>
                                        </div>
                                        <span className="text-xl font-bold text-sky-500">{flight.price}€</span>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        <Badge color="blue">{flight.type}</Badge>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(flight.id)} className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                                    <Icons.Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full lg:w-96">
                        <div className="liquid-glass p-8 rounded-[2.5rem] sticky top-32">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Récapitulatif</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-slate-500">
                                    <span>Sous-total</span>
                                    <span>{total}€</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Taxes & Frais</span>
                                    <span>{taxes.toFixed(2)}€</span>
                                </div>
                                <div className="h-px bg-slate-200 dark:bg-white/10 my-4"></div>
                                <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white">
                                    <span>Total</span>
                                    <span>{(total + taxes).toFixed(2)}€</span>
                                </div>
                            </div>
                            <Button onClick={() => user ? setView('payment') : setView('login')} className="w-full py-4 text-lg shadow-xl shadow-sky-500/20">
                                {user ? 'Procéder au paiement' : 'Se connecter pour payer'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- DASHBOARD PAGE ---
interface DashboardPageProps {
    user: User;
    settings: AppSettings;
    onUpdateSettings: (s: AppSettings) => void;
    onUpdateUser: (u: User) => void;
    handleLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, settings, onUpdateSettings, onUpdateUser, handleLogout }) => {
    const [activeTab, setActiveTab] = useState('profile');
    
    return (
        <div className="container mx-auto px-6 py-20 mt-10 animate-fade-in min-h-screen">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <div className="w-full md:w-72 shrink-0 space-y-6">
                    <div className="liquid-glass p-8 rounded-[2.5rem] text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 p-[3px] mx-auto mb-4">
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-violet-500">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                        <p className="text-slate-500 text-sm mb-6">{user.email}</p>
                        <div className="bg-slate-100 dark:bg-white/5 rounded-xl p-3 mb-6">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Points Fidélité</div>
                            <div className="text-2xl font-bold text-sky-500">{user.points} PTS</div>
                        </div>
                         <Button onClick={handleLogout} variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:border-red-200 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10">
                            <Icons.LogOut className="w-4 h-4" /> Déconnexion
                        </Button>
                    </div>
                    
                    <nav className="liquid-glass p-4 rounded-[2rem] space-y-2">
                        {[
                            { id: 'profile', label: 'Mon Profil', icon: <Icons.User className="w-4 h-4"/> },
                            { id: 'settings', label: 'Préférences', icon: <Icons.Sliders className="w-4 h-4"/> },
                            { id: 'security', label: 'Sécurité & Connexion', icon: <Icons.Shield className="w-4 h-4"/> },
                            { id: 'payments', label: 'Paiements & Historique', icon: <Icons.CreditCard className="w-4 h-4"/> },
                            { id: 'notifications', label: 'Notifications', icon: <Icons.Bell className="w-4 h-4"/> },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors text-left ${activeTab === tab.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="liquid-glass p-8 rounded-[3rem] min-h-[600px]">
                         {/* PROFILE TAB */}
                         {activeTab === 'profile' && (
                            <div className="space-y-8 animate-fade-in">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-white/10 pb-4">Informations Personnelles</h3>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-300 transition-colors group relative overflow-hidden">
                                         {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="avatar" /> : <Icons.Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Photo de profil</h4>
                                        <p className="text-sm text-slate-500">PNG, JPG jusqu'à 5MB</p>
                                        <button className="text-sky-500 text-sm font-bold mt-1 hover:underline">Modifier</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <GlassInput label="Prénom" value={user.firstName || ''} onChange={e => onUpdateUser({...user, firstName: e.target.value})} />
                                    <GlassInput label="Nom" value={user.lastName || ''} onChange={e => onUpdateUser({...user, lastName: e.target.value})} />
                                    <GlassInput label="Email" value={user.email} onChange={e => onUpdateUser({...user, email: e.target.value})} />
                                    <GlassInput label="Téléphone" value={user.phone || ''} onChange={e => onUpdateUser({...user, phone: e.target.value})} />
                                    <GlassInput label="Adresse" className="md:col-span-2" value={user.address || ''} onChange={e => onUpdateUser({...user, address: e.target.value})} />
                                    <GlassInput label="Ville" value={user.city || ''} onChange={e => onUpdateUser({...user, city: e.target.value})} />
                                    <GlassInput label="Pays" value={user.country || ''} onChange={e => onUpdateUser({...user, country: e.target.value})} />
                                </div>
                                <div className="flex justify-end pt-6">
                                    <Button>Sauvegarder</Button>
                                </div>
                            </div>
                         )}
                         
                         {/* SETTINGS TAB */}
                         {activeTab === 'settings' && (
                            <div className="space-y-8 animate-fade-in">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-white/10 pb-4">Préférences</h3>
                                <div className="space-y-6">
                                    <h4 className="font-bold text-slate-500 uppercase text-xs mb-4">Général</h4>
                                    <GlassSelect label="Langue" options={[{value: 'fr', label: 'Français'}, {value: 'en', label: 'English'}]} value={settings.language} onChange={(e) => onUpdateSettings({...settings, language: e.target.value as any})} icon={<Icons.Language />} />
                                    <GlassSelect label="Devise" options={[{value: 'EUR', label: 'Euro (€)'}, {value: 'USD', label: 'Dollar ($)'}, {value: 'GBP', label: 'Pound (£)'}]} value={settings.currency} onChange={(e) => onUpdateSettings({...settings, currency: e.target.value as any})} />
                                    
                                    <h4 className="font-bold text-slate-500 uppercase text-xs mt-8 mb-4">Accessibilité & Apparence</h4>
                                    <GlassSelect label="Taille de police" options={[{value: 'normal', label: 'Normale'}, {value: 'large', label: 'Grande'}]} value={settings.accessibility.fontSize} onChange={(e) => onUpdateSettings({...settings, accessibility: {...settings.accessibility, fontSize: e.target.value as any}})} />
                                    <GlassToggle label="Réduire les animations" checked={settings.accessibility.reducedMotion} onChange={() => onUpdateSettings({...settings, accessibility: {...settings.accessibility, reducedMotion: !settings.accessibility.reducedMotion}})} />
                                    <GlassToggle label="Rotation automatique Globe" checked={settings.globe.rotationSpeed > 0} onChange={() => onUpdateSettings({...settings, globe: {...settings.globe, rotationSpeed: settings.globe.rotationSpeed > 0 ? 0 : 0.5}})} />
                                </div>
                            </div>
                         )}

                         {/* SECURITY TAB */}
                         {activeTab === 'security' && (
                             <div className="space-y-8 animate-fade-in">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-white/10 pb-4">Sécurité & Connexion</h3>
                                
                                {/* Change Password */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Changer de mot de passe</h4>
                                    <GlassInput label="Mot de passe actuel" type="password" placeholder="••••••••" icon={<Icons.Lock />} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <GlassInput label="Nouveau mot de passe" type="password" placeholder="••••••••" icon={<Icons.Lock />} />
                                        <GlassInput label="Confirmer" type="password" placeholder="••••••••" icon={<Icons.Lock />} />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="secondary" size="sm">Mettre à jour</Button>
                                    </div>
                                </div>

                                {/* Active Sessions */}
                                <div className="mt-10">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Appareils connectés</h4>
                                    <div className="space-y-3">
                                        {user.sessions?.map(session => (
                                            <div key={session.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/20">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-slate-200 dark:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-300">
                                                        {session.type === 'mobile' ? <Icons.Smartphone className="w-6 h-6" /> : <Icons.Laptop className="w-6 h-6" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                            {session.device} {session.isCurrent && <Badge color="green">Actuel</Badge>}
                                                        </div>
                                                        <div className="text-xs text-slate-500">{session.location} • Actif {session.lastActive}</div>
                                                    </div>
                                                </div>
                                                {!session.isCurrent && (
                                                    <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                                        <Icons.Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                             </div>
                         )}

                         {/* PAYMENTS TAB */}
                         {activeTab === 'payments' && (
                             <div className="space-y-8 animate-fade-in">
                                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-white/10 pb-4">Moyens de paiement</h3>
                                 
                                 {/* Cards Grid */}
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                     {user.savedCards?.map(card => (
                                         <div key={card.id} className="relative group cursor-pointer">
                                             <CreditCardDisplay 
                                                number={`•••• •••• •••• ${card.last4}`} 
                                                name={card.holder || user.name} 
                                                expiry={card.expiry || '12/25'} 
                                                cvc="•••"
                                             />
                                             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors text-white">
                                                     <Icons.Trash2 className="w-4 h-4" />
                                                 </button>
                                             </div>
                                         </div>
                                     ))}
                                     <div className="aspect-[1.586] rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/10 transition-all cursor-pointer">
                                         <div className="p-4 rounded-full bg-slate-100 dark:bg-white/5 mb-2"><Icons.CreditCard className="w-6 h-6" /></div>
                                         <span className="font-bold text-sm">Ajouter une carte</span>
                                     </div>
                                 </div>

                                 {/* Transaction History */}
                                 <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Historique des transactions</h4>
                                 <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                                     <table className="w-full text-sm text-left">
                                         <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 font-bold uppercase text-xs">
                                             <tr>
                                                 <th className="px-6 py-3">Date</th>
                                                 <th className="px-6 py-3">Description</th>
                                                 <th className="px-6 py-3">Montant</th>
                                                 <th className="px-6 py-3">Statut</th>
                                                 <th className="px-6 py-3"></th>
                                             </tr>
                                         </thead>
                                         <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                             {user.transactions?.map(tx => (
                                                 <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                     <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                                                     <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{tx.description}</td>
                                                     <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{tx.amount.toFixed(2)}€</td>
                                                     <td className="px-6 py-4">
                                                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${tx.status === 'completed' ? 'bg-green-100 text-green-600' : tx.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                                                             {tx.status}
                                                         </span>
                                                     </td>
                                                     <td className="px-6 py-4 text-right">
                                                         <button className="text-slate-400 hover:text-sky-500 transition-colors"><Icons.Download className="w-4 h-4" /></button>
                                                     </td>
                                                 </tr>
                                             ))}
                                         </tbody>
                                     </table>
                                 </div>
                             </div>
                         )}
                         
                         {/* NOTIFICATIONS TAB */}
                         {activeTab === 'notifications' && (
                             <div className="space-y-8 animate-fade-in">
                                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-white/10 pb-4">Centre de notifications</h3>
                                 
                                 <div className="space-y-6">
                                     <h4 className="font-bold text-slate-500 uppercase text-xs mb-2">Canaux de communication</h4>
                                     <GlassToggle label="Emails transactionnels" checked={settings.notifications.email} onChange={() => onUpdateSettings({...settings, notifications: {...settings.notifications, email: !settings.notifications.email}})} />
                                     <GlassToggle label="Notifications Push (Mobile)" checked={settings.notifications.push} onChange={() => onUpdateSettings({...settings, notifications: {...settings.notifications, push: !settings.notifications.push}})} />
                                     
                                     <h4 className="font-bold text-slate-500 uppercase text-xs mt-8 mb-2">Types de contenu</h4>
                                     <GlassToggle label="Offres promotionnelles & Deals" checked={settings.notifications.promo} onChange={() => onUpdateSettings({...settings, notifications: {...settings.notifications, promo: !settings.notifications.promo}})} />
                                     <GlassToggle label="Alertes de sécurité (Connexions)" checked={settings.notifications.security} onChange={() => onUpdateSettings({...settings, notifications: {...settings.notifications, security: !settings.notifications.security}})} />
                                 </div>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUCCESS PAGE ---
interface SuccessPageProps {
    setView: (view: ViewState) => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ setView }) => {
    useEffect(() => {
        // Fire confetti or something
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
             <div className="text-center max-w-lg w-full liquid-glass p-12 rounded-[3rem] border border-green-500/20 shadow-2xl shadow-green-500/10">
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 animate-bounce">
                    <Icons.CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Paiement Réussi !</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">
                    Votre réservation a été confirmée. Vous recevrez vos billets par email dans quelques instants.
                </p>
                <div className="space-y-4">
                    <Button onClick={() => setView('dashboard')} className="w-full py-4 text-lg">Voir ma réservation</Button>
                    <Button onClick={() => setView('minigame')} variant="secondary" className="w-full py-4 text-lg">Jouer au mini-jeu en attendant</Button>
                </div>
             </div>
        </div>
    );
};

// --- BOOKING SIDE PANEL ---
interface BookingSidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    flight: Flight | null;
    user: User | null;
    onConfirm: (info: PassengerInfo) => void;
}

export const BookingSidePanel: React.FC<BookingSidePanelProps> = ({ isOpen, onClose, flight, user, onConfirm }) => {
    const [info, setInfo] = useState<PassengerInfo>({
        firstName: '', lastName: '', email: '', phone: '', birthDate: '', passportNumber: '', address: '', city: '', zipCode: '', country: ''
    });

    useEffect(() => {
        if (user && isOpen) {
            setInfo(prev => ({
                ...prev,
                firstName: user.firstName || user.name.split(' ')[0] || '',
                lastName: user.lastName || user.name.split(' ').slice(1).join(' ') || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                city: user.city || '',
                zipCode: user.zipCode || '',
                country: user.country || '',
                passportNumber: user.passportNumber || ''
            }));
        }
    }, [user, isOpen]);

    if (!flight) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-white dark:bg-[#0B0F19] z-[70] shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8 min-h-full liquid-glass border-l border-white/20">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Réservation</h2>
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10"><Icons.X /></button>
                            </div>

                            {/* Flight Summary */}
                            <div className="mb-10 p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={flight.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{flight.origin} ➝ {flight.dest}</h3>
                                        <p className="text-sm text-slate-500">{flight.date} • {flight.airline}</p>
                                    </div>
                                    <div className="ml-auto text-xl font-bold text-sky-500">{flight.price}€</div>
                                </div>
                                <Badge color="blue">{flight.type}</Badge>
                            </div>

                            {/* Form */}
                            <form onSubmit={(e) => { e.preventDefault(); onConfirm(info); }} className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><Icons.User className="w-5 h-5 text-sky-500" /> Informations Passager</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <GlassInput label="Prénom" value={info.firstName} onChange={e => setInfo({...info, firstName: e.target.value})} required placeholder="Prénom" />
                                    <GlassInput label="Nom" value={info.lastName} onChange={e => setInfo({...info, lastName: e.target.value})} required placeholder="Nom" />
                                </div>
                                <GlassInput label="Email" type="email" icon={<Icons.Mail />} value={info.email} onChange={e => setInfo({...info, email: e.target.value})} required placeholder="email@exemple.com" />
                                <GlassInput label="Téléphone" type="tel" icon={<Icons.Phone />} value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} required placeholder="+33 6 00 00 00 00" />
                                
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 flex items-center gap-2"><Icons.Shield className="w-5 h-5 text-violet-500" /> Documents & Adresse</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <GlassInput label="Date de naissance" type="date" value={info.birthDate} onChange={e => setInfo({...info, birthDate: e.target.value})} required />
                                    <GlassInput label="N° Passeport" icon={<Icons.Lock />} value={info.passportNumber} onChange={e => setInfo({...info, passportNumber: e.target.value})} placeholder="AA1234567" />
                                </div>
                                <GlassInput label="Adresse" value={info.address} onChange={e => setInfo({...info, address: e.target.value})} placeholder="123 Rue de la Paix" />
                                <div className="grid grid-cols-2 gap-4">
                                    <GlassInput label="Ville" value={info.city} onChange={e => setInfo({...info, city: e.target.value})} placeholder="Paris" />
                                    <GlassInput label="Code Postal" value={info.zipCode} onChange={e => setInfo({...info, zipCode: e.target.value})} placeholder="75000" />
                                </div>

                                <div className="pt-6">
                                    <Button type="submit" size="lg" className="w-full py-4 shadow-xl shadow-sky-500/20">Confirmer la réservation</Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// --- PAYMENT PAGE ---
interface PaymentPageProps {
    totalAmount: number;
    user: User | null;
    onPaymentSuccess: () => void;
    onBack: () => void;
}
export const PaymentPage: React.FC<PaymentPageProps> = ({ totalAmount, user, onPaymentSuccess, onBack }) => {
    const [method, setMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    
    const [cardData, setCardData] = useState({ number: '', holder: '', expiry: '', cvc: '' });
    const [errors, setErrors] = useState<any>({});

    const taxes = totalAmount * 0.10;
    const finalTotal = totalAmount + taxes - discount;

    const handleCoupon = () => {
        if (coupon.toUpperCase() === 'AETHER2024') {
            setDiscount(50);
            alert("Code promo appliqué : -50€ !");
        } else {
            alert("Code promo invalide");
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (method === 'card') {
            if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) newErrors.number = "Numéro de carte invalide (16 chiffres)";
            if (!cardData.holder) newErrors.holder = "Nom requis";
            if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) newErrors.expiry = "Format MM/YY";
            if (!/^\d{3,4}$/.test(cardData.cvc)) newErrors.cvc = "CVC invalide";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        onPaymentSuccess();
    };

    return (
        <div className="container mx-auto px-6 py-20 mt-10 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Payment Methods & Form */}
                <div className="w-full lg:w-2/3">
                    <div className="flex items-center gap-4 mb-8">
                        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full"><Icons.ChevronRight className="rotate-180" /></button>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Paiement Sécurisé</h2>
                    </div>

                    <div className="mb-8">
                        <GlassTabs 
                            tabs={[
                                { id: 'card', label: 'Carte Bancaire', icon: <Icons.CreditCard className="w-4 h-4"/> },
                                { id: 'paypal', label: 'PayPal', icon: <Icons.PayPal className="w-4 h-4"/> },
                                { id: 'google', label: 'Google Pay', icon: <Icons.Google className="w-4 h-4"/> },
                                { id: 'apple', label: 'Apple Pay', icon: <Icons.Apple className="w-4 h-4"/> },
                            ]} 
                            activeTab={method} 
                            onChange={setMethod} 
                        />
                    </div>

                    <div className="liquid-glass p-8 rounded-[2.5rem] relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {method === 'card' && (
                                <motion.form 
                                    key="card"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit} 
                                    className="space-y-6"
                                >
                                    <div className="flex gap-6 flex-col md:flex-row">
                                        <div className="w-full md:w-1/2">
                                            <CreditCardDisplay 
                                                number={cardData.number} 
                                                name={cardData.holder} 
                                                expiry={cardData.expiry} 
                                                cvc={cardData.cvc} 
                                            />
                                        </div>
                                        <div className="w-full md:w-1/2 space-y-4">
                                            <GlassInput 
                                                label="Numéro de carte" 
                                                placeholder="0000 0000 0000 0000" 
                                                maxLength={19}
                                                value={cardData.number}
                                                onChange={e => setCardData({...cardData, number: e.target.value})}
                                                error={errors.number}
                                                icon={<Icons.CreditCard />}
                                            />
                                            <GlassInput 
                                                label="Titulaire" 
                                                placeholder="NOM PRÉNOM" 
                                                value={cardData.holder}
                                                onChange={e => setCardData({...cardData, holder: e.target.value.toUpperCase()})}
                                                error={errors.holder}
                                                icon={<Icons.User />}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <GlassInput 
                                                    label="Expiration" 
                                                    placeholder="MM/YY" 
                                                    maxLength={5}
                                                    value={cardData.expiry}
                                                    onChange={e => setCardData({...cardData, expiry: e.target.value})}
                                                    error={errors.expiry}
                                                />
                                                <GlassInput 
                                                    label="CVC" 
                                                    placeholder="123" 
                                                    maxLength={4}
                                                    value={cardData.cvc}
                                                    onChange={e => setCardData({...cardData, cvc: e.target.value})}
                                                    error={errors.cvc}
                                                    icon={<Icons.Lock />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-500/20">
                                        <Icons.Shield className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                                        <div className="text-sm text-sky-800 dark:text-sky-200">
                                            Vos données sont chiffrées (SSL 256-bit) et ne sont jamais stockées sur nos serveurs.
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full py-4 text-lg shadow-xl shadow-sky-500/20" disabled={loading}>
                                        {loading ? 'Traitement...' : `Payer ${finalTotal.toFixed(2)}€`}
                                    </Button>
                                </motion.form>
                            )}
                            
                            {/* ... other payment methods placeholders ... */}
                            {method !== 'card' && (
                                <motion.div
                                    key="other"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="text-center py-12"
                                >
                                    <p className="text-slate-500 mb-4">Redirection vers le prestataire de paiement sécurisé.</p>
                                    <Button onClick={handleSubmit} className="w-full py-4 text-lg shadow-xl shadow-sky-500/20">
                                        {loading ? 'Traitement...' : `Payer ${finalTotal.toFixed(2)}€ avec ${method}`}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                
                {/* Summary */}
                <div className="w-full lg:w-1/3">
                     <div className="liquid-glass p-8 rounded-[2.5rem] sticky top-32">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Récapitulatif</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-slate-500">
                                    <span>Sous-total</span>
                                    <span>{totalAmount}€</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Taxes & Frais</span>
                                    <span>{taxes.toFixed(2)}€</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-500 font-bold">
                                        <span>Réduction</span>
                                        <span>-{discount}€</span>
                                    </div>
                                )}
                                <div className="h-px bg-slate-200 dark:bg-white/10 my-4"></div>
                                <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white">
                                    <span>Total</span>
                                    <span>{finalTotal.toFixed(2)}€</span>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <GlassInput label="" placeholder="Code Promo" value={coupon} onChange={e => setCoupon(e.target.value)} />
                                    <Button onClick={handleCoupon} className="mt-6">Appliquer</Button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

// --- FLIGHTS SEARCH PAGE ---
interface FlightsPageProps {
    searchParams: SearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
    filters: FiltersState;
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
    getFilteredFlights: () => Flight[];
    onBook: (flight: Flight) => void;
    setView: React.Dispatch<React.SetStateAction<ViewState>>;
    globeSettings: GlobeSettings;
}

export const FlightsPage: React.FC<FlightsPageProps> = ({ searchParams, setSearchParams, filters, setFilters, getFilteredFlights, onBook, setView, globeSettings }) => {
    const [viewMode, setViewMode] = useState<'list' | 'globe' | 'compare'>('list');
    const [selectedCompare, setSelectedCompare] = useState<Flight[]>([]);
    const [priceAlerts, setPriceAlerts] = useState<number[]>([]);
    
    const flights = getFilteredFlights();

    const toggleCompare = (flight: Flight) => {
        if (selectedCompare.find(f => f.id === flight.id)) {
            setSelectedCompare(selectedCompare.filter(f => f.id !== flight.id));
        } else {
            if (selectedCompare.length < 3) setSelectedCompare([...selectedCompare, flight]);
            else alert("Vous ne pouvez comparer que 3 vols maximum");
        }
    };

    const toggleAlert = (id: number) => {
        if (priceAlerts.includes(id)) setPriceAlerts(priceAlerts.filter(aid => aid !== id));
        else setPriceAlerts([...priceAlerts, id]);
    };

    return (
        <div className="container mx-auto px-6 py-20 mt-10 animate-fade-in min-h-screen">
            
            {/* Top Search & Filters */}
            <div className="mb-10 space-y-6">
                <div className="liquid-glass p-6 rounded-[2rem] relative z-20">
                    <div className="flex flex-col lg:flex-row gap-4 items-end">
                         <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                            <GlassInput label="Départ" icon={<Icons.MapPin className="text-sky-500"/>} value={searchParams.origin} onChange={e => setSearchParams({...searchParams, origin: e.target.value})} placeholder="Ville ou aéroport" />
                            <GlassInput label="Arrivée" icon={<Icons.MapPin className="text-violet-500"/>} value={searchParams.dest} onChange={e => setSearchParams({...searchParams, dest: e.target.value})} placeholder="Destination" />
                            <GlassInput label="Date" type="date" icon={<Icons.Calendar />} value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})} />
                         </div>
                         <div className="w-full lg:w-auto flex gap-2">
                            <Button size="lg" className="h-[76px] px-8" onClick={() => {}}>Rechercher</Button>
                         </div>
                    </div>
                    
                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
                         <div className="flex items-center gap-2">
                             <span className="text-sm font-bold text-slate-500 uppercase mr-2">Filtres:</span>
                             {['Économique', 'Business', 'Première'].map(type => (
                                 <button key={type} onClick={() => setFilters({...filters, classType: filters.classType === type ? 'all' : type})} 
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filters.classType === type ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white/50 dark:bg-white/5 hover:bg-white/80'}`}>
                                     {type}
                                 </button>
                             ))}
                         </div>
                         <div className="w-px h-8 bg-slate-300 dark:bg-white/10 mx-2 hidden md:block"></div>
                         <div className="flex items-center gap-4 flex-1">
                             <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Prix Max: {filters.maxPrice}€</span>
                             <input type="range" min="100" max="5000" step="50" value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})} className="w-full max-w-[200px] h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                         </div>
                    </div>
                </div>

                {/* View Tabs */}
                <div className="flex justify-center">
                    <GlassTabs 
                        tabs={[
                            { id: 'list', label: `Liste (${flights.length})`, icon: <Icons.Menu className="w-4 h-4"/> },
                            { id: 'globe', label: 'Vue Globe 3D', icon: <Icons.Globe className="w-4 h-4"/> },
                            { id: 'compare', label: `Comparateur (${selectedCompare.length})`, icon: <Icons.Filter className="w-4 h-4"/> },
                        ]} 
                        activeTab={viewMode}
                        onChange={(id) => setViewMode(id as any)}
                    />
                </div>
            </div>

            {/* CONTENT AREA */}
            <AnimatePresence mode="wait">
                
                {/* --- LIST VIEW --- */}
                {viewMode === 'list' && (
                    <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                        {flights.map((flight, idx) => (
                            <div key={flight.id} className="liquid-glass rounded-[2rem] p-2 group interactive overflow-hidden">
                                <div className="flex flex-col md:flex-row items-stretch">
                                    <div className="w-full md:w-72 h-56 md:h-auto relative rounded-[1.5rem] overflow-hidden shrink-0">
                                        <img src={flight.image} onError={handleImageError} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            <Badge color={flight.type === 'Première' ? 'gold' : flight.type === 'Business' ? 'purple' : 'blue'}>{flight.type}</Badge>
                                            {flight.tags?.map(tag => <Badge key={tag} color="green">{tag}</Badge>)}
                                        </div>
                                        <div className="absolute bottom-3 left-3 text-white">
                                            <div className="flex items-center gap-1 text-xs font-bold mb-1"><Icons.Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {flight.score}/10</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-bold text-lg text-slate-900 dark:text-white">{flight.airline}</span>
                                                    <span className="text-xs text-slate-400 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded-md">Vol n°{1000 + flight.id}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{flight.origin} <span className="text-slate-400 mx-2">➝</span> {flight.dest}</h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-slate-900 dark:text-white">{flight.price}€</div>
                                                <p className="text-xs text-slate-500">par passager</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 my-4 py-4 border-t border-b border-slate-100/50 dark:border-white/5 text-sm">
                                            <div className="flex items-center gap-2"><Icons.Clock className="w-4 h-4 text-sky-500" /> <span className="font-semibold dark:text-white">{flight.duration}</span></div>
                                            <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${flight.stops === 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></span> <span className="font-semibold dark:text-white">{flight.stops === 0 ? 'Direct' : `${flight.stops} Escale`}</span></div>
                                            <div className="flex items-center gap-2"><span className="text-slate-400">CO2:</span> <span className="font-semibold dark:text-white">{flight.co2} kg</span></div>
                                            <div className="flex items-center gap-3 ml-auto text-slate-400">
                                                {flight.amenities.wifi && <span title="WiFi"><Icons.Globe className="w-4 h-4" /></span>}
                                                {flight.amenities.meal && <span title="Repas"><Icons.ShoppingBag className="w-4 h-4" /></span>}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex gap-3">
                                                <button onClick={() => toggleCompare(flight)} className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors ${selectedCompare.find(f => f.id === flight.id) ? 'bg-sky-500 text-white border-sky-500' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-sky-500 hover:text-sky-500'}`}>
                                                    {selectedCompare.find(f => f.id === flight.id) ? 'Comparé' : '+ Comparer'}
                                                </button>
                                                <button onClick={() => toggleAlert(flight.id)} className={`p-2 rounded-xl border transition-colors ${priceAlerts.includes(flight.id) ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-yellow-500'}`}>
                                                    <Icons.Bell className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <Button onClick={() => onBook(flight)} className="px-8 shadow-lg shadow-sky-500/20">Sélectionner</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* --- GLOBE VIEW --- */}
                {viewMode === 'globe' && (
                    <motion.div key="globe" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="h-[600px] liquid-glass rounded-[3rem] overflow-hidden relative border border-white/20">
                        <Globe3D searchParams={searchParams} setSearchParams={setSearchParams} setView={setView} settings={globeSettings} flights={flights} />
                        <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white max-w-xs">
                            <h4 className="font-bold mb-1 text-sm">Visualisation 3D</h4>
                            <p className="text-xs text-slate-300">Les lignes représentent les vols filtrés. Cliquez sur une ville pour la définir comme destination.</p>
                            <div className="flex gap-2 mt-3 text-[10px] font-bold uppercase">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span> Eco</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#a78bfa]"></span> Business</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span> Première</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* --- COMPARE VIEW --- */}
                {viewMode === 'compare' && (
                    <motion.div key="compare" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        {selectedCompare.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="bg-slate-100 dark:bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><Icons.Filter className="w-8 h-8 text-slate-400" /></div>
                                <h3 className="text-2xl font-bold dark:text-white mb-2">Aucun vol sélectionné</h3>
                                <p className="text-slate-500 mb-6">Ajoutez jusqu'à 3 vols depuis la liste pour les comparer.</p>
                                <Button onClick={() => setViewMode('list')}>Retour à la liste</Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {selectedCompare.map(flight => (
                                    <div key={flight.id} className="liquid-glass rounded-[2.5rem] p-6 relative overflow-hidden">
                                        <button onClick={() => toggleCompare(flight)} className="absolute top-4 right-4 p-2 bg-red-50 dark:bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"><Icons.X className="w-4 h-4" /></button>
                                        <div className="text-center mb-6">
                                            <img src={flight.image} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 shadow-lg" alt="" />
                                            <h3 className="text-xl font-bold dark:text-white">{flight.origin} <br/>↓<br/> {flight.dest}</h3>
                                            <Badge color="blue" className="mt-2 inline-block">{flight.airline}</Badge>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="flex justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl items-center">
                                                <span className="text-sm text-slate-500">Prix</span>
                                                <span className="text-2xl font-bold text-sky-500">{flight.price}€</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-xl items-center border border-slate-100 dark:border-white/5">
                                                <span className="text-sm text-slate-500">Durée</span>
                                                <span className="font-bold dark:text-white">{flight.duration}</span>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-xl items-center border border-slate-100 dark:border-white/5">
                                                <span className="text-sm text-slate-500">Score Qualité</span>
                                                <div className="flex items-center gap-1 font-bold dark:text-white"><Icons.Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/> {flight.score}/10</div>
                                            </div>
                                            <div className="flex justify-between p-3 rounded-xl items-center border border-slate-100 dark:border-white/5">
                                                <span className="text-sm text-slate-500">Impact CO2</span>
                                                <span className={`font-bold ${flight.co2 < 100 ? 'text-green-500' : 'text-orange-500'}`}>{flight.co2} kg</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <div className={`text-xs text-center p-2 rounded-lg ${flight.amenities.wifi ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>WiFi</div>
                                                <div className={`text-xs text-center p-2 rounded-lg ${flight.amenities.meal ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>Repas</div>
                                            </div>
                                        </div>
                                        <Button onClick={() => onBook(flight)} className="w-full mt-8">Choisir ce vol</Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};
