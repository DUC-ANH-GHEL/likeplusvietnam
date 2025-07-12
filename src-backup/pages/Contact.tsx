import React from 'react';
import { Helmet } from 'react-helmet-async';

const Contact: React.FC = () => (
  <>
    <Helmet>
      <title>Liên hệ - LikePlusVietNam</title>
      <meta name="description" content="Liên hệ LikePlusVietNam để được tư vấn, hỗ trợ dịch vụ mạng xã hội nhanh chóng." />
    </Helmet>
    <section className="max-w-lg mx-auto bg-white shadow rounded-lg p-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Liên hệ</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Họ tên" className="w-full border rounded px-3 py-2" required />
        <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" required />
        <textarea placeholder="Nội dung" className="w-full border rounded px-3 py-2" rows={4} required></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Gửi liên hệ</button>
      </form>
    </section>
  </>
);

export default Contact; 