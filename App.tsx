
import React, { useState, useEffect } from 'react';
import { NavBar, Footer } from './components/Layout';
import { HomePage, FlightsPage, AuthPage, CartPage, DashboardPage, SuccessPage, BookingSidePanel, PaymentPage } from './components/Views';
import { MiniGame } from './components/MiniGame';
import { FLIGHTS_DATA } from './constants';
import { Flight, User, FiltersState, SearchParams, ViewState, PassengerInfo, AppSettings } from './types';

function App() {
    const [view, setView] = useState<ViewState>('home');
    const [user, setUser] = useState<User | null>(null);
    const [cart, setCart] = useState<Flight[]>([]);
    const [searchParams, setSearchParams] = useState<SearchParams>({ origin: '', dest: '', date: '' });
    const [filters, setFilters] = useState<FiltersState>({ maxPrice: 5000, classType: 'all', sort: 'price-asc' });
    const [darkMode, setDarkMode] = useState(false);
    
    // App Settings
    const [appSettings, setAppSettings] = useState<AppSettings>({
        language: 'fr',
        currency: 'EUR',
        theme: 'system',
        accessibility: { fontSize: 'normal', reducedMotion: false },
        notifications: { email: true, push: true, promo: true, security: true },
        globe: { rotationSpeed: 0.5, showAtmosphere: true, zoomEnabled: true }
    });

    // Booking Logic
    const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('sky_theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('sky_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('sky_theme', 'light');
        }
    };

    const handleLogin = (email: string, _password: string) => {
        setTimeout(() => {
            setUser({ 
                name: 'Thomas Dupont', 
                email: email, 
                points: 2400,
                firstName: 'Thomas',
                lastName: 'Dupont',
                phone: '+33 6 12 34 56 78',
                sessions: [
                    { id: '1', device: 'iPhone 13', os: 'iOS 16', location: 'Paris, FR', lastActive: 'Maintenant', isCurrent: true, type: 'mobile' },
                    { id: '2', device: 'MacBook Pro', os: 'macOS Ventura', location: 'Lyon, FR', lastActive: '2 heures', isCurrent: false, type: 'desktop' }
                ],
                savedCards: [
                    { id: '1', type: 'card', last4: '4242', brand: 'visa', expiry: '12/25', holder: 'THOMAS DUPONT' },
                ],
                transactions: [
                    { id: 'tx_1', date: '15 Oct 2023', amount: 450.00, description: 'Vol Paris - New York', status: 'completed', method: 'Visa •••• 4242' },
                    { id: 'tx_2', date: '12 Oct 2023', amount: 120.00, description: 'Vol Berlin - Paris', status: 'completed', method: 'Visa •••• 4242' },
                ]
            });
            setView('dashboard');
        }, 800);
    };

    const handleRegister = (name: string, email: string) => {
        setTimeout(() => {
            const names = name.split(' ');
            setUser({ 
                name: name, 
                email: email, 
                points: 0,
                firstName: names[0],
                lastName: names.length > 1 ? names.slice(1).join(' ') : '',
                sessions: [],
                savedCards: [],
                transactions: []
            });
            setView('dashboard');
        }, 800);
    };

    const handleLogout = () => { setUser(null); setView('home'); };

    const handleUpdateUser = (updatedUser: User) => {
        setUser(updatedUser);
        console.log("User updated:", updatedUser);
    };

    const removeFromCart = (flightId: number) => setCart(cart.filter(item => item.id !== flightId));
    const clearCart = () => setCart([]);

    const getFilteredFlights = () => {
        let results = FLIGHTS_DATA;
        if (searchParams.dest) results = results.filter(f => f.dest.toLowerCase().includes(searchParams.dest.toLowerCase()));
        if (searchParams.origin) results = results.filter(f => f.origin.toLowerCase().includes(searchParams.origin.toLowerCase()));
        results = results.filter(f => f.price <= filters.maxPrice);
        if (filters.classType !== 'all') results = results.filter(f => f.type === filters.classType);
        
        if (filters.sort === 'price-asc') results.sort((a, b) => a.price - b.price);
        else if (filters.sort === 'price-desc') results.sort((a, b) => b.price - a.price);
        else if (filters.sort === 'duration') results.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        else if (filters.sort === 'score') results.sort((a, b) => b.score - a.score);
        
        return results;
    };

    // New Booking Flow
    const handleBookFlight = (flight: Flight) => {
        setSelectedFlight(flight);
        setIsBookingPanelOpen(true);
    };

    const handleConfirmBooking = (passengerInfo: PassengerInfo) => {
        if (selectedFlight) {
            setCart([...cart, selectedFlight]);
            setIsBookingPanelOpen(false);
            setSelectedFlight(null);
            
            if (user) {
                setView('cart');
            } else {
                setView('login');
            }
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-300">
            <NavBar 
                view={view} 
                setView={setView} 
                user={user} 
                cartCount={cart.length} 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode} 
            />
            
            <BookingSidePanel 
                isOpen={isBookingPanelOpen} 
                onClose={() => setIsBookingPanelOpen(false)} 
                flight={selectedFlight}
                user={user}
                onConfirm={handleConfirmBooking}
            />
            
            <div className="pt-20">
                {view === 'minigame' && <MiniGame onClose={() => setView('home')} />}
                {view === 'home' && (
                    <HomePage 
                        searchParams={searchParams} 
                        setSearchParams={setSearchParams} 
                        setView={setView} 
                        onBook={handleBookFlight} 
                        appSettings={appSettings}
                    />
                )}
                
                {/* Updated to FlightsPage (formerly Catalog) */}
                {(view === 'flights') && (
                    <FlightsPage 
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        filters={filters} 
                        setFilters={setFilters} 
                        getFilteredFlights={getFilteredFlights} 
                        onBook={handleBookFlight}
                        setView={setView}
                        globeSettings={appSettings.globe}
                    />
                )}

                {view === 'login' && <AuthPage type="login" handleLogin={handleLogin} handleRegister={handleRegister} setView={setView} />}
                {view === 'register' && <AuthPage type="register" handleLogin={handleLogin} handleRegister={handleRegister} setView={setView} />}
                {view === 'cart' && <CartPage cart={cart} user={user} removeFromCart={removeFromCart} clearCart={clearCart} setView={setView} />}
                
                {view === 'dashboard' && user && (
                    <DashboardPage 
                        user={user} 
                        settings={appSettings}
                        onUpdateSettings={setAppSettings}
                        onUpdateUser={handleUpdateUser} 
                        handleLogout={handleLogout} 
                    />
                )}

                {view === 'payment' && user && (
                    <PaymentPage 
                        totalAmount={cart.reduce((acc, item) => acc + item.price, 0)}
                        user={user}
                        onPaymentSuccess={() => {
                            clearCart();
                            setView('checkout_success');
                        }}
                        onBack={() => setView('cart')}
                    />
                )}

                {view === 'checkout_success' && <SuccessPage setView={setView} />}
            </div>
            
            <Footer />
        </div>
    );
}

export default App;