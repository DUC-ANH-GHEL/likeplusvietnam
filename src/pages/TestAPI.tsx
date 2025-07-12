import React, { useState } from 'react';
import serviceService from '../services/serviceService';
import paymentService from '../services/paymentService';
import { useToast } from '../components/ToastContext';

const TestAPI: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  const testServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const services = await serviceService.getServices();
      setResult({ type: 'services', data: services });
      toast.toast('Lấy danh sách dịch vụ thành công!', 'success');
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Error testing services';
      toast.toast(msg, 'error');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const testBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      const balance = await paymentService.getBalance();
      setResult({ type: 'balance', data: balance });
      toast.toast('Lấy số dư thành công!', 'success');
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Error testing balance';
      toast.toast(msg, 'error');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const testOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderData = {
        service: 1,
        link: 'https://www.facebook.com/test',
        quantity: 100
      };
      const order = await serviceService.createOrder(orderData);
      setResult({ type: 'order', data: order });
      toast.toast('Tạo đơn hàng test thành công!', 'success');
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Error testing order';
      toast.toast(msg, 'error');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Test API</h1>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testServices}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
        >
          Test Services
        </button>
        
        <button
          onClick={testBalance}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded mr-4"
        >
          Test Balance
        </button>
        
        <button
          onClick={testOrder}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Test Order
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p>Testing API...</p>
        </div>
      )}
    </div>
  );
};

export default TestAPI; 