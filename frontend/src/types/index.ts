export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  services: string[];
  rating: number;
  reviews: number;
  image: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  providerId: string;
  userId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
