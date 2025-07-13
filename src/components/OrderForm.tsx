import React, { useState } from 'react';
import ServiceList from './ServiceList';

const OrderForm: React.FC = () => {
  const [selectedServer, setSelectedServer] = useState(2);
  const [quantity, setQuantity] = useState(100);
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');

  // Giá server mẫu, thực tế lấy từ ServiceList
  const serverPrices: Record<number, number> = {
    2: 114.6,
    5: 340.1,
    7: 798.4
  };
  const total = quantity * (serverPrices[selectedServer] || 0);

  return (
    <form className="bg-white rounded-2xl shadow border border-gray-100 p-8 space-y-6">
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
        <ServiceList selected={selectedServer} onSelect={setSelectedServer} />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            min={100}
            step={100}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
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
      >
        Mua
      </button>
    </form>
  );
};

export default OrderForm; 