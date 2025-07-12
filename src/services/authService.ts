import apiClient from './api';
import paymentService, { Balance } from './paymentService';

export interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  created_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  // Lấy thông tin user hiện tại (sử dụng balance API)
  async getCurrentUser(): Promise<User> {
    try {
      const balanceData = await paymentService.getBalance();
      
      // Tạo mock user data vì API không có endpoint user
      const user: User = {
        id: 1,
        name: 'User',
        email: 'user@example.com',
        balance: parseFloat(balanceData.balance),
        created_at: new Date().toISOString()
      };
      
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Kiểm tra user đã đăng nhập chưa (luôn trả về true vì dùng API key)
  isAuthenticated(): boolean {
    return true; // Luôn authenticated vì dùng API key
  }

  // Lấy user từ localStorage hoặc API
  async getStoredUser(): Promise<User | null> {
    try {
      return await this.getCurrentUser();
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  // Đăng nhập (mock function vì API không có authentication)
  async login(data: LoginData): Promise<AuthResponse> {
    throw new Error('API không hỗ trợ authentication. Vui lòng sử dụng API key.');
  }

  // Đăng ký (mock function vì API không có authentication)
  async register(data: RegisterData): Promise<AuthResponse> {
    throw new Error('API không hỗ trợ authentication. Vui lòng sử dụng API key.');
  }

  // Đăng xuất (mock function vì API không có authentication)
  async logout(): Promise<void> {
    // Không cần làm gì vì dùng API key
    console.log('Logged out (API key based authentication)');
  }

  // Refresh user data
  async refreshUserData(): Promise<User> {
    return await this.getCurrentUser();
  }
}

const authService = new AuthService();
export default authService; 