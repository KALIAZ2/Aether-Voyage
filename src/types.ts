
export interface FlightAttributes {
    wifi: boolean;
    meal: boolean;
    usb: boolean;
    legroom: string;
}

export interface FlightCoordinates {
    start: { lat: number; lon: number };
    end: { lat: number; lon: number };
}

export interface Flight {
    id: number;
    airline: string;
    logo: string;
    origin: string;
    dest: string;
    date: string;
    duration: string;
    price: number;
    type: 'Économique' | 'Business' | 'Première';
    stops: number;
    image: string;
    seatsRemaining?: number;
    co2: number;
    score: number;
    amenities: FlightAttributes;
    coordinates: FlightCoordinates;
    tags?: ('Eco-responsable' | 'Le plus rapide' | 'Meilleur prix')[];
}

export interface GlobeSettings {
    rotationSpeed: number;
    showAtmosphere: boolean;
    zoomEnabled: boolean;
}

export interface AppSettings {
    language: 'fr' | 'en';
    currency: 'EUR' | 'USD' | 'GBP';
    theme: 'light' | 'dark' | 'system';
    accessibility: {
        fontSize: 'normal' | 'large';
        reducedMotion: boolean;
    };
    notifications: {
        email: boolean;
        push: boolean;
        promo: boolean;
        security: boolean;
    };
    globe: GlobeSettings;
}

export interface UserSession {
    id: string;
    device: string;
    os: string;
    location: string;
    lastActive: string;
    isCurrent: boolean;
    type: 'mobile' | 'desktop' | 'tablet';
}

export interface PaymentMethod {
    id: string;
    type: 'card' | 'paypal' | 'google' | 'apple';
    last4?: string;
    brand?: 'visa' | 'mastercard';
    expiry?: string;
    holder?: string;
    isDefault?: boolean;
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    description: string;
    status: 'completed' | 'pending' | 'failed';
    method: string;
}

export interface User {
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    points: number;
    phone?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    passportNumber?: string;
    avatar?: string;
    settings?: AppSettings;
    favorites?: number[];
    sessions?: UserSession[];
    savedCards?: PaymentMethod[];
    transactions?: Transaction[];
}

export interface PassengerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    passportNumber: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    emergencyContact?: string;
}

export interface SearchParams {
    origin: string;
    dest: string;
    date: string;
    passengers?: number;
}

export interface FiltersState {
    maxPrice: number;
    classType: string;
    sort: 'price-asc' | 'price-desc' | 'duration' | 'score';
    stops?: 'any' | 'direct' | 'one';
}

export type ViewState = 'home' | 'flights' | 'login' | 'register' | 'cart' | 'dashboard' | 'checkout_success' | 'minigame' | 'payment';
