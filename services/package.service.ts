import api from './api';

interface PackageCreateRequest {
  pickup_name: string;
  pickup_mobile: string;
  pickup_address: string;
  pickup_details?: string;
  weight: number;
  price: number;
  pickup_date: string;
  pickup_time: string;
  drop_name: string;
  drop_mobile: string;
  drop_address: string;
  drop_details?: string;
  pickup_lat?: number;
  pickup_lng?: number;
  drop_lat?: number;
  drop_lng?: number;
}

class PackageService {
  async createPackage(data: PackageCreateRequest) {
    try {
      const response = await api.post('/packages', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const packageService = new PackageService(); 