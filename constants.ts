
import { Flight } from './types';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80';

// Coordonnées approximatives pour la simulation 3D
const COORDS = {
    PARIS: { lat: 48.8566, lon: 2.3522 },
    NY: { lat: 40.7128, lon: -74.0060 },
    DUBAI: { lat: 25.2048, lon: 55.2708 },
    TOKYO: { lat: 35.6762, lon: 139.6503 },
    BERLIN: { lat: 52.5200, lon: 13.4050 },
    LONDON: { lat: 51.5074, lon: -0.1278 },
    SYDNEY: { lat: -33.8688, lon: 151.2093 },
    LA: { lat: 34.0522, lon: -118.2437 },
    NICE: { lat: 43.7102, lon: 7.2620 },
    ROME: { lat: 41.9028, lon: 12.4964 }
};

export const FLIGHTS_DATA: Flight[] = [
    { 
        id: 1, airline: 'Air France', logo: 'AF', origin: 'Paris (CDG)', dest: 'New York (JFK)', 
        date: '2023-12-15', duration: '8h 15m', price: 450, type: 'Économique', stops: 0, 
        image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=800&q=80', seatsRemaining: 5,
        co2: 320, score: 8.5, amenities: { wifi: true, meal: true, usb: true, legroom: 'Standard' },
        coordinates: { start: COORDS.PARIS, end: COORDS.NY }, tags: ['Meilleur prix']
    },
    { 
        id: 2, airline: 'Emirates', logo: 'EK', origin: 'Paris (CDG)', dest: 'Dubai (DXB)', 
        date: '2023-12-16', duration: '6h 50m', price: 890, type: 'Business', stops: 0, 
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcefacf?auto=format&fit=crop&w=800&q=80', seatsRemaining: 12,
        co2: 450, score: 9.8, amenities: { wifi: true, meal: true, usb: true, legroom: 'Extra' },
        coordinates: { start: COORDS.PARIS, end: COORDS.DUBAI }, tags: ['Le plus rapide']
    },
    { 
        id: 3, airline: 'JAL', logo: 'JL', origin: 'Paris (CDG)', dest: 'Tokyo (HND)', 
        date: '2023-12-18', duration: '14h 20m', price: 1200, type: 'Économique', stops: 1, 
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80', seatsRemaining: 3,
        co2: 680, score: 8.9, amenities: { wifi: true, meal: true, usb: true, legroom: 'Standard' },
        coordinates: { start: COORDS.PARIS, end: COORDS.TOKYO }
    },
    { 
        id: 4, airline: 'Lufthansa', logo: 'LH', origin: 'Berlin (BER)', dest: 'Paris (CDG)', 
        date: '2023-12-15', duration: '1h 45m', price: 120, type: 'Économique', stops: 0, 
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        co2: 45, score: 7.5, amenities: { wifi: false, meal: false, usb: true, legroom: 'Standard' },
        coordinates: { start: COORDS.BERLIN, end: COORDS.PARIS }, tags: ['Eco-responsable']
    },
    { 
        id: 5, airline: 'British Airways', logo: 'BA', origin: 'Londres (LHR)', dest: 'New York (JFK)', 
        date: '2023-12-20', duration: '7h 55m', price: 3200, type: 'Première', stops: 0, 
        image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=800&q=80', seatsRemaining: 2,
        co2: 900, score: 9.9, amenities: { wifi: true, meal: true, usb: true, legroom: 'Extra' },
        coordinates: { start: COORDS.LONDON, end: COORDS.NY }
    },
    { 
        id: 6, airline: 'Qatar Airways', logo: 'QR', origin: 'Paris (CDG)', dest: 'Sydney (SYD)', 
        date: '2023-12-22', duration: '22h 10m', price: 1150, type: 'Économique', stops: 1, 
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80', seatsRemaining: 8,
        co2: 1100, score: 9.0, amenities: { wifi: true, meal: true, usb: true, legroom: 'Standard' },
        coordinates: { start: COORDS.PARIS, end: COORDS.SYDNEY }
    },
    { 
        id: 7, airline: 'Delta', logo: 'DL', origin: 'Paris (CDG)', dest: 'Los Angeles (LAX)', 
        date: '2023-12-19', duration: '11h 30m', price: 580, type: 'Économique', stops: 0, 
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', seatsRemaining: 20,
        co2: 410, score: 8.2, amenities: { wifi: true, meal: true, usb: true, legroom: 'Standard' },
        coordinates: { start: COORDS.PARIS, end: COORDS.LA }, tags: ['Meilleur prix']
    },
    { 
        id: 8, airline: 'Air France', logo: 'AF', origin: 'Nice (NCE)', dest: 'Rome (FCO)', 
        date: '2023-12-15', duration: '1h 10m', price: 95, type: 'Économique', stops: 0, 
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
        co2: 30, score: 7.8, amenities: { wifi: false, meal: false, usb: false, legroom: 'Standard' },
        coordinates: { start: COORDS.NICE, end: COORDS.ROME }, tags: ['Eco-responsable']
    },
];

export const FALLBACK_IMG_URL = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'; // Nuages/Ciel
