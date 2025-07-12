import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Services from './pages/Services';
import Deposit from './pages/Deposit';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">LikePlusVietNam</div>
            <nav className="space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Trang chủ</a>
              <a href="/services" className="text-gray-700 hover:text-blue-600 font-medium">Dịch vụ</a>
              <a href="/deposit" className="text-gray-700 hover:text-blue-600 font-medium">Nạp tiền</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">Giới thiệu</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Liên hệ</a>
            </nav>
          </div>
        </header>
        {/* Main */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        {/* Footer */}
        <footer className="bg-white border-t py-6 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LikePlusVietNam. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
