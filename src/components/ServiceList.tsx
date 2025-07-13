import React from 'react';

const servers = [
  {
    id: 2,
    name: 'Server 2: Sub việt',
    price: 114.6,
    status: 'Hoạt động',
    desc: 'Tốc độ 5k/24h, không bảo hành, không dồn đơn, không hoàn tiền.'
  },
  {
    id: 5,
    name: 'Server 5: Sub việt',
    price: 340.1,
    status: 'Hoạt động',
    desc: 'Tốc độ 5k/24h, bảo hành 7 ngày, hoàn tiền khi không chạy.'
  },
  {
    id: 7,
    name: 'Server 7: Sub ngoại',
    price: 798.4,
    status: 'Hoạt động',
    desc: 'Sub ngoại, tốc độ 5k/24h, không bảo hành.'
  }
];

const ServiceList: React.FC<{ selected: number; onSelect: (id: number) => void }> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-3">
      {servers.map((s) => (
        <div
          key={s.id}
          className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 flex items-center space-x-4 ${selected === s.id ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
          onClick={() => onSelect(s.id)}
        >
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{s.name}</div>
            <div className="text-xs text-gray-500 mb-1">{s.desc}</div>
            <div className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold mr-2">{s.status}</div>
          </div>
          <div className="text-lg font-bold text-blue-700">{s.price} đ</div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList; 