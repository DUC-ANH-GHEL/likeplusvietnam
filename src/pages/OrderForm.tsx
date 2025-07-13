import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServiceContext } from '../context/ServiceContext';
import serviceService from '../services/serviceService';
import { useToast } from '../components/ToastContext';

const OrderForm: React.FC = () => {
  const { category, name } = useParams();
  const { services, loading } = useServiceContext();
  const toast = useToast();
  const [selectedServer, setSelectedServer] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(100);
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [popup, setPopup] = useState<null | { type: 'success' | 'error', title: string, message: string }>(null);

  // Lọc các service theo category + name
  const filteredServices = services.filter(svc => svc.category === category && svc.name === name);

  // Chọn server đầu tiên mặc định
  React.useEffect(() => {
    if (filteredServices.length > 0 && selectedServer === null) {
      setSelectedServer(filteredServices[0].service);
    }
  }, [filteredServices, selectedServer]);

  const selectedService = filteredServices.find(svc => svc.service === selectedServer);
  const total = quantity * (selectedService ? parseFloat(selectedService.rate) : 0);

  // Validate link đơn giản (chỉ cần không rỗng)
  function isValidLink(link: string) {
    return link.trim().length > 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedServer) {
      toast.toast('Vui lòng chọn server!', 'error');
      return;
    }
    if (!isValidLink(link)) {
      toast.toast('Vui lòng nhập link!', 'error');
      return;
    }
    if (!selectedService) {
      toast.toast('Vui lòng chọn server hợp lệ!', 'error');
      return;
    }
    if (quantity < (selectedService.min || 1) || quantity > (selectedService.max || 1000000)) {
      toast.toast(`Số lượng phải từ ${selectedService.min} đến ${selectedService.max}`, 'error');
      return;
    }
    setSubmitting(true);
    setShowLoading(true);
    try {
      const order = await serviceService.createOrder({
        service: selectedServer,
        link,
        quantity
      });
      setShowLoading(false);
      if ((order as any).error) {
        setPopup({ type: 'error', title: 'Thất Bại', message: (order as any).error });
      } else {
        setPopup({ type: 'success', title: 'Thành Công', message: `Tạo đơn thành công! Mã đơn: ${order.order}` });
      }
      toast.toast((order as any).error ? (order as any).error : `Tạo đơn thành công! Mã đơn: ${order.order}`, (order as any).error ? 'error' : 'success');
      // Reset form nếu muốn
      // setLink(''); setQuantity(selectedService.min || 100); setNote('');
    } catch (err: any) {
      setShowLoading(false);
      setPopup({ type: 'error', title: 'Thất Bại', message: err?.message || 'Có lỗi khi tạo đơn, vui lòng thử lại!' });
      toast.toast(err?.message || 'Có lỗi khi tạo đơn, vui lòng thử lại!', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dịch vụ...</div>;
  if (!category || !name) return <div className="p-8 text-center text-red-500">Thiếu thông tin dịch vụ.</div>;
  if (filteredServices.length === 0) return <div className="p-8 text-center text-red-500">Không tìm thấy dịch vụ phù hợp.</div>;

  return (
    <form className="bg-white rounded-2xl shadow border border-gray-100 p-8 space-y-6" onSubmit={handleSubmit}>
      {showLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center">
            <div className="loader mb-3" style={{ borderWidth: 4, width: 40, height: 40, borderRadius: '50%', borderStyle: 'solid', borderColor: '#eee', borderTopColor: '#3498db', animation: 'spin 1s linear infinite' }} />
            <div className="text-lg font-semibold text-blue-700">Đang xử lý đơn hàng...</div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
          </div>
        </div>
      )}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg px-8 py-8 flex flex-col items-center min-w-[320px] max-w-[90vw]">
            {popup.type === 'success' ? (
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="mb-3"><circle cx="12" cy="12" r="12" fill="#e6f9ed"/><path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="mb-3"><circle cx="12" cy="12" r="12" fill="#ffeaea"/><path d="M8 8l8 8M16 8l-8 8" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/></svg>
            )}
            <div className="text-2xl font-bold mb-2 text-gray-800">{popup.title}</div>
            <div className="text-base text-gray-600 mb-6 text-center whitespace-pre-line">{popup.message}</div>
            <button onClick={() => setPopup(null)} className="px-6 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold text-base shadow focus:outline-none focus:ring-2 focus:ring-violet-400">OK</button>
          </div>
        </div>
      )}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-2">Link profile</label>
        <input
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://www.tiktok.com/@profile"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-2">Chọn server</label>
        <div className="space-y-2">
          {filteredServices.map((svc, idx) => {
            const serverName = (svc as any).name_server || svc.type || svc.name;
            const isActive = Boolean((svc as any).status);
            return (
              <label key={svc.service} className="flex items-center space-x-3 cursor-pointer py-2 px-3 rounded-lg border border-gray-100 hover:bg-blue-50">
                <input
                  type="radio"
                  name="server"
                  value={svc.service}
                  checked={selectedServer === svc.service}
                  onChange={() => setSelectedServer(svc.service)}
                  className="accent-blue-600"
                  disabled={!isActive}
                />
                <span className="font-bold text-gray-700 w-12">SV{idx + 1}</span>
                <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-400'}`}>{isActive ? 'ON' : 'OFF'}</span>
                <span className="ml-2 font-medium text-gray-800 flex-1">{serverName}</span>
                <span className="ml-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">{parseFloat(svc.rate).toLocaleString('vi-VN')} đ</span>
              </label>
            );
          })}
        </div>
        {selectedService && selectedService.description && (
          <div className="mt-3 p-3 bg-blue-50 rounded text-sm text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedService.description }} />
        )}
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            min={selectedService?.min || 1}
            max={selectedService?.max || 1000000}
            step={100}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <div className="text-xs text-gray-400 mt-1">Tối thiểu: {selectedService?.min} / Tối đa: {selectedService?.max}</div>
        </div>
        <div className="flex-1">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Tổng giá</label>
          <div className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 font-bold text-blue-700">
            {total.toLocaleString('vi-VN')} đ
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
        disabled={submitting}
      >
        {submitting ? 'Đang xử lý...' : 'Mua'}
      </button>
    </form>
  );
};

export default OrderForm; 