import React from 'react';
import { Helmet } from 'react-helmet-async';

const Services: React.FC = () => {
  // TODO: Gọi API lấy danh sách dịch vụ
  return (
    <>
      <Helmet>
        <title>Dịch vụ mạng xã hội - LikePlusVietNam</title>
        <meta name="description" content="Danh sách dịch vụ tăng like, follow, view, sub mạng xã hội uy tín, giá rẻ tại LikePlusVietNam." />
      </Helmet>
      <section>
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Dịch vụ mạng xã hội</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Danh sách dịch vụ sẽ render ở đây */}
          <div className="bg-white shadow rounded-lg p-6 text-center text-gray-700">Đang tải dịch vụ...</div>
        </div>
      </section>
    </>
  );
};

export default Services; 