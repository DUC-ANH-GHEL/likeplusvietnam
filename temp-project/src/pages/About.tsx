import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  HeartIcon,
  ShieldCheckIcon,
  BoltIcon,
  StarIcon,
  UsersIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  SparklesIcon,
  TrophyIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => (
  <>
    <Helmet>
      <title>Giới thiệu - LikePlusVietNam</title>
      <meta name="description" content="Giới thiệu về LikePlusVietNam - nền tảng cung cấp dịch vụ mạng xã hội uy tín, giá rẻ, tự động." />
    </Helmet>

    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <StarIcon className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">Được tin tưởng bởi 10,000+ khách hàng</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Về
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              LikePlusVietNam
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Nền tảng hàng đầu Việt Nam chuyên cung cấp dịch vụ tăng tương tác mạng xã hội 
            với công nghệ hiện đại và đội ngũ chuyên nghiệp.
          </p>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Khách hàng</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrophyIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-600">Đơn hàng</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GlobeAltIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
            <div className="text-gray-600">Dịch vụ</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Hỗ trợ</div>
          </div>
        </div>
      </div>
    </section>

    {/* About Content */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
              <SparklesIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Câu chuyện của chúng tôi</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sứ Mệnh & Tầm Nhìn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho khách hàng với dịch vụ chất lượng cao
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ Mệnh</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                LikePlusVietNam được thành lập với sứ mệnh trở thành nền tảng hàng đầu Việt Nam 
                trong lĩnh vực cung cấp dịch vụ tăng tương tác mạng xã hội. Chúng tôi cam kết mang 
                lại những giải pháp hiệu quả, an toàn và bảo mật cho khách hàng.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Với đội ngũ chuyên gia giàu kinh nghiệm và công nghệ hiện đại, chúng tôi không 
                ngừng cải tiến và phát triển để đáp ứng mọi nhu cầu của khách hàng.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm Nhìn</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Chúng tôi hướng đến việc trở thành đối tác tin cậy của mọi doanh nghiệp và cá nhân 
                trong việc phát triển sự hiện diện trên mạng xã hội. Mục tiêu của chúng tôi là 
                xây dựng một cộng đồng mạnh mẽ với những dịch vụ chất lượng cao.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Trong tương lai, chúng tôi sẽ mở rộng ra thị trường quốc tế và trở thành 
                thương hiệu toàn cầu trong lĩnh vực dịch vụ mạng xã hội.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Values Section */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Giá Trị Cốt Lõi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những giá trị định hình nên thương hiệu LikePlusVietNam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <HeartIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Uy Tín</h3>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi cam kết cung cấp dịch vụ chất lượng cao, đảm bảo uy tín và độ tin cậy 
              trong mọi giao dịch với khách hàng.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bảo Mật</h3>
            <p className="text-gray-600 leading-relaxed">
              Thông tin khách hàng được bảo vệ tuyệt đối với công nghệ mã hóa tiên tiến, 
              đảm bảo an toàn trong mọi hoạt động.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <BoltIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hiệu Quả</h3>
            <p className="text-gray-600 leading-relaxed">
              Hệ thống tự động xử lý 24/7, giao hàng nhanh chóng và hiệu quả, 
              tiết kiệm thời gian cho khách hàng.
            </p>
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
            Những lý do khiến LikePlusVietNam trở thành lựa chọn hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chất Lượng Cao</h3>
                <p className="text-gray-600">
                  Tất cả dịch vụ đều sử dụng tài khoản thật, đảm bảo chất lượng và độ tin cậy cao nhất.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bảo Mật Tuyệt Đối</h3>
                <p className="text-gray-600">
                  Thông tin khách hàng được mã hóa và bảo vệ an toàn, không bao giờ bị lộ ra ngoài.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BoltIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Giao Hàng Nhanh</h3>
                <p className="text-gray-600">
                  Hệ thống tự động xử lý 24/7, giao hàng nhanh chóng trong vòng 5-30 phút.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hỗ Trợ 24/7</h3>
                <p className="text-gray-600">
                  Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng hỗ trợ khách hàng mọi lúc, mọi nơi.
                </p>
              </div>
            </div>
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
          <a
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            <BoltIcon className="w-5 h-5 mr-2" />
            Xem Dịch Vụ
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            <UsersIcon className="w-5 h-5 mr-2" />
            Liên Hệ Tư Vấn
          </a>
        </div>
      </div>
    </section>
  </>
);

export default About; 