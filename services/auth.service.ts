import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
  role?: string;
  remember?: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  message: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string | null;
    address: string | null;
    image: string | null;
    gender: string;
    nationality: string;
    date_of_birth: string | null;
    document: string | null;
    created_at: string;
    updated_at: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials) {
    console.log('Login Request:', { 
      url: '/login',
      data: { ...credentials, password: '****' } 
    });

    try {
      const response = await api.post<LoginResponse>('/login', credentials, {
        timeout: 30000, // 30 seconds timeout
      });
      console.log('Login Response:', {
        status: response.status,
        data: response.data
      });

      const { access_token, user } = response.data;
      
      // Store the token with Bearer prefix
      await AsyncStorage.setItem('auth_token', `Bearer ${access_token}`);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      // If remember me is true, store a flag
      if (credentials.remember) {
        await AsyncStorage.setItem('remember_me', 'true');
      } else {
        await AsyncStorage.removeItem('remember_me');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout
        }
      });

      if (error.code === 'ECONNABORTED') {
        throw new Error('Login request timed out. Please try again.');
      }

      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Login failed. Please try again.'
      );
    }
  }

  async register(data: RegisterData) {
    try {
      const response = await api.post('/register', data);
      const { token, user } = response.data;
      
      // Store the token
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async verifyOtp(email: string, otp: string) {
    try {
      const response = await api.post('/verify-otp', { email, otp });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    }
  }

  async resendOtp(email: string) {
    try {
      const response = await api.post('/resend-otp', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  }

  async forgotPassword(data: ForgotPasswordData) {
    try {
      const response = await api.post('/forgot-password', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset password link');
    }
  }

  async resetPassword(data: ResetPasswordData) {
    try {
      const response = await api.post('/reset-password', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  }

  async logout() {
    try {
      console.log('Logging out...');
      await api.post('/logout');
      console.log('Logout API call successful');
      
      // Clear all auth data including remember me
      await AsyncStorage.multiRemove(['auth_token', 'user', 'remember_me']);
      console.log('Local storage cleared');
    } catch (error: any) {
      console.error('Logout Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Even if the API call fails, clear local storage
      await AsyncStorage.multiRemove(['auth_token', 'user', 'remember_me']);
      
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Logout failed. Please try again.'
      );
    }
  }

  async getCurrentUser() {
    try {
      const userStr = await AsyncStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }

  async isAuthenticated() {
    try {
      const [token, rememberMe] = await AsyncStorage.multiGet(['auth_token', 'remember_me']);
      
      // If remember me is not set, user needs to login again
      if (!rememberMe[1]) {
        return false;
      }
      
      return !!token[0];
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService(); 