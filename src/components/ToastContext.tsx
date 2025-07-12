import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps>({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastList toasts={toasts} />
    </ToastContext.Provider>
  );
};

const ToastList = ({ toasts }: { toasts: Toast[] }) => (
  <div className="fixed top-6 right-4 z-50 flex flex-col space-y-3 max-w-xs w-full">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`animate-fade-in-up px-4 py-3 rounded-xl shadow-lg text-base font-medium flex items-center transition-all
          ${t.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : ''}
          ${t.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : ''}
          ${t.type === 'info' ? 'bg-gray-50 text-gray-800 border border-gray-200' : ''}
        `}
        style={{ minWidth: 200 }}
      >
        {t.type === 'success' && <span className="mr-2">✅</span>}
        {t.type === 'error' && <span className="mr-2">❌</span>}
        {t.type === 'info' && <span className="mr-2">ℹ️</span>}
        <span>{t.message}</span>
      </div>
    ))}
    <style>{`
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-up { animation: fade-in-up 0.3s; }
    `}</style>
  </div>
); 