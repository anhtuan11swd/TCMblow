import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import MainLayout from "./layout/MainLayout";
import OtherLayout from "./layout/OtherLayout";
import AddBlog from "./pages/AddBlog";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AllBlogs from "./pages/AllBlogs";
import CategoryManager from "./pages/CategoryManager";
import CategoryPage from "./pages/CategoryPage";
import Description from "./pages/Description";
import EditBlogs from "./pages/EditBlogs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DashboardProfile from "./pages/profile/DashboardProfile";
import Favorites from "./pages/profile/Favorites";
import LikedBlogs from "./pages/profile/LikedBlogs";
import Signup from "./pages/Signup";
import UpdateBlog from "./pages/UpdateBlog";
import { login, setAuthChecked } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((state) => state.auth);
  const backendLink = useSelector((state) => state.production.link);

  useEffect(() => {
    const checkCookie = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/v1/user/check-cookie`,
          { withCredentials: true },
        );
        if (response.data.valid) {
          dispatch(
            login({
              role: response.data.role,
              user: response.data.user,
            }),
          );
        } else {
          dispatch(setAuthChecked());
        }
      } catch (error) {
        console.error("Lỗi kiểm tra cookie:", error);
        dispatch(setAuthChecked());
      }
    };
    checkCookie();
  }, [dispatch, backendLink]);

  // Hiển thị loading trong khi kiểm tra authentication
  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="inline-block border-4 border-blue-600 border-t-transparent rounded-full w-12 h-12 animate-spin" />
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }
  return (
    <Routes>
      {/* Main Layout Routes - với Navbar và Footer */}
      <Route element={<MainLayout />} path="/">
        <Route element={<Home />} index />
        <Route element={<AllBlogs />} path="blogs" />
        <Route element={<CategoryPage />} path="cat/:categoryId" />

        {/* Routes cho từng danh mục cụ thể */}
        {/* Các routes này giữ lại để tương thích ngược */}
        <Route element={<CategoryPage />} path="dsa" />
        <Route element={<CategoryPage />} path="ds" />
        <Route element={<CategoryPage />} path="nextjs" />
        <Route element={<CategoryPage />} path="devops" />
        <Route element={<CategoryPage />} path="machine-learning" />
        <Route element={<CategoryPage />} path="trending" />
        <Route element={<CategoryPage />} path="react" />
        <Route element={<CategoryPage />} path="javascript" />
        <Route element={<CategoryPage />} path="typescript" />

        <Route element={<AdminDashboard />} path="admin" />
        <Route element={<Description />} path="description/:id" />

        {/* Nested Routes cho Profile - Protected */}
        <Route
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          path="profile"
        >
          <Route element={<DashboardProfile />} index />
          <Route element={<Favorites />} path="favorites" />
          <Route element={<LikedBlogs />} path="liked-blogs" />
        </Route>
      </Route>

      {/* Other Layout Routes - không có Navbar và Footer */}
      <Route element={<OtherLayout />} path="/">
        <Route element={<Login />} path="login" />
        <Route element={<Signup />} path="signup" />
      </Route>

      {/* Admin Login Route */}
      <Route element={<AdminLogin />} path="admin-login" />

      {/* Admin Layout Routes - với Sidebar - Protected */}
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
        path="admin-dashboard"
      >
        <Route element={<AdminDashboard />} index />
        <Route element={<AddBlog />} path="add-blogs" />
        <Route element={<CategoryManager />} path="categories" />
        <Route element={<EditBlogs />} path="edit-blogs" />
        <Route element={<UpdateBlog />} path="update-blog/:id" />
      </Route>
    </Routes>
  );
}

export default App;
