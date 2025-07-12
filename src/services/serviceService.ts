import apiClient from './api';

export interface Service {
  service: number;
  name: string;
  type: string;
  category: string;
  rate: string;
  min: number;
  max: number;
  dripfeed?: boolean;
  refill?: boolean;
  cancel?: boolean;
}

export interface OrderData {
  service: number;
  link: string;
  quantity: number;
  runs?: number;
  interval?: number;
  comments?: string;
}

export interface Order {
  order: number;
  status: string;
  charge: string;
  start_count: number;
  remains: number;
  currency: string;
}

export interface OrderStatus {
  order: number;
  status: string;
  charge: string;
  start_count: number;
  remains: number;
  currency: string;
}

class ServiceService {
  // Lấy danh sách tất cả dịch vụ
  async getServices(): Promise<Service[]> {
    try {
      console.log('Fetching services...');
      const response = await apiClient.post('', {
        action: 'services'
      });
      
      console.log('Services response:', response.data);
      
      // API trả về object với key là service ID
      const servicesData = response.data;
      const services: Service[] = [];
      
      for (const [serviceId, serviceData] of Object.entries(servicesData)) {
        services.push({
          service: parseInt(serviceId),
          ...(serviceData as any)
        });
      }
      
      console.log('Processed services:', services);
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  // Tạo đơn hàng mới
  async createOrder(data: OrderData): Promise<Order> {
    try {
      console.log('Creating order with data:', data);
      
      const orderData = {
        action: 'add',
        ...data
      };
      
      console.log('Sending order request:', orderData);
      
      const response = await apiClient.post('', orderData);
      
      console.log('Order response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Lấy trạng thái đơn hàng
  async getOrderStatus(orderId: number): Promise<OrderStatus> {
    try {
      console.log('Fetching order status for:', orderId);
      
      const response = await apiClient.post('', {
        action: 'status',
        order: orderId
      });
      
      console.log('Order status response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  }

  // Lấy trạng thái nhiều đơn hàng
  async getMultipleOrderStatus(orderIds: number[]): Promise<OrderStatus[]> {
    try {
      console.log('Fetching multiple order status for:', orderIds);
      
      const response = await apiClient.post('', {
        action: 'status',
        orders: orderIds.join(',')
      });
      
      console.log('Multiple order status response:', response.data);
      
      // API trả về object với key là order ID
      const ordersData = response.data;
      const orders: OrderStatus[] = [];
      
      for (const [orderId, orderData] of Object.entries(ordersData)) {
        orders.push({
          order: parseInt(orderId),
          ...(orderData as any)
        });
      }
      
      console.log('Processed orders:', orders);
      return orders;
    } catch (error) {
      console.error('Error fetching multiple order status:', error);
      throw error;
    }
  }

  // Lấy dịch vụ theo category
  async getServicesByCategory(category: string): Promise<Service[]> {
    const allServices = await this.getServices();
    return allServices.filter(service => service.category === category);
  }

  // Lấy dịch vụ theo type
  async getServicesByType(type: string): Promise<Service[]> {
    const allServices = await this.getServices();
    return allServices.filter(service => service.type === type);
  }

  // Lấy chi tiết dịch vụ
  async getServiceById(serviceId: number): Promise<Service | null> {
    try {
      console.log('Fetching service by ID:', serviceId);
      const allServices = await this.getServices();
      const service = allServices.find(service => service.service === serviceId);
      console.log('Found service:', service);
      return service || null;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  }
}

const serviceService = new ServiceService();
export default serviceService; 