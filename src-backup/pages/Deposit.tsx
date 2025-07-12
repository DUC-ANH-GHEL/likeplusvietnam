import React from 'react';
import { Helmet } from 'react-helmet-async';

const Deposit: React.FC = () => (
  <>
    <Helmet>
      <title>Nạp tiền - LikePlusVietNam</title>
      <meta name="description" content="Nạp tiền vào tài khoản LikePlusVietNam bằng cách quét mã QR chuyển khoản nhanh chóng, an toàn." />
    </Helmet>
    <section className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Nạp tiền</h1>
      <p className="mb-4 text-gray-700">Quét mã QR bên dưới để chuyển khoản nạp tiền vào tài khoản của bạn.</p>
      <div className="flex justify-center mb-4">
        <img src="/assets/qr-demo.png" alt="QR Nạp tiền" className="w-60 h-60 object-contain border rounded-lg" />
      </div>
      <p className="text-gray-500 text-sm">Sau khi chuyển khoản, tiền sẽ được cộng tự động vào tài khoản của bạn.</p>
    </section>
  </>
);

export default Deposit; 