import React from 'react';
import { PAYMENT_CONFIG } from '../config/payment';
import { 
  PhoneIcon, 
  UserIcon, 
  BuildingOfficeIcon,
  DocumentTextIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

interface PaymentInfoProps {
  methodId: string;
  amount: number;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ methodId, amount }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Có thể thêm toast notification ở đây
      console.log('Copied to clipboard:', text);
    });
  };

  const getPaymentInfo = () => {
    switch (methodId) {
      case 'momo':
        return {
          title: 'Thông tin MoMo',
          icon: '💜',
          color: 'from-purple-500 to-pink-500',
          info: [
            { label: 'Số điện thoại', value: PAYMENT_CONFIG.momo.phone, icon: PhoneIcon },
            { label: 'Tên tài khoản', value: PAYMENT_CONFIG.momo.name, icon: UserIcon },
            { label: 'Số tiền', value: `${amount.toLocaleString('vi-VN')} VND`, icon: DocumentTextIcon },
            { label: 'Nội dung', value: `${PAYMENT_CONFIG.momo.content} ${amount.toLocaleString('vi-VN')} VND`, icon: DocumentTextIcon }
          ]
        };
      case 'zalo':
        return {
          title: 'Thông tin ZaloPay',
          icon: '💙',
          color: 'from-blue-500 to-cyan-500',
          info: [
            { label: 'Số điện thoại', value: PAYMENT_CONFIG.zalo.phone, icon: PhoneIcon },
            { label: 'Tên tài khoản', value: PAYMENT_CONFIG.zalo.name, icon: UserIcon },
            { label: 'Tin nhắn', value: PAYMENT_CONFIG.zalo.message, icon: DocumentTextIcon }
          ]
        };
      case 'bank_transfer':
        return {
          title: 'Thông tin chuyển khoản',
          icon: '🏦',
          color: 'from-green-500 to-emerald-500',
          info: [
            { label: 'Số tài khoản', value: PAYMENT_CONFIG.bank.accountNumber, icon: BuildingOfficeIcon },
            { label: 'Tên tài khoản', value: PAYMENT_CONFIG.bank.accountName, icon: UserIcon },
            { label: 'Ngân hàng', value: PAYMENT_CONFIG.bank.bankName, icon: BuildingOfficeIcon },
            { label: 'Nội dung', value: `${PAYMENT_CONFIG.bank.content} ${amount.toLocaleString('vi-VN')} VND`, icon: DocumentTextIcon }
          ]
        };
      default:
        return null;
    }
  };

  const paymentInfo = getPaymentInfo();
  if (!paymentInfo) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="text-2xl mr-2">{paymentInfo.icon}</span>
        {paymentInfo.title}
      </h3>
      <div className="space-y-3">
        {paymentInfo.info.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-2">
              <item.icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{item.label}:</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 break-all text-right max-w-xs">
                {item.value}
              </span>
              <button
                onClick={() => copyToClipboard(item.value)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Copy to clipboard"
              >
                <ClipboardDocumentIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700 text-center">
          💡 Quét mã QR hoặc copy thông tin trên để thanh toán
        </p>
        {methodId === 'momo' && (
          <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-700 font-medium mb-2">📱 Hướng dẫn thanh toán MoMo:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm text-purple-600">Mở ứng dụng MoMo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm text-purple-600">Chọn "Chuyển tiền" → "Đến số điện thoại"</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm text-purple-600">Nhập số: <span className="font-bold bg-purple-200 px-1 rounded">{PAYMENT_CONFIG.momo.phone}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-sm text-purple-600">Nhập số tiền: <span className="font-bold bg-purple-200 px-1 rounded">{amount.toLocaleString('vi-VN')} VND</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">5</div>
                <span className="text-sm text-purple-600">Nhập nội dung: <span className="font-bold bg-purple-200 px-1 rounded">{PAYMENT_CONFIG.momo.content} {amount.toLocaleString('vi-VN')} VND</span></span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-purple-100 rounded border border-purple-300">
              <p className="text-xs text-purple-700 text-center">
                ⚠️ Vui lòng nhập chính xác thông tin để tránh lỗi giao dịch
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInfo; 