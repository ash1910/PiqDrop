import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
  role?: string;
  remember?: boolean;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  nationality: string;
  gender: string;
  role?: string;
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
    is_verified: number;
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

      throw error;
    }
  }

  async register(data: RegisterData) {
    console.log('Register Request:', { 
      url: '/register',
      data: { ...data, password: '****', password_confirmation: '****' } 
    });

    try {
      const response = await api.post('/register', data, {
        timeout: 30000, // 30 seconds timeout
      });
      
      console.log('Register Response:', {
        status: response.status,
        data: response.data
      });

      const { token : access_token, user } = response.data?.data;
      
      // Store the token with Bearer prefix
      await AsyncStorage.setItem('auth_token', `Bearer ${access_token}`);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error: any) {
      console.error('Register Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout
        }
      });

      throw error;
    }
  }

  async verifyOtp(email: string, otp: string) {
    try {
      const response = await api.post('/verify-otp', { email, otp });
      return response.data;
    } catch (error: any) {
      console.error('API Response Error:', error);
      throw error;
    }
  }

  async resendOtp(email: string) {
    try {
      const response = await api.post('/resend-otp', { email });
      return response.data;
    } catch (error: any) {
      console.error('Resend OTP Error:', error);
      throw error;
    }
  }

  async forgotPassword(data: ForgotPasswordData) {
    try {
      const response = await api.post('/forgot-password', data);
      return response.data;
    } catch (error: any) {
      console.error('Forgot Password Error:', error);
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordData) {
    try {
      const response = await api.post('/reset-password', data);
      return response.data;
    } catch (error: any) {
      console.error('Reset Password Error:', error);
      throw error;
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
      console.error('Logout Error:', error);
      
      // Even if the API call fails, clear local storage
      await AsyncStorage.multiRemove(['auth_token', 'user', 'remember_me']);
      
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const userStr = await AsyncStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error: any) {
      console.error('Get Current User Error:', error);
      throw error;
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
    } catch (error: any) {
      console.error('Is Authenticated Error:', error);
      throw error;
    }
  }

  async updateUserImage(imageUrl: string) {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        user.image = imageUrl;
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Update User Image Error:', error);
      throw error;
    }
  }

  async updateUserDocument(documentUrl: string) {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        user.document = documentUrl;
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Update User Document Error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService(); 