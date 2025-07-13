import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import paymentService, { PaymentMethod, DepositData } from '../services/paymentService';
import { 
  CreditCardIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  QrCodeIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { useToast } from '../components/ToastContext';

const Deposit: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState<string>('');
  const toast = useToast();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
      if (methods.length > 0) {
        setSelectedMethod(methods[0].id);
      }
    } catch (err) {
      toast.toast('Không thể tải phương thức thanh toán.', 'error');
      console.error('Error fetching payment methods:', err);
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMethod || amount <= 0) {
      toast.toast('Vui lòng chọn phương thức thanh toán và nhập số tiền hợp lệ.', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const depositData: DepositData = {
        amount: amount,
        payment_method: selectedMethod as any
      };

      const result = await paymentService.createDeposit(depositData);
      
      if (result.payment_url) {
        // Redirect to payment gateway
        window.location.href = result.payment_url;
      } else {
        toast.toast('Yêu cầu nạp tiền đã được tạo thành công! Vui lòng kiểm tra email để biết thêm chi tiết.', 'success');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi tạo yêu cầu nạp tiền.';
      toast.toast(msg, 'error');
      console.error('Error creating deposit:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getMethodIcon = (methodId: string) => {
    const icons: { [key: string]: string } = {
      momo: '💜',
      zalo: '💙',
      bank_transfer: '🏦',
      vnpay: '💳'
    };
    return icons[methodId] || '💰';
  };

  const getMethodColor = (methodId: string) => {
    const colors: { [key: string]: string } = {
      momo: 'from-purple-500 to-pink-500',
      zalo: 'from-blue-500 to-cyan-500',
      bank_transfer: 'from-green-500 to-emerald-500',
      vnpay: 'from-blue-600 to-indigo-600'
    };
    return colors[methodId] || 'from-gray-500 to-gray-600';
  };

  const quickAmounts = [50000, 100000, 200000, 500000, 1000000];

  // Tạo QR code data dựa trên phương thức và số tiền
  const generateQRData = (methodId: string, amount: number) => {
    const baseData = {
      amount: amount,
      method: methodId,
      timestamp: Date.now(),
      merchant: 'LikePlusVietNam'
    };

    switch (methodId) {
      case 'momo':
        return `momo://transfer?phone=0123456789&amount=${amount}&content=Nap tien LikePlusVietNam`;
      case 'zalo':
        return `zalo://transfer?phone=0123456789&amount=${amount}&message=Nap tien LikePlusVietNam`;
      case 'vnpay':
        return `https://vnpay.vn/payment?amount=${amount}&merchant=LikePlusVietNam&orderId=${Date.now()}`;
      case 'bank_transfer':
        return `bank://transfer?account=123456789&amount=${amount}&content=Nap tien LikePlusVietNam`;
      default:
        return JSON.stringify(baseData);
    }
  };

  // Cập nhật QR khi thay đổi phương thức hoặc số tiền
  useEffect(() => {
    if (selectedMethod && amount > 0) {
      const qrDataString = generateQRData(selectedMethod, amount);
      setQrData(qrDataString);
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  }, [selectedMethod, amount]);

  // Tạo QR code URL từ data
  const getQRCodeURL = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  };

  return (
    <>
      <Helmet>
        <title>Nạp tiền - LikePlusVietNam</title>
        <meta name="description" content="Nạp tiền vào tài khoản để sử dụng dịch vụ tăng like, follow, view, sub." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 rounded-full px-4 py-2 mb-4">
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Nạp tiền nhanh chóng & an toàn</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nạp Tiền Vào Tài Khoản
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chọn phương thức thanh toán phù hợp và nạp tiền để sử dụng các dịch vụ chất lượng của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <form onSubmit={handleDeposit} className="space-y-6">
              {/* Số tiền */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <CurrencyDollarIcon className="w-6 h-6 inline mr-2 text-green-600" />
                  Số tiền nạp (VND)
                </label>
                
                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => setAmount(quickAmount)}
                      className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                        amount === quickAmount
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {formatPrice(quickAmount)}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  min="10000"
                  step="1000"
                  className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập số tiền muốn nạp"
                  required
                />
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <InformationCircleIcon className="w-4 h-4 mr-1" />
                  Số tiền tối thiểu: 10,000 VND
                </p>
              </div>

              {/* Phương thức thanh toán */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <CreditCardIcon className="w-6 h-6 inline mr-2 text-blue-600" />
                  Phương thức thanh toán
                </label>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getMethodColor(method.id)} rounded-xl flex items-center justify-center text-white text-xl`}>
                          {getMethodIcon(method.id)}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !selectedMethod || amount <= 0}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <BanknotesIcon className="w-6 h-6" />
                    <span>Nạp tiền ngay</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Summary Section */}
          <div className="space-y-6">
            {/* QR Code Section */}
            {showQR && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <QrCodeIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Mã QR Thanh Toán
                </h3>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-4 border border-blue-200">
                    <img 
                      src={getQRCodeURL(qrData)} 
                      alt="QR Code" 
                      className="mx-auto border-2 border-white rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800">
                        Quét mã QR bằng ứng dụng {selectedMethod === 'momo' ? 'MoMo' : 
                                                 selectedMethod === 'zalo' ? 'ZaloPay' : 
                                                 selectedMethod === 'vnpay' ? 'VNPay' : 'ngân hàng'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <CameraIcon className="w-4 h-4" />
                      <span>Hoặc chụp ảnh màn hình để thanh toán sau</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Mã QR sẽ tự động cập nhật khi thay đổi số tiền hoặc phương thức
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Thông tin phí */}
            {selectedMethod && amount > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CurrencyDollarIcon className="w-6 h-6 mr-2 text-green-600" />
                  Thông tin giao dịch
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Số tiền nạp:</span>
                    <span className="font-semibold text-gray-900">{formatPrice(amount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Phí giao dịch:</span>
                    <span className="text-orange-600">{formatPrice(amount * 0.01)} (1%)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-3">
                    <span className="font-bold text-gray-900">Tổng cộng:</span>
                    <span className="font-bold text-green-600 text-lg">{formatPrice(amount * 1.01)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Hướng dẫn */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <InformationCircleIcon className="w-6 h-6 mr-2 text-blue-600" />
                Hướng dẫn nạp tiền
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <p>Chọn số tiền muốn nạp và phương thức thanh toán phù hợp</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <p>Mã QR sẽ hiển thị tự động - quét bằng ứng dụng tương ứng</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <p>Hoặc nhấn "Nạp tiền ngay" để chuyển đến cổng thanh toán</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                  <p>Số tiền sẽ được cộng vào tài khoản trong vòng 5-10 phút</p>
                </div>
              </div>
            </div>

            {/* Lưu ý */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                Lưu ý quan trọng
              </h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <ShieldCheckIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Vui lòng giữ lại mã giao dịch để tra cứu khi cần thiết</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Giao dịch sẽ được xử lý trong vòng 5-10 phút</span>
                </li>
                <li className="flex items-start space-x-2">
                  <InformationCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Nếu có vấn đề, vui lòng liên hệ hỗ trợ qua email hoặc hotline</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit; 