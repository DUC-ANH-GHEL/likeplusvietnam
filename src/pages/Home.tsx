import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  UserPlusIcon, 
  EyeIcon, 
  PlayIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BoltIcon,
  StarIcon,
  ArrowRightIcon,
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => (
  <>
    <Helmet>
      <title>LikePlusVietNam - Dịch vụ mạng xã hội uy tín</title>
      <meta name="description" content="LikePlusVietNam chuyên cung cấp dịch vụ tăng like, follow, view, sub mạng xã hội uy tín, giá rẻ, tự động, bảo mật." />
    </Helmet>

    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <StarIcon className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">Dịch vụ mạng xã hội hàng đầu Việt Nam</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Tăng Tương Tác
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Mạng Xã Hội
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Chuyên cung cấp dịch vụ tăng like, follow, view, sub mạng xã hội uy tín, 
            giá rẻ, tự động, bảo mật với hơn 10,000+ khách hàng tin tưởng.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BoltIcon className="w-5 h-5 mr-2" />
              Xem Dịch Vụ Ngay
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/deposit"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              Nạp Tiền Ngay
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-blue-200 text-sm">Khách hàng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-blue-200 text-sm">Đơn hàng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">99%</div>
              <div className="text-blue-200 text-sm">Hài lòng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dịch Vụ Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ tăng tương tác cho tất cả nền tảng mạng xã hội phổ biến
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Facebook */}
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-blue-200">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tăng Like Facebook</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Dịch vụ tăng like bài viết, fanpage, ảnh cá nhân nhanh chóng, an toàn với tài khoản thật.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Xem chi tiết
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Instagram */}
          <div className="group bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-pink-200">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserPlusIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tăng Follow Instagram</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Tăng follow, like, view Instagram chất lượng cao, bảo mật tuyệt đối, không bị khóa tài khoản.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-700 transition-colors"
            >
              Xem chi tiết
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* YouTube */}
          <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-red-200">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <PlayIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tăng Sub YouTube</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Tăng sub, view, like YouTube thật, hỗ trợ kênh phát triển mạnh mẽ, tăng doanh thu.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Xem chi tiết
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* TikTok */}
          <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <EyeIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tăng View TikTok</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Tăng view, like, follow TikTok nhanh chóng, giúp video viral và tăng độ phủ sóng.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center text-gray-600 font-semibold hover:text-gray-700 transition-colors"
            >
              Xem chi tiết
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những lý do khiến LikePlusVietNam trở thành lựa chọn hàng đầu của khách hàng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chất Lượng Cao</h3>
            <p className="text-gray-600 leading-relaxed">
              Tất cả dịch vụ đều sử dụng tài khoản thật, đảm bảo chất lượng và độ tin cậy cao nhất.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bảo Mật Tuyệt Đối</h3>
            <p className="text-gray-600 leading-relaxed">
              Thông tin khách hàng được mã hóa và bảo vệ an toàn, không bao giờ bị lộ ra ngoài.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BoltIcon className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Giao Hàng Nhanh</h3>
            <p className="text-gray-600 leading-relaxed">
              Hệ thống tự động xử lý 24/7, giao hàng nhanh chóng trong vòng 5-30 phút.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Sẵn Sàng Bắt Đầu?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Tham gia cùng hơn 10,000+ khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            <BoltIcon className="w-5 h-5 mr-2" />
            Xem Dịch Vụ
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            <UsersIcon className="w-5 h-5 mr-2" />
            Liên Hệ Tư Vấn
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Home; 