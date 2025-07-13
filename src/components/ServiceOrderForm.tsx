import React, { useEffect, useState } from 'react';
import serviceService, { Service } from '../services/serviceService';

interface ServiceOrderFormProps {
  category?: string;
  type?: string;
  title?: string;
  serviceId?: string;
}

const ServiceOrderForm: React.FC<ServiceOrderFormProps> = ({ category, type, title, serviceId }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(100);
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [orderResult, setOrderResult] = useState<any>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        let res: Service[] = [];
        if (category) {
          res = await serviceService.getServicesByCategory(category);
        } else if (type) {
          res = await serviceService.getServicesByType(type);
        } else {
          res = await serviceService.getServices();
        }
        setServices(res);
        // Nếu có serviceId thì chọn đúng dịch vụ, nếu không thì chọn đầu tiên
        if (serviceId) {
          const found = res.find(s => String(s.service) === String(serviceId));
          setSelectedService(found ? found.service : (res[0]?.service || null));
        } else {
          setSelectedService(res[0]?.service || null);
        }
      } catch (err: any) {
        setError('Không thể tải danh sách dịch vụ');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [category, type, serviceId]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !link || quantity <= 0) return;
    try {
      setOrderResult(null);
      const result = await serviceService.createOrder({
        service: selectedService,
        link,
        quantity,
        comments: note
      });
      setOrderResult(result);
    } catch (err: any) {
      setOrderResult({ error: err.message || 'Đặt hàng thất bại' });
    }
  };

  // Lấy thông tin dịch vụ đang chọn
  const currentService = services.find(s => s.service === selectedService);

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">{title || currentService?.name || 'Đặt hàng dịch vụ'}</h2>
      {currentService && (
        <div className="mb-4 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: currentService.description || '' }} />
      )}
      {loading && <div>Đang tải dịch vụ...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <form onSubmit={handleOrder} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">Link profile</label>
            <input
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập link cần tăng hoặc profile"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">Chọn server</label>
            <div className="space-y-3">
              {services.map((s) => (
                <div
                  key={s.service}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 flex items-center space-x-4 ${selectedService === s.service ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
                  onClick={() => setSelectedService(s.service)}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500 mb-1">{s.type} | {s.category}</div>
                    <div className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold mr-2">{s.rate} đ</div>
                  </div>
                  <div className="text-lg font-bold text-blue-700">{s.rate} đ</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-900 mb-2">Số lượng</label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                min={currentService?.min || 1}
                max={currentService?.max || 999999}
                step={100}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {currentService && (
                <div className="text-xs text-gray-500 mt-1">Tối thiểu: {currentService.min} | Tối đa: {currentService.max}</div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-900 mb-2">Tổng giá</label>
              <div className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 font-bold text-blue-700">
                {selectedService && services.length > 0 ? (quantity * Number(services.find(s => s.service === selectedService)?.rate || 0)).toLocaleString('vi-VN') : 0} đ
              </div>
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">Ghi chú</label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ghi chú cho đơn hàng (nếu có)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl mt-2"
          >
            Mua
          </button>
        </form>
      )}
      {orderResult && (
        <div className="mt-6">
          {orderResult.error ? (
            <div className="text-red-600">{orderResult.error}</div>
          ) : (
            <div className="text-green-600">Đặt hàng thành công! Mã đơn: {orderResult.order}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceOrderForm; 