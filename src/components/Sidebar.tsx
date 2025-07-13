import React, { useState } from 'react';
import { useServiceContext } from '../context/ServiceContext';
import { Cog6ToothIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import logo from '../logo.svg';

const mainMenu = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Liên Hệ Hỗ Trợ', path: '/contact' },
  { name: 'Nạp tiền', path: '/deposit' },
  // { name: 'Bảng giá & các gói cước', path: '/pricing' },
];

const currentPath = window.location.pathname;

function getActiveCategoryAndService() {
  // /order/:category/:name
  const match = currentPath.match(/^\/order\/([^/]+)\/([^/]+)/);
  if (match) {
    return { category: decodeURIComponent(match[1]), name: decodeURIComponent(match[2]) };
  }
  return { category: null, name: null };
}

function cleanServiceName(name: string, category: string) {
  // Loại bỏ category khỏi tên dịch vụ, không phân biệt hoa thường, loại bỏ khoảng trắng dư
  const regex = new RegExp(category, 'i');
  return name.replace(regex, '').replace(/\s+/g, ' ').trim();
}

function getCategoryIcon(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes('facebook')) return '📘';
  if (cat.includes('instagram')) return '📷';
  if (cat.includes('tiktok')) return '🎵';
  if (cat.includes('youtube')) return '📺';
  if (cat.includes('shopee')) return '🛒';
  if (cat.includes('lazada')) return '📦';
  if (cat.includes('threads')) return '🧵';
  if (cat.includes('twitter') || cat.includes('x')) return '🐦';
  if (cat.includes('linkedin')) return '💼';
  return '🗂️';
}

const Sidebar: React.FC = () => {
  const { services, loading } = useServiceContext();
  // Group services by category and name
  const grouped: Record<string, Record<string, typeof services[0][]>> = {};
  services.forEach(svc => {
    if (!grouped[svc.category]) grouped[svc.category] = {};
    if (!grouped[svc.category][svc.name]) grouped[svc.category][svc.name] = [];
    grouped[svc.category][svc.name].push(svc);
  });
  const categories = Object.keys(grouped);
  const [openCategory, setOpenCategory] = useState<string | null>(
    categories.find(cat => currentPath.startsWith(`/${cat}`)) || null
  );
  const { category: activeCategory, name: activeServiceName } = getActiveCategoryAndService();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col relative">
      <div className="flex items-center px-6 py-5 border-b border-gray-100">
        <img src={logo} alt="LikePlusVietNam" className="w-10 h-10 mr-2" />
        <span className="text-xl font-bold text-blue-700">Like<span className="text-black">PlusVietNam</span></span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto min-h-0">
        <div className="text-xs text-gray-400 px-3 mb-2 uppercase tracking-wider">Quản Lý Chung</div>
        {mainMenu.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`flex items-center px-3 py-2 rounded-lg font-medium text-gray-700 transition relative
              ${currentPath === item.path ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
          >
            {item.name}
          </a>
        ))}
        <div className="text-xs text-gray-400 px-3 mt-6 mb-2 uppercase tracking-wider">Danh Sách Dịch Vụ</div>
        {loading && <div className="text-sm text-gray-400 px-3">Đang tải...</div>}
        {!loading && categories.map((cat) => (
          <div key={cat}>
            <button
              type="button"
              onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
              className={`flex items-center w-full px-3 py-2 rounded-lg font-medium text-gray-700 transition relative
                ${(openCategory === cat || activeCategory === cat) ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
            >
              <span className="mr-2 text-xl">{getCategoryIcon(cat)}</span>
              {cat}
              <span className="ml-auto">
                {openCategory === cat ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
              </span>
            </button>
            {openCategory === cat && (
              <div className="ml-5 mt-1 space-y-1">
                {Object.keys(grouped[cat]).map((serviceName) => (
                  <a
                    key={serviceName}
                    href={`/order/${encodeURIComponent(cat)}/${encodeURIComponent(serviceName)}`}
                    className={`flex items-center px-3 py-2 rounded-lg font-medium text-gray-700 transition
                      ${(activeCategory === cat && activeServiceName === serviceName) ? 'bg-blue-200 text-blue-800 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
                  >
                    <span className="mr-2 text-blue-500">🔹</span>
                    {serviceName}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-100">
        <a href="/settings" className="flex items-center text-gray-500 hover:text-blue-600 text-sm">
          <Cog6ToothIcon className="w-5 h-5 mr-2" /> Cài đặt tài khoản
        </a>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50" style={{ left: 0, top: 0, width: '100vw', height: '100vh' }}>
          <div className="loader mb-3" style={{ borderWidth: 4, width: 36, height: 36, borderRadius: '50%', borderStyle: 'solid', borderColor: '#eee', borderTopColor: '#3498db', animation: 'spin 1s linear infinite' }} />
          <div className="text-base font-semibold text-blue-700">Đang tải dịch vụ...</div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
        </div>
      )}
    </aside>
  );
};

export default Sidebar; 