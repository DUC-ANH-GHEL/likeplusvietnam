import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';
import OrderForm from '../components/OrderForm';
import GuidePanel from '../components/GuidePanel';
import ChatSupport from '../components/ChatSupport';

const OrderTikTok: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col lg:flex-row gap-8 px-8 py-8 max-w-7xl mx-auto w-full">
          <div className="flex-1 max-w-2xl">
            <UserInfo />
            <OrderForm />
          </div>
          <div className="w-full lg:w-96 flex-shrink-0">
            <GuidePanel />
          </div>
        </main>
      </div>
      <ChatSupport />
    </div>
  );
};

export default OrderTikTok; 