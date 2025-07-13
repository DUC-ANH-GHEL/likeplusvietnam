import apiClient from './api';

export interface Balance {
  balance: string;
  currency: string;
}

export interface DepositData {
  amount: number;
  payment_method: 'momo' | 'zalo' | 'bank_transfer' | 'vnpay';
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  min_amount: number;
  max_amount: number;
  fee_percentage: number;
}

export interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'order_payment';
  amount: number;
  fee: number;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  payment_method: string;
  reference_id?: string;
  description: string;
  created_at: string;
  updated_at: string;
}

class PaymentService {
  // Lấy số dư tài khoản
  async getBalance(): Promise<Balance> {
    try {
      const response = await apiClient.post('', {
        action: 'balance'
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  // Lấy danh sách phương thức thanh toán (mock data vì API không có endpoint này)
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // Mock data vì API thực tế không có endpoint này
    return [
      {
        id: 'momo',
        name: 'MoMo',
        icon: '💜',
        description: 'Chuyển khoản qua MoMo',
        min_amount: 10000,
        max_amount: 10000000,
        fee_percentage: 0
      },
      {
        id: 'zalo',
        name: 'ZaloPay',
        icon: '💙',
        description: 'Chuyển khoản qua ZaloPay',
        min_amount: 10000,
        max_amount: 10000000,
        fee_percentage: 0
      },
      {
        id: 'bank_transfer',
        name: 'Chuyển khoản ngân hàng',
        icon: '🏦',
        description: 'Chuyển khoản trực tiếp',
        min_amount: 50000,
        max_amount: 50000000,
        fee_percentage: 0
      },
      {
        id: 'vnpay',
        name: 'VNPay',
        icon: '💳',
        description: 'Thanh toán qua VNPay',
        min_amount: 10000,
        max_amount: 10000000,
        fee_percentage: 1
      }
    ];
  }

  // Tạo yêu cầu nạp tiền (mock function vì API không có endpoint này)
  async createDeposit(data: DepositData): Promise<{ transaction: Transaction; payment_url?: string }> {
    // Mock response vì API thực tế không có endpoint nạp tiền
    const mockTransaction: Transaction = {
      id: Date.now(),
      type: 'deposit',
      amount: data.amount,
      fee: data.amount * 0.01,
      total_amount: data.amount * 1.01,
      status: 'pending',
      payment_method: data.payment_method,
      description: `Nạp tiền qua ${data.payment_method}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return {
      transaction: mockTransaction,
      payment_url: `https://payment-gateway.com/pay?amount=${data.amount}&method=${data.payment_method}`
    };
  }

  // Lấy lịch sử giao dịch (mock data)
  async getTransactionHistory(): Promise<Transaction[]> {
    // Mock data vì API không có endpoint này
    return [];
  }

  // Lấy chi tiết giao dịch (mock function)
  async getTransactionById(id: number): Promise<Transaction> {
    throw new Error('API không hỗ trợ endpoint này');
  }

  // Kiểm tra trạng thái giao dịch (mock function)
  async checkTransactionStatus(id: number): Promise<Transaction> {
    throw new Error('API không hỗ trợ endpoint này');
  }

  // Hủy giao dịch (mock function)
  async cancelTransaction(id: number): Promise<void> {
    throw new Error('API không hỗ trợ endpoint này');
  }

  // Lấy thông tin tài khoản ngân hàng (mock data)
  async getBankAccounts(): Promise<any[]> {
    return [
      {
        bank_name: 'Vietcombank',
        account_number: '1234567890',
        account_name: 'CONG TY LIKE PLUS VIETNAM',
        branch: 'Chi nhánh Hà Nội'
      }
    ];
  }
}

const paymentService = new PaymentService();
export default paymentService; 