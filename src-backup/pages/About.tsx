import React from 'react';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => (
  <>
    <Helmet>
      <title>Giới thiệu - LikePlusVietNam</title>
      <meta name="description" content="Giới thiệu về LikePlusVietNam - nền tảng cung cấp dịch vụ mạng xã hội uy tín, giá rẻ, tự động." />
    </Helmet>
    <section className="max-w-2xl mx-auto bg-white shadow rounded-lg p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Giới thiệu</h1>
      <p className="text-gray-700 mb-2">LikePlusVietNam là nền tảng chuyên cung cấp các dịch vụ tăng like, follow, view, sub cho các mạng xã hội như Facebook, Instagram, YouTube... với tiêu chí uy tín, giá rẻ, tự động và bảo mật tuyệt đối.</p>
      <p className="text-gray-700">Chúng tôi cam kết mang lại trải nghiệm tốt nhất, hỗ trợ khách hàng 24/7 và luôn cập nhật các dịch vụ mới nhất theo xu hướng mạng xã hội.</p>
    </section>
  </>
);

export default About; 