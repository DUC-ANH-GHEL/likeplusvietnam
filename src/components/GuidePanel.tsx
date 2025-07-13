import React from 'react';

const GuidePanel: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <div className="mb-4">
        <div className="text-lg font-bold text-blue-700 mb-2">Video hướng dẫn</div>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-2">
          <iframe
            src="https://www.youtube.com/embed/2Z2eQbGdQJw"
            title="Hướng dẫn tăng sub TikTok"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-48 rounded-lg"
          ></iframe>
        </div>
      </div>
      <div>
        <div className="text-lg font-bold text-yellow-700 mb-2 flex items-center">
          <span className="mr-2">⚠️</span> Lưu ý
        </div>
        <ul className="text-sm text-yellow-800 space-y-2 list-disc pl-5">
          <li>Tuyệt đối không mua trùng nhiều link cùng lúc (không dồn đơn mua liên tiếp nếu link không được cho phép)</li>
          <li>Server 2: tốc độ nhanh, giá rẻ, ưu tiên cho auto đơn lẻ</li>
          <li>Server 5: bảo hành 7 ngày, hoàn tiền khi không chạy</li>
          <li>Không dùng link dạng dán (MSV=LABAAA....) từ ứng dụng user sell, chỉ dùng link chính chủ</li>
          <li>Đơn đã công chạy nhầm, không đổi user, không hoàn tiền quá trình chạy, có thể thiếu 1 video</li>
        </ul>
      </div>
    </div>
  );
};

export default GuidePanel; 