import React from 'react';
import { BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline';

const UserInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex items-center space-x-6 mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <BanknotesIcon className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <div className="text-xs text-gray-400">Số dư</div>
          <div className="text-xl font-bold text-blue-700">1.001 đ</div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center space-x-2">
        <ClockIcon className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-500">Tặng nạp tháng: <span className="font-semibold text-gray-700">0</span></span>
      </div>
    </div>
  );
};

export default UserInfo; 