# 🏦 Hướng dẫn cấu hình thông tin thanh toán

## 📱 Cập nhật thông tin thanh toán thực tế

Để QR code hoạt động với tài khoản thật của bạn, hãy cập nhật file `src/config/payment.ts`:

### 1. **MoMo**
```typescript
momo: {
  phone: '0966201140', // ⚠️ Thay bằng số điện thoại MoMo thật của bạn
  name: 'LikePlusVietNam', // Tên hiển thị
  content: 'Nap tien LikePlusVietNam' // Nội dung chuyển khoản
}
```

### 2. **ZaloPay**
```typescript
zalo: {
  phone: '0966201140', // ⚠️ Thay bằng số điện thoại ZaloPay thật
  name: 'LikePlusVietNam',
  message: 'Nap tien LikePlusVietNam'
}
```

### 3. **Chuyển khoản ngân hàng**
```typescript
bank: {
  accountNumber: '123456789', // ⚠️ Thay bằng số tài khoản thật
  accountName: 'CONG TY LIKE PLUS VIET NAM', // ⚠️ Thay bằng tên tài khoản thật
  bankName: 'Vietcombank', // ⚠️ Thay bằng tên ngân hàng thật
  content: 'Nap tien LikePlusVietNam'
}
```

## 🔧 Cách lấy thông tin thanh toán

### **MoMo:**
1. Mở ứng dụng MoMo
2. Vào **Cài đặt** → **Thông tin cá nhân**
3. Copy số điện thoại đăng ký MoMo

### **ZaloPay:**
1. Mở ứng dụng ZaloPay
2. Vào **Cài đặt** → **Thông tin tài khoản**
3. Copy số điện thoại đăng ký ZaloPay

### **Chuyển khoản ngân hàng:**
1. Đăng nhập internet banking
2. Vào **Thông tin tài khoản**
3. Copy số tài khoản và tên chủ tài khoản

## 🚀 Sau khi cập nhật

1. Lưu file `src/config/payment.ts`
2. Commit và push code:
```bash
git add .
git commit -m "Update payment information with real account details"
git push
```

## ✅ Kiểm tra

1. Vào trang **Nạp tiền**
2. Chọn số tiền và phương thức thanh toán
3. QR code sẽ hiển thị với thông tin thật của bạn
4. Test quét QR code bằng ứng dụng tương ứng

## 🔒 Bảo mật

- ⚠️ **KHÔNG** commit thông tin thanh toán thật lên git public
- Sử dụng environment variables cho production
- Chỉ chia sẻ thông tin thanh toán qua kênh an toàn

## 📞 Hỗ trợ

Nếu cần hỗ trợ, liên hệ:
- Email: support@likeplusvietnam.com
- Hotline: 0123456789 