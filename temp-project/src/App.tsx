import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Services from './pages/Services';
import Deposit from './pages/Deposit';
import OrderForm from './pages/OrderForm';
import Orders from './pages/Orders';
import TestAPI from './pages/TestAPI';
import About from './pages/About';
import Contact from './pages/Contact';
import UserInfo from './components/UserInfo';
import { 
  HomeIcon, 
  CubeIcon, 
  CreditCardIcon, 
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { ToastProvider } from './components/ToastContext';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Trang chủ', href: '/', icon: HomeIcon },
    { name: 'Dịch vụ', href: '/services', icon: CubeIcon },
    { name: 'Nạp tiền', href: '/deposit', icon: CreditCardIcon },
    { name: 'Đơn hàng', href: '/orders', icon: ClipboardDocumentListIcon },
    { name: 'Giới thiệu', href: '/about', icon: InformationCircleIcon },
    { name: 'Liên hệ', href: '/contact', icon: PhoneIcon },
  ];

  return (
    <nav className="hidden md:flex space-x-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

const MobileMenu = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Trang chủ', href: '/', icon: HomeIcon },
    { name: 'Dịch vụ', href: '/services', icon: CubeIcon },
    { name: 'Nạp tiền', href: '/deposit', icon: CreditCardIcon },
    { name: 'Đơn hàng', href: '/orders', icon: ClipboardDocumentListIcon },
    { name: 'Giới thiệu', href: '/about', icon: InformationCircleIcon },
    { name: 'Liên hệ', href: '/contact', icon: PhoneIcon },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {mobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-lg">L+</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      LikePlusVietNam
                    </div>
                    <div className="text-xs text-gray-500">Dịch vụ mạng xã hội</div>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <Navigation />

                {/* User Info & Mobile Menu */}
                <div className="flex items-center space-x-4">
                  <UserInfo />
                  <MobileMenu />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/order" element={<OrderForm />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/test" element={<TestAPI />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">L+</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        LikePlusVietNam
                      </div>
                      <div className="text-sm text-gray-500">Dịch vụ mạng xã hội hàng đầu</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Cung cấp các dịch vụ tăng tương tác mạng xã hội chất lượng cao, 
                    đảm bảo an toàn và hiệu quả cho khách hàng.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Liên kết nhanh</h3>
                  <div className="space-y-2">
                    <Link to="/services" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Dịch vụ
                    </Link>
                    <Link to="/deposit" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Nạp tiền
                    </Link>
                    <Link to="/orders" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Đơn hàng
                    </Link>
                    <Link to="/about" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Giới thiệu
                    </Link>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Liên hệ</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Email: support@likeplus.vn</div>
                    <div>Hotline: 1900-xxxx</div>
                    <div>Giờ làm việc: 24/7</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} LikePlusVietNam. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
