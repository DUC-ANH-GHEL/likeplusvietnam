import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import serviceService, { OrderStatus } from '../services/serviceService';
import { 
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  HashtagIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useToast } from '../components/ToastContext';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderIds, setOrderIds] = useState<string>('');

  const toast = useToast();

  const fetchOrders = async () => {
    if (!orderIds.trim()) {
      toast.toast('Vui lòng nhập ID đơn hàng', 'error');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const ids = orderIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      if (ids.length === 0) {
        toast.toast('Vui lòng nhập ID đơn hàng hợp lệ', 'error');
        return;
      }

      const ordersData = await serviceService.getMultipleOrderStatus(ids);
      setOrders(ordersData);
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.';
      toast.toast(msg, 'error');
      setError(msg);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'processing':
        return <ArrowPathIcon className="w-4 h-4 animate-spin" />;
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'cancelled':
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <ExclamationTriangleIcon className="w-4 h-4" />;
    }
  };

  const formatPrice = (price: string) => {
    const amount = parseFloat(price);
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getProgressPercentage = (startCount: number, remains: number, total: number) => {
    const completed = startCount;
    return Math.round((completed / total) * 100);
  };

  return (
    <>
      <Helmet>
        <title>Quản lý đơn hàng - LikePlusVietNam</title>
        <meta name="description" content="Theo dõi trạng thái đơn hàng của bạn." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Theo dõi đơn hàng realtime</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Quản Lý Đơn Hàng
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tra cứu và theo dõi trạng thái đơn hàng của bạn một cách nhanh chóng và chính xác
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <MagnifyingGlassIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Tra cứu đơn hàng</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                <ClipboardDocumentListIcon className="w-5 h-5 inline mr-2 text-green-600" />
                ID đơn hàng
              </label>
              <input
                type="text"
                value={orderIds}
                onChange={(e) => setOrderIds(e.target.value)}
                placeholder="Ví dụ: 123, 456, 789 (phân cách bằng dấu phẩy)"
                className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <InformationCircleIcon className="w-4 h-4 mr-1" />
                Có thể tra cứu nhiều đơn hàng cùng lúc
              </p>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang tìm...</span>
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="w-6 h-6" />
                    <span>Tra cứu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <EyeIcon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Kết quả tra cứu</h2>
                </div>
                <div className="text-sm text-gray-600">
                  Tìm thấy <span className="font-semibold text-blue-600">{orders.length}</span> đơn hàng
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      ID đơn hàng
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Tiến độ
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Chi phí
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.order} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            #{order.order}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="w-full">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Tiến độ</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {getProgressPercentage(order.start_count, order.remains, order.start_count + order.remains)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(order.start_count, order.remains, order.start_count + order.remains)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <HashtagIcon className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-600">Đã thực hiện:</span>
                            <span className="font-semibold text-green-600">{order.start_count}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <HashtagIcon className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-gray-600">Còn lại:</span>
                            <span className="font-semibold text-orange-600">{order.remains}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                          <span className="text-lg font-bold text-green-600">
                            {formatPrice(order.charge)}
                          </span>
                          <span className="text-sm text-gray-500">{order.currency}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <InformationCircleIcon className="w-6 h-6 mr-2 text-blue-600" />
            Hướng dẫn sử dụng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Cách tra cứu:</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <span>Nhập ID đơn hàng vào ô tìm kiếm</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <span>Có thể tra cứu nhiều đơn hàng bằng cách phân cách bằng dấu phẩy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <span>Nhấn "Tra cứu" để xem kết quả</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Trạng thái đơn hàng:</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span><strong>Pending:</strong> Chờ xử lý</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>Processing:</strong> Đang xử lý</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>Completed:</strong> Hoàn thành</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span><strong>Cancelled:</strong> Đã hủy</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Lưu ý:</strong> Nếu có vấn đề với đơn hàng, vui lòng liên hệ hỗ trợ qua email hoặc hotline để được hỗ trợ nhanh chóng.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders; 