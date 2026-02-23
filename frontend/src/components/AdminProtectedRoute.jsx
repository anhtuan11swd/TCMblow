import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * AdminProtectedRoute - Bảo vệ các route admin
 * Kiểm tra user đã đăng nhập và có role admin, chuyển hướng đến trang admin-login nếu không
 * @param {React.ReactNode} children - Component con được bảo vệ
 */
const AdminProtectedRoute = ({ children }) => {
  const { isLoggedIn, role, isAuthChecked } = useSelector(
    (state) => state.auth,
  );

  // Đợi kiểm tra auth hoàn tất
  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="inline-block border-4 border-blue-600 border-t-transparent rounded-full w-12 h-12 animate-spin" />
          <p className="mt-4 text-gray-600">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập hoặc không phải admin, chuyển hướng đến trang admin login
  if (!isLoggedIn || role !== "admin") {
    return <Navigate replace to="/admin-login" />;
  }

  return children;
};

export default AdminProtectedRoute;
