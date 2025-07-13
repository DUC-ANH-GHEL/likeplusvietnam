import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setRouteLoading(true);
    const timeout = setTimeout(() => setRouteLoading(false), 500); // 500ms loading effect
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {routeLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999] pointer-events-auto">
          <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center">
            <div className="loader mb-3" style={{ borderWidth: 4, width: 40, height: 40, borderRadius: '50%', borderStyle: 'solid', borderColor: '#eee', borderTopColor: '#3498db', animation: 'spin 1s linear infinite' }} />
            <div className="text-lg font-semibold text-blue-700">Đang tải trang...</div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
          </div>
        </div>
      )}
      {/* Sidebar cố định trên desktop, drawer trên mobile */}
      {/* Desktop sidebar */}
      <div className="fixed left-0 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>
      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64 bg-white h-full shadow-xl">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
      {/* Content bên phải, có margin-left bằng width sidebar trên desktop */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 w-full">
        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <Header onOpenSidebar={() => setSidebarOpen(true)} />
        </div>
        <main className="flex-1 w-full px-2 sm:px-4 md:px-8 py-6 sm:py-8 max-w-full md:max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 