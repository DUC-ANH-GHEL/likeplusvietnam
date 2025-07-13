import React, { useState, useEffect } from 'react';
import authService, { User } from '../services/authService';
import { 
  UserCircleIcon, 
  ArrowPathIcon, 
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await authService.getStoredUser();
      setUser(userData);
    } catch (err) {
      setError('Không thể tải thông tin tài khoản');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(balance);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRefresh = () => {
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-3">
        <div className="animate-pulse bg-gray-200 h-10 w-10 rounded-full"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-red-700 text-sm">Lỗi kết nối</span>
        </div>
        <button 
          onClick={handleRefresh}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Thử lại"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-yellow-700 text-sm">Chưa đăng nhập</span>
        </div>
        <button 
          onClick={handleRefresh}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Thử lại"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* User Info Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        {/* User Details */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900 truncate max-w-32">
            {user.name}
          </div>
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <CurrencyDollarIcon className="w-3 h-3" />
            <span className="font-medium">{formatBalance(user.balance)}</span>
          </div>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">Tài khoản VIP</div>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Số dư hiện tại</span>
              </div>
              <button 
                onClick={handleRefresh}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-white rounded transition-colors"
                title="Làm mới số dư"
              >
                <ArrowPathIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {formatBalance(user.balance)}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors">
              <UserCircleIcon className="w-5 h-5" />
              <span>Thông tin tài khoản</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors">
              <CurrencyDollarIcon className="w-5 h-5" />
              <span>Lịch sử giao dịch</span>
            </button>
            <div className="border-t border-gray-100 my-2"></div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default UserInfo; 