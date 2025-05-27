import api from './api';

interface OrderData {
  // Add your order fields here based on your Laravel backend requirements
  package_id: string | number;
  pickup_address: string;
  delivery_address: string;
  notes?: string;
  scheduled_date?: string;
  // Add other fields as needed
}

interface OrderStatus {
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  notes?: string;
}

class OrderService {
  async createOrder(data: OrderData) {
    try {
      const response = await api.post('/orders', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }

  async updateOrderStatus(id: string | number, data: OrderStatus) {
    try {
      const response = await api.patch(`/orders/${id}/status`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update order status');
    }
  }

  async getMyOrders() {
    try {
      const response = await api.get('/orders/my-orders');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  }

  async createReview(data: { order_id: string | number; rating: number; comment?: string }) {
    try {
      const response = await api.post('/reviews', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to submit review');
    }
  }
}

export const orderService = new OrderService(); 