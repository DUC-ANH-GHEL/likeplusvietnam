import React, { useEffect, useState } from 'react';
import { MoonIcon, MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import logo from '../logo.svg';
import paymentService from '../services/paymentService';

interface HeaderProps {
  onOpenSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await paymentService.getBalance();
        setBalance(res.balance);
      } catch {
        setBalance(null);
      }
    }
    fetchBalance();
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-2 sm:px-4 md:px-8 py-3 shadow-sm z-10">
      <div className="flex items-center space-x-4">
        {/* Hamburger menu on mobile */}
        {onOpenSidebar && (
          <button className="lg:hidden p-2 mr-2 rounded-full hover:bg-gray-100 transition" onClick={onOpenSidebar}>
            <Bars3Icon className="w-7 h-7 text-blue-600" />
          </button>
        )}
        <img src={logo} alt="LikePlusVietNam" className="w-8 h-8 mr-2" />
        <span className="text-lg font-bold text-blue-700 hidden sm:inline">Like<span className="text-black">PlusVietNam</span></span>
        {/* <div className="ml-2 sm:ml-8 flex items-center bg-gray-100 rounded-lg px-2 sm:px-3 py-1">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            className="bg-transparent outline-none text-sm text-gray-700 w-24 sm:w-48"
          />
        </div> */}
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Removed dark mode and language switcher buttons */}
        <div className="flex items-center space-x-2 bg-blue-50 px-2 sm:px-3 py-1 rounded-lg">
          <UserCircleIcon className="w-6 h-6 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">user</span>
          <span className="ml-2 sm:ml-3 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
            {balance !== null ? `${parseFloat(balance).toLocaleString('vi-VN')} đ` : '...'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header; 