# 🏠 MHouse – Hệ thống quản lý nhà trọ thông minh

## 📌 Giới thiệu

**MHouse** là một hệ thống quản lý nhà trọ/nhà cho thuê được xây dựng nhằm **giải quyết các vấn đề thủ công, rời rạc và khó kiểm soát** trong việc vận hành nhà trọ như:

* Quản lý phòng, người thuê bằng sổ sách hoặc file Excel
* Theo dõi hóa đơn điện nước, tiền phòng thiếu chính xác
* Khó kiểm soát trạng thái phòng, hợp đồng
* Không có lịch sử chỉnh sửa, cập nhật rõ ràng
* Mất nhiều thời gian cho các thao tác lặp lại

👉 **MHouse ra đời để số hóa toàn bộ quy trình quản lý**, giúp chủ trọ quản lý dễ dàng – minh bạch – tiết kiệm thời gian.

---

## 🎯 Vấn đề mà MHouse giải quyết

| Vấn đề                       | Giải pháp của MHouse       |
| ---------------------------- | -------------------------- |
| Quản lý thủ công, dễ sai sót | Quản lý tập trung trên web |
| Không rõ trạng thái phòng    | Trạng thái phòng realtime  |
| Hóa đơn tính tay             | Tự động quản lý hóa đơn    |
| Khó theo dõi người thuê      | Hồ sơ người thuê đầy đủ    |
| Không có phân quyền          | Phân quyền Admin / Tenant  |

---

## 🚀 Tính năng chính

### 👤 Quản lý người dùng

* Thêm / sửa / xóa người dùng
* Phân quyền **Admin / Tenant**
* Trạng thái: `active / inactive / blocked`
* Tìm kiếm & lọc đa trường

### 🏘️ Quản lý phòng

* Thêm, cập nhật thông tin phòng
* Trạng thái: trống / đang thuê / bảo trì
* Gắn người thuê cho phòng

### 🧾 Quản lý hóa đơn

* Tạo & cập nhật hóa đơn theo tháng
* Theo dõi trạng thái: đã thanh toán / chưa / quá hạn
* Tổng hợp chi phí rõ ràng

### 🔐 Bảo mật & phân quyền

* Đăng nhập xác thực
* Phân quyền thao tác theo role

---

## 🧱 Công nghệ sử dụng

### Frontend

* **ReactJS + TypeScript**
* **Vite**
* **TailwindCSS**
* **shadcn/ui**

### Backend

* **Node.js + Express**
* **Sequelize ORM**
* **PostgeSQL**

---

## ⚙️ Cài đặt & chạy dự án

### 1️⃣ Clone project

```bash
git clone https://github.com/khanhdev1902/mhouse.git
cd mhouse
```

---

### 2️⃣ Cài đặt Backend

```bash
cd backend
npm install
```

#### 🔧 Cấu hình môi trường

Tạo file `.env` trong thư mục `backend`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=mhouse_db
DB_DIALECT=mysql
```

#### ▶️ Chạy backend

```bash
npm run dev
```

Backend chạy tại: `http://localhost:3000`

---

### 3️⃣ Cài đặt Frontend

```bash
cd frontend
npm install
```

#### ▶️ Chạy frontend

```bash
npm run dev
```

Frontend chạy tại: `http://localhost:5173`

---

## 🗄️ Cơ sở dữ liệu

* MySQL 8+
* Sequelize tự động sync bảng khi khởi chạy
* Có thể dùng `DB_SYNC=alter` khi dev

---

## 📂 Cấu trúc thư mục (rút gọn)

```
mhouse
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   └── app.js
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   ├── hooks
    │   └── types
```

---

## 👥 Đối tượng sử dụng

* Chủ nhà trọ
* Quản lý khu trọ
* Dự án học tập web fullstack

---

## 📈 Định hướng phát triển

* 🔔 Thông báo realtime (WebSocket)
* 💳 Thanh toán online (VNPay, Momo)
* 📊 Dashboard thống kê
* 📱 Mobile-friendly UI

---

## 📄 License

Dự án phục vụ **học tập & nghiên cứu**.

---

> ✨ *MHouse – Quản lý nhà trọ không còn là gánh nặng*
