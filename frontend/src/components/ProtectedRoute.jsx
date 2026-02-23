import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute - Bảo vệ các route yêu cầu đăng nhập
 * Nếu chưa đăng nhập, chuyển hướng về /login
 * @param {React.ReactNode} children - Component con được bảo vệ
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isAuthChecked } = useSelector((state) => state.auth);

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

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
