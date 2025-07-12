import React from 'react';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => (
  <>
    <Helmet>
      <title>LikePlusVietNam - Dịch vụ mạng xã hội uy tín</title>
      <meta name="description" content="LikePlusVietNam chuyên cung cấp dịch vụ tăng like, follow, view, sub mạng xã hội uy tín, giá rẻ, tự động, bảo mật." />
    </Helmet>
    <section className="text-center py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">LikePlusVietNam</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">Chuyên cung cấp dịch vụ tăng like, follow, view, sub mạng xã hội uy tín, giá rẻ, tự động, bảo mật.</p>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-72">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Tăng Like Facebook</h2>
          <p className="text-gray-600">Dịch vụ tăng like bài viết, fanpage, ảnh cá nhân nhanh chóng, an toàn.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-72">
          <h2 className="text-xl font-bold text-pink-500 mb-2">Tăng Follow Instagram</h2>
          <p className="text-gray-600">Tăng follow, like, view Instagram chất lượng, bảo mật tuyệt đối.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-72">
          <h2 className="text-xl font-bold text-red-500 mb-2">Tăng Sub YouTube</h2>
          <p className="text-gray-600">Tăng sub, view, like YouTube thật, hỗ trợ kênh phát triển mạnh mẽ.</p>
        </div>
      </div>
    </section>
  </>
);

export default Home; 