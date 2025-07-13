// Cấu hình thông tin thanh toán thực tế
export const PAYMENT_CONFIG = {
  // Thông tin MoMo
  momo: {
    phone: '0966201140', // Số điện thoại MoMo thật
    name: 'LikePlusVietNam', // Tên hiển thị
    content: 'Nap tien LikePlusVietNam' // Nội dung chuyển khoản
  },
  
  // Thông tin ZaloPay
  zalo: {
    phone: '0966201140', // Số điện thoại ZaloPay thật
    name: 'LikePlusVietNam',
    message: 'Nap tien LikePlusVietNam'
  },
  
  // Thông tin VNPay
  vnpay: {
    merchantId: 'LIKEVIETNAM',
    orderPrefix: 'LP'
  },
  
  // Thông tin chuyển khoản ngân hàng
  bank: {
    accountNumber: '123456789',
    accountName: 'CONG TY LIKE PLUS VIET NAM',
    bankName: 'Vietcombank',
    content: 'Nap tien LikePlusVietNam'
  }
};

// Tạo QR code data cho MoMo - hiển thị thông tin thủ công
export const generateMoMoQR = (amount: number) => {
  const { phone, content } = PAYMENT_CONFIG.momo;
  // Tạo text thông tin thanh toán MoMo
  return `MoMo Transfer Info:
Phone: ${phone}
Amount: ${amount.toLocaleString('vi-VN')} VND
Content: ${content} ${amount.toLocaleString('vi-VN')} VND`;
};

// Tạo QR code data cho ZaloPay
export const generateZaloQR = (amount: number) => {
  const { phone, message } = PAYMENT_CONFIG.zalo;
  return `zalo://transfer?phone=${phone}&amount=${amount}&message=${message}`;
};

// Tạo QR code data cho VNPay
export const generateVNPayQR = (amount: number) => {
  const { merchantId, orderPrefix } = PAYMENT_CONFIG.vnpay;
  const orderId = `${orderPrefix}${Date.now()}`;
  return `https://vnpay.vn/payment?amount=${amount}&merchant=${merchantId}&orderId=${orderId}`;
};

// Tạo QR code data cho chuyển khoản ngân hàng
export const generateBankQR = (amount: number) => {
  const { accountNumber, accountName, bankName, content } = PAYMENT_CONFIG.bank;
  return `bank://transfer?account=${accountNumber}&amount=${amount}&content=${content}&bank=${bankName}&name=${accountName}`;
}; 