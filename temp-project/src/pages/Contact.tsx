import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  AtSymbolIcon
} from '@heroicons/react/24/outline';
import { useToast } from '../components/ToastContext';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.toast('Tin nhắn đã được gửi thành công!', 'success');
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Liên hệ - LikePlusVietNam</title>
        <meta name="description" content="Liên hệ LikePlusVietNam để được tư vấn, hỗ trợ dịch vụ mạng xã hội nhanh chóng." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Hỗ trợ 24/7</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn mọi lúc, mọi nơi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Gửi tin nhắn</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-1 text-blue-600" />
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <AtSymbolIcon className="w-4 h-4 inline mr-1 text-green-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <PhoneIcon className="w-4 h-4 inline mr-1 text-purple-600" />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1 text-orange-600" />
                    Chủ đề
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="tư-vấn-dịch-vụ">Tư vấn dịch vụ</option>
                    <option value="hỗ-trợ-kỹ-thuật">Hỗ trợ kỹ thuật</option>
                    <option value="thanh-toán">Vấn đề thanh toán</option>
                    <option value="đơn-hàng">Tra cứu đơn hàng</option>
                    <option value="khác">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1 text-blue-600" />
                  Nội dung tin nhắn
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Mô tả chi tiết vấn đề hoặc yêu cầu của bạn..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-6 h-6" />
                    <span>Gửi tin nhắn</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Điện thoại</h4>
                    <p className="text-gray-600">1900-xxxx</p>
                    <p className="text-gray-600">+84 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">support@likeplus.vn</p>
                    <p className="text-gray-600">info@likeplus.vn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Địa chỉ</h4>
                    <p className="text-gray-600">123 Đường ABC, Quận 1</p>
                    <p className="text-gray-600">TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Giờ làm việc</h4>
                    <p className="text-gray-600">Thứ 2 - Chủ nhật: 24/7</p>
                    <p className="text-gray-600">Hỗ trợ khách hàng không ngừng nghỉ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Liên hệ nhanh</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>Phản hồi trong vòng 5 phút</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>Hỗ trợ qua nhiều kênh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>Tư vấn miễn phí 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>Đội ngũ chuyên nghiệp</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kết nối với chúng tôi</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <span className="text-2xl">📘</span>
                  <span className="font-medium">Facebook</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors">
                  <span className="text-2xl">📷</span>
                  <span className="font-medium">Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                  <span className="text-2xl">🐦</span>
                  <span className="font-medium">Twitter</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                  <span className="text-2xl">📺</span>
                  <span className="font-medium">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
            <p className="text-gray-600">Những câu hỏi phổ biến về dịch vụ của chúng tôi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Dịch vụ có an toàn không?</h4>
              <p className="text-gray-600 text-sm">
                Tất cả dịch vụ đều sử dụng tài khoản thật, đảm bảo an toàn và không bị khóa tài khoản.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Thời gian giao hàng bao lâu?</h4>
              <p className="text-gray-600 text-sm">
                Thời gian giao hàng từ 5-30 phút tùy thuộc vào loại dịch vụ và số lượng.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Có hoàn tiền không?</h4>
              <p className="text-gray-600 text-sm">
                Chúng tôi cam kết hoàn tiền 100% nếu dịch vụ không đạt chất lượng như cam kết.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Hỗ trợ qua kênh nào?</h4>
              <p className="text-gray-600 text-sm">
                Hỗ trợ qua email, điện thoại, chat trực tuyến và các mạng xã hội 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact; 