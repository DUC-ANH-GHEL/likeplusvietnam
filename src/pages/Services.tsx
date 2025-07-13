import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import serviceService, { Service } from '../services/serviceService';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  BoltIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  FireIcon,
  StarIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useToast } from '../components/ToastContext';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toast = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getServices();
      setServices(data);
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.';
      setError(msg);
      toast.toast(msg, 'error');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    const categoryMatch = selectedCategory === 'all' || (service.category && service.category === selectedCategory);
    const searchMatch = searchTerm === '' || (service.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                       (service.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];

  const formatPrice = (rate: string) => {
    const price = parseFloat(rate);
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getCategoryIcon = (category: string | undefined) => {
    if (!category) return '🔗';
    switch (category.toLowerCase()) {
      case 'facebook':
        return '📘';
      case 'instagram':
        return '📷';
      case 'youtube':
        return '📺';
      case 'tiktok':
        return '🎵';
      case 'twitter':
        return '🐦';
      default:
        return '🔗';
    }
  };

  // Gom nhóm dịch vụ theo tên chính (ví dụ: Tăng Follow TikTok)
  const groupServices = (servicesToGroup: Service[]) => {
    const groups: { [key: string]: Service[] } = {};
    servicesToGroup.forEach(service => {
      const mainName = service.name?.split(' - ')[0]?.trim() || 'Dịch vụ khác';
      if (!groups[mainName]) groups[mainName] = [];
      groups[mainName].push(service);
    });
    return groups;
  };

  const serviceGroups = groupServices(filteredServices);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách dịch vụ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <div className="text-red-700 mb-4">{error}</div>
          <button 
            onClick={fetchServices}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dịch vụ - LikePlusVietNam</title>
        <meta name="description" content="Danh sách các dịch vụ tăng like, follow, view, sub mạng xã hội uy tín." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Hơn 100+ dịch vụ chất lượng</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ Mạng Xã Hội
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chọn dịch vụ phù hợp với nhu cầu của bạn. Tất cả dịch vụ đều được đảm bảo chất lượng và giao hàng nhanh chóng.
          </p>
        </div>
        
        {/* Quick Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Tìm kiếm nhanh</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Nhập tên dịch vụ bạn cần..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Xóa tìm kiếm
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <FunnelIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Danh mục dịch vụ</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'Tất cả' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Services Quick Access */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <FireIcon className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Dịch vụ phổ biến</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Facebook', 'Instagram', 'YouTube', 'TikTok'].map(platform => (
              <button
                key={platform}
                onClick={() => setSelectedCategory(platform)}
                className="bg-white rounded-xl p-3 text-center hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <div className="text-2xl mb-1">{getCategoryIcon(platform)}</div>
                <div className="text-sm font-medium text-gray-700">{platform}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Tìm thấy <span className="font-semibold text-blue-600">{filteredServices.length}</span> dịch vụ
          </div>
          <div className="text-sm text-gray-500">
            Hiển thị {filteredServices.length} / {services.length} dịch vụ
          </div>
        </div>

        {/* Sticky Category Navigation */}
        {selectedCategory !== 'all' && (
          <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 mb-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(selectedCategory)}</span>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCategory} - {filteredServices.length} dịch vụ
                </h2>
              </div>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Xem tất cả
              </button>
            </div>
          </div>
        )}

        {/* Services Main List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Object.entries(serviceGroups).map(([mainName, group]) => {
            const hasActive = (group as any[]).some(s => (s as any).status === true);
            return (
              <div key={mainName} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-between">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{getCategoryIcon(group[0]?.category)}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{mainName}</h2>
                </div>
                <div className="text-gray-500 text-center mb-6">{group.length} lựa chọn giá/server</div>
                {hasActive ? (
                  <Link
                    to={`/order?main=${encodeURIComponent(mainName)}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <BoltIcon className="w-6 h-6" />
                    <span>Đặt hàng</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="w-full bg-gray-200 text-gray-400 py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg opacity-60 cursor-not-allowed"
                    onClick={() => toast.toast('Tạm thời không có server khả dụng cho dịch vụ này', 'info')}
                    disabled
                  >
                    <BoltIcon className="w-6 h-6" />
                    <span>Đặt hàng</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services; 