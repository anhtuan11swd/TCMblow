# TCMblow - Nền tảng Blog MERN Stack

Một ứng dụng blog đầy đủ tính năng được xây dựng với MongoDB, Express.js, React và Node.js (MERN Stack). Hỗ trợ quản lý bài viết, danh mục, xác thực người dùng và bảng điều khiển quản trị.

## Tính năng chính

### Người dùng
- Đăng ký và đăng nhập với xác thực JWT
- Xem danh sách bài viết và chi tiết bài viết
- Thích (like) và yêu thích (favorite) bài viết
- Quản lý hồ sơ cá nhân với avatar
- Xem bài viết theo danh mục
- Thay đổi mật khẩu

### Quản trị viên
- Đăng nhập riêng cho admin
- Tạo, chỉnh sửa và xóa bài viết
- Quản lý danh mục
- Upload ảnh lên Cloudinary
- Xem thống kê (tổng bài viết, danh mục, lượt xem)
- Theo dõi hoạt động gần đây
- Bảng điều khiển quản trị với sidebar

### Tính năng kỹ thuật
- Xác thực JWT với HTTP-only cookies
- Upload và tối ưu hóa ảnh với Cloudinary
- Phân quyền người dùng (user/admin)
- Ghi log hoạt động quản trị
- Responsive design với Tailwind CSS
- State management với Redux Toolkit
- Protected routes cho cả client và server

## Công nghệ sử dụng

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database và ODM
- **JWT** - Xác thực người dùng
- **bcryptjs** - Mã hóa mật khẩu
- **Cloudinary** - Lưu trữ và quản lý ảnh
- **Multer** - Upload file middleware
- **Cookie-parser** - Xử lý cookies
- **CORS** - Cross-origin resource sharing
- **Biome** - Linting và formatting

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router v7** - Routing
- **Axios** - HTTP client
- **Tailwind CSS v4** - Styling
- **React Icons** & **Lucide React** - Icons
- **React Toastify** - Notifications

## Cấu trúc dự án

```
TCMblow/
├── backend/
│   ├── controllers/        # Logic xử lý request
│   │   ├── adminController.js
│   │   ├── blogsController.js
│   │   └── userController.js
│   ├── middleware/         # Middleware functions
│   │   ├── authMiddleware.js
│   │   └── imageUpload.js
│   ├── models/            # Mongoose schemas
│   │   ├── Activity.js
│   │   ├── Blog.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   │   ├── activityLogger.js
│   │   └── cloudinary.js
│   ├── app.js             # Entry point
│   ├── connection.js      # Database connection
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   │   ├── admin/
    │   │   ├── profile/
    │   │   ├── AdminProtectedRoute.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ...
    │   ├── layout/        # Layout components
    │   ├── pages/         # Page components
    │   │   ├── profile/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── ...
    │   ├── store/         # Redux store
    │   │   ├── auth.js
    │   │   ├── index.js
    │   │   └── productionRoute.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Cài đặt và chạy dự án

### Yêu cầu
- Node.js (v18 trở lên)
- MongoDB (local hoặc MongoDB Atlas)
- Tài khoản Cloudinary

### 1. Clone repository
```bash
git clone <repository-url>
cd TCMblow
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend`:
```env
PORT=1000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Chạy backend:
```bash
npm run dev    # Development mode với nodemon
npm start      # Production mode
```

### 3. Cài đặt Frontend

```bash
cd frontend
npm install
```

Cập nhật URL backend trong `frontend/src/store/productionRoute.js` nếu cần.

Chạy frontend:
```bash
npm run dev    # Development mode
npm run build  # Build cho production
```

Frontend sẽ chạy tại `http://localhost:5173`

## API Endpoints

### User Routes (`/api/v1/user`)
- `POST /signup` - Đăng ký người dùng mới
- `POST /login` - Đăng nhập
- `POST /logout` - Đăng xuất
- `GET /check-cookie` - Kiểm tra trạng thái đăng nhập
- `GET /profile` - Lấy thông tin profile (protected)
- `PUT /change-password` - Đổi mật khẩu (protected)
- `PUT /change-avatar` - Đổi avatar (protected)

### Blog Routes (`/api/v1/blogs`)
- `GET /` - Lấy tất cả bài viết
- `GET /recent` - Lấy 4 bài viết mới nhất
- `GET /:id` - Lấy chi tiết bài viết
- `POST /:id/like` - Thích bài viết (protected)
- `DELETE /:id/like` - Bỏ thích bài viết (protected)
- `POST /:id/favorite` - Thêm vào yêu thích (protected)
- `DELETE /:id/favorite` - Xóa khỏi yêu thích (protected)
- `GET /user/favorites` - Lấy bài viết yêu thích (protected)
- `GET /user/liked` - Lấy bài viết đã thích (protected)
- `GET /category/:id` - Lấy bài viết theo danh mục
- `GET /categories` - Lấy tất cả danh mục
- `PUT /:id` - Cập nhật bài viết (admin)
- `DELETE /:id` - Xóa bài viết (admin)

### Admin Routes (`/api/v1/admin`)
- `POST /login` - Đăng nhập admin
- `POST /add-blog` - Thêm bài viết mới (admin)
- `GET /blogs` - Lấy tất cả bài viết (admin)
- `DELETE /blogs/:id` - Xóa bài viết (admin)
- `POST /categories` - Tạo danh mục mới (admin)
- `GET /categories` - Lấy danh mục với populate blogs (admin)
- `GET /categories/public` - Lấy danh mục công khai
- `DELETE /categories/:id` - Xóa danh mục (admin)
- `GET /stats` - Lấy thống kê dashboard (admin)
- `GET /activities` - Lấy hoạt động gần đây (admin)

## Models

### User
- username (string, required, min: 3)
- email (string, required, unique)
- password (string, required, min: 6, hashed)
- avatar (string, URL)
- role (enum: 'user' | 'admin', default: 'user')
- favoriteBlogs (array of Blog IDs)
- likedBlogs (array of Blog IDs)

### Blog
- title (string, required)
- description (string, required)
- image (string, URL)
- author (ref: User, required)
- category (ref: Category)
- likes (number, default: 0)
- likes_users (array of User IDs)
- favoriteBlogsByUser (array of User IDs)
- timestamps (createdAt, updatedAt)

### Category
- name (string, required, unique)
- description (string)
- blogs (array of Blog IDs)
- timestamps (createdAt, updatedAt)

### Activity
- admin (ref: User, required)
- action (enum: create_blog | update_blog | delete_blog | create_category | update_category | delete_category)
- actionText (string, required)
- details (object: blogId, categoryId, title)
- timestamps (createdAt, updatedAt)

## Scripts

### Backend
```bash
npm run dev      # Chạy với nodemon
npm start        # Chạy production
npm run format   # Format code với Biome
npm run lint     # Lint code với Biome
npm run check    # Check và fix với Biome
```

### Frontend
```bash
npm run dev      # Chạy dev server
npm run build    # Build production
npm run preview  # Preview production build
npm run format   # Format code với Biome
npm run lint     # Lint với ESLint
npm run lint2    # Lint với Biome
npm run check    # Check và fix với Biome
```

## Tính năng bảo mật

- Mật khẩu được hash với bcryptjs (10 salt rounds)
- JWT tokens được lưu trong HTTP-only cookies
- CORS được cấu hình cho frontend origin
- Protected routes với middleware xác thực
- Role-based authorization (user/admin)
- Input validation trên cả client và server
- File upload validation (type, size)

## Tác giả

Trần Anh Tuấn

## License

ISC
