import React, { createContext, useContext, useEffect, useState } from 'react';
import serviceService, { Service } from '../services/serviceService';

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const ServiceContext = createContext<ServiceContextType>({
  services: [],
  loading: true,
  error: null,
});

export const useServiceContext = () => useContext(ServiceContext);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await serviceService.getServices();
        setServices(res);
      } catch (err: any) {
        setError('Không thể tải danh sách dịch vụ');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider value={{ services, loading, error }}>
      {children}
    </ServiceContext.Provider>
  );
}; 