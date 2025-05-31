import api from './api';

export interface Package {
  id: number;
  info: string;
  weight: number;
  price: string;
  status: string;
  sender: {
    id: number;
    image: string;
  };
  pickup: {
    name: string;
    mobile: string;
    address: string;
    details: string | null;
    date: string;
    time: string;
    coordinates: {
      lat: string;
      lng: string;
    };
  };
  drop: {
    name: string;
    mobile: string;
    address: string;
    details: string | null;
    coordinates: {
      lat: string | null;
      lng: string | null;
    };
  };
  order: {
    id?: number;
    status: string;
    dropper?: {
      id: number;
      name: string;
    };
    created_at?: string;
    updated_at?: string;
  };
  created_at: string;
  updated_at: string;
}

class PackageListService {
  async getMyPackages() {
    try {
      const response = await api.get<Package[]>('/packages/my-packages');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const packageListService = new PackageListService(); 