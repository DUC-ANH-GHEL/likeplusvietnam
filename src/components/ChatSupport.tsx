import React from 'react';

const ChatSupport: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end space-y-3">
      <a
        href="https://zalo.me/0966201140"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all"
        title="Chat Zalo hỗ trợ"
      >
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#0084FF" />
          <path d="M24 12C17.3726 12 12 16.4772 12 22C12 25.3137 14.6863 28 18 28H19V32.382C19 32.7647 19.4477 32.9722 19.7236 32.7236L24.4472 28.7236C24.7893 28.4232 25.2107 28.4232 25.5528 28.7236L30.2764 32.7236C30.5523 32.9722 31 32.7647 31 32.382V28H32C35.3137 28 38 25.3137 38 22C38 16.4772 32.6274 12 24 12Z" fill="white"/>
        </svg>
      </a>
      <a
        href="https://m.me/likeplusvietnam"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all"
        title="Chat Facebook hỗ trợ"
      >
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#1877F3" />
          <path d="M24 12C17.3726 12 12 16.4772 12 22C12 25.3137 14.6863 28 18 28H19V32.382C19 32.7647 19.4477 32.9722 19.7236 32.7236L24.4472 28.7236C24.7893 28.4232 25.2107 28.4232 25.5528 28.7236L30.2764 32.7236C30.5523 32.9722 31 32.7647 31 32.382V28H32C35.3137 28 38 25.3137 38 22C38 16.4772 32.6274 12 24 12Z" fill="white"/>
        </svg>
      </a>
    </div>
  );
};

export default ChatSupport; 