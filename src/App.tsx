import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ServiceProvider } from './context/ServiceContext';
import ServiceOrderForm from './components/ServiceOrderForm';
import OrderForm from './pages/OrderForm';
import Deposit from './pages/Deposit';
import Contact from './pages/Contact';
import Home from './pages/Home';

const DepositLog = () => <div>Nhật ký nạp tiền</div>;
const Pricing = () => <div>Bảng giá & các gói cước</div>;

const DynamicServicePage: React.FC = () => {
  const { category, serviceId } = useParams();
  return <ServiceOrderForm category={category} serviceId={serviceId} />;
};

const App: React.FC = () => {
  return (
    <ServiceProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/order/:category/:name" element={<OrderForm />} />
            <Route path="/:category/:serviceId" element={<DynamicServicePage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ServiceProvider>
  );
};

export default App;
