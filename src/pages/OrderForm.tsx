import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import serviceService, { Service, OrderData } from '../services/serviceService';
import { 
  ShoppingCartIcon,
  LinkIcon,
  HashtagIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  InformationCircleIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useToast } from '../components/ToastContext';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mainNameFromUrl = searchParams.get('main');
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [form, setForm] = useState({ link: '', quantity: 0, comments: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultType, setResultType] = useState<'success' | 'error'>('success');

  // Lấy service ID từ URL nếu có
  const serviceIdFromUrl = searchParams.get('service');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    serviceService.getServices().then(services => {
      setServices(services);
      if (mainNameFromUrl) {
        // Lọc các service thuộc mainName
        const group = services.filter(s => s.name?.split(' - ')[0]?.trim() === mainNameFromUrl);
        setGroupedServices(group);
        if (group.length > 0) {
          setSelectedService(group[0]);
          setForm(f => ({ ...f, quantity: group[0].min }));
        } else {
          setError('Không tìm thấy dịch vụ này!');
        }
      } else if (serviceIdFromUrl) {
        const found = services.find(s => String(s.service) === String(serviceIdFromUrl));
        if (found) {
          setSelectedService(found);
          setForm(f => ({ ...f, quantity: found.min }));
        } else {
          setError('Không tìm thấy dịch vụ này!');
        }
      }
    }).catch(e => setError('Không thể tải danh sách dịch vụ.'));
    // eslint-disable-next-line
  }, [mainNameFromUrl, serviceIdFromUrl]);

  // Thêm state cho group nếu có mainName
  const [groupedServices, setGroupedServices] = useState<Service[]>([]);

  const handleServiceChange = (id: string) => {
    const service = services.find(s => String(s.service) === id);
    setSelectedService(service || null);
    if (service) setForm(f => ({ ...f, quantity: service.min }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      toast.toast('Vui lòng chọn dịch vụ', 'error');
      return;
    }
    if (!form.link) {
      toast.toast('Vui lòng nhập link', 'error');
      return;
    }
    if (form.quantity < selectedService.min || form.quantity > selectedService.max) {
      toast.toast(`Số lượng phải từ ${selectedService.min} đến ${selectedService.max}`, 'error');
      return;
    }
    setLoading(true);
    setResult(null);
    setShowResultModal(false);
    setResultMessage(null);
    try {
      const orderData: OrderData = {
        service: selectedService.service,
        link: form.link,
        quantity: form.quantity,
        comments: form.comments || undefined,
      };
      const res = await serviceService.createOrder(orderData);
      setResult(res);
      if (res && (res as any).error) {
        setResultType('error');
        setResultMessage((res as any).error);
        setShowResultModal(true);
      } else if (res && res.order) {
        setResultType('success');
        setResultMessage('Đặt hàng thành công!');
        setShowResultModal(true);
      }
    } catch (err: any) {
      setResultType('error');
      setResultMessage(err.message || 'Có lỗi xảy ra');
      setShowResultModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tính tổng tiền
  const getTotal = () => {
    if (!selectedService) return 0;
    const price = parseFloat(selectedService.rate) || 0;
    return price * form.quantity;
  };

  // Hàm format tiền VND
  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const getCategoryIcon = (category: string) => {
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

  // Đảm bảo popup luôn hiện khi có resultMessage
  // Xóa useEffect lắng nghe resultMessage

  return (
    <>
      <Helmet>
        <title>Đặt hàng dịch vụ - LikePlusVietNam</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Đặt hàng nhanh chóng & an toàn</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Đặt Hàng Dịch Vụ
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Điền thông tin bên dưới để đặt hàng dịch vụ tăng tương tác mạng xã hội
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nếu có mainName thì chọn loại nhỏ (server/giá) */}
                {mainNameFromUrl && groupedServices.length > 0 && (
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Chọn máy chủ:
                    </label>
                    <div className="space-y-2 mb-4">
                      {groupedServices.map((service, idx) => {
                        const s: any = service;
                        // Tên server: SV1, SV2...
                        const serverName = `SV${idx + 1}`;
                        // Trạng thái: ON/OFF (dựa vào service.status)
                        const isActive = s['status'] === true;
                        // Mô tả ngắn: lấy từ service.type hoặc service.note hoặc service.description
                        const nameServer = s['name_server'] || service.type || '';
                        // Giá
                        const price = formatVND(parseFloat(service.rate));
                        return (
                          <label
                            key={service.service}
                            className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg border ${selectedService?.service === service.service ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} transition-all ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={e => {
                              if (!isActive) {
                                e.preventDefault();
                                toast.toast('Máy chủ này đang bảo trì, vui lòng chọn máy chủ khác', 'info');
                              }
                            }}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service.service}
                              checked={selectedService?.service === service.service}
                              onChange={() => {
                                if (isActive) {
                                  setSelectedService(service);
                                  setForm(f => ({ ...f, quantity: service.min }));
                                }
                              }}
                              className="form-radio text-blue-600 h-5 w-5"
                              disabled={!isActive}
                            />
                            <span className="font-bold text-gray-800 w-14">{serverName}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isActive ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>{isActive ? 'ON' : 'OFF'}</span>
                            <span className="text-gray-700 flex-1">{nameServer}</span>
                            <span className="ml-auto text-xs font-bold bg-cyan-100 text-cyan-700 px-2 py-1 rounded">{price}</span>
                          </label>
                        );
                      })}
                    </div>
                    {/* Hiển thị mô tả chi tiết của server đã chọn */}
                    {selectedService && (
                      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mt-2 text-gray-700 text-sm whitespace-pre-line">
                        {((selectedService as any)['note'] || (selectedService as any)['description']) ? (
                          <div dangerouslySetInnerHTML={{ __html: (selectedService as any)['note'] || (selectedService as any)['description'] }} />
                        ) : null}
                      </div>
                    )}
                  </div>
                )}
                {/* Nếu không có mainName thì cho chọn dịch vụ như cũ */}
                {!mainNameFromUrl && !serviceIdFromUrl && (
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Chọn dịch vụ
                    </label>
                    <select
                      className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={selectedService?.service || ''}
                      onChange={e => handleServiceChange(e.target.value)}
                      required
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      {services.map(s => (
                        <option key={s.service} value={s.service}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Service Info */}
                {selectedService && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{getCategoryIcon(selectedService.category)}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{selectedService.name}</h3>
                        <p className="text-gray-600">{selectedService.category} • {selectedService.type}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CurrencyDollarIcon className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">Giá:</span>
                        <span className="font-semibold text-green-600">{formatVND(parseFloat(selectedService.rate))}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HashtagIcon className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">Min:</span>
                        <span className="font-semibold text-blue-600">{selectedService.min}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HashtagIcon className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-600">Max:</span>
                        <span className="font-semibold text-purple-600">{selectedService.max}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Link Input */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <LinkIcon className="w-6 h-6 inline mr-2 text-green-600" />
                    Link cần tăng tương tác
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={form.link}
                    onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                    placeholder="https://facebook.com/..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2 flex items-center">
                    <InformationCircleIcon className="w-4 h-4 mr-1" />
                    Nhập link chính xác của bài viết, ảnh, hoặc video cần tăng tương tác
                  </p>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <HashtagIcon className="w-6 h-6 inline mr-2 text-purple-600" />
                    Số lượng
                  </label>
                  <input
                    type="number"
                    min={selectedService?.min || 0}
                    max={selectedService?.max || 999999}
                    className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={form.quantity}
                    onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))}
                    required
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-500">
                      Từ {selectedService?.min || 0} đến {selectedService?.max || 999999}
                    </p>
                    {selectedService && (
                      <div className="text-lg font-bold text-green-600">
                        Tổng: {formatVND(getTotal())}
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments Input */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 inline mr-2 text-orange-600" />
                    Ghi chú (tuỳ chọn)
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows={3}
                    value={form.comments}
                    onChange={e => setForm(f => ({ ...f, comments: e.target.value }))}
                    placeholder="Ghi chú cho đơn hàng..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !selectedService}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Đang đặt hàng...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-6 h-6" />
                      <span>Đặt hàng ngay</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-6">
            {/* Order Summary */}
            {selectedService && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CurrencyDollarIcon className="w-6 h-6 mr-2 text-green-600" />
                  Tóm tắt đơn hàng
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Dịch vụ:</span>
                    <span className="font-semibold text-gray-900">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-semibold text-gray-900">{form.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Đơn giá:</span>
                    <span className="font-semibold text-gray-900">{formatVND(parseFloat(selectedService.rate))}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-3">
                    <span className="font-bold text-gray-900">Tổng tiền:</span>
                    <span className="font-bold text-green-600 text-lg">{formatVND(getTotal())}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-600" />
                Tại sao chọn chúng tôi?
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Giao hàng nhanh chóng 5-30 phút</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Chất lượng cao, tài khoản thật</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Bảo mật tuyệt đối, không lộ thông tin</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Hỗ trợ 24/7, hoàn tiền nếu không hài lòng</span>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                Quy trình đặt hàng
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <span>Chọn dịch vụ và nhập thông tin</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <span>Thanh toán và xác nhận đơn hàng</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <span>Hệ thống tự động xử lý và giao hàng</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                  <span>Nhận thông báo hoàn thành</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay loading spinner */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-full p-6 shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
            <div className="text-lg font-semibold text-blue-700">Đang xử lý đơn hàng...</div>
          </div>
        </div>
      )}
      {/* Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center">
            {resultType === 'success' ? (
              <>
                <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
                <div className="text-2xl font-bold text-green-700 mb-2">Thành công</div>
              </>
            ) : (
              <>
                <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
                <div className="text-2xl font-bold text-red-700 mb-2">Thất bại</div>
              </>
            )}
            <div className="text-lg text-center mb-6">{resultMessage}</div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold text-lg shadow"
              onClick={() => setShowResultModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderForm; 