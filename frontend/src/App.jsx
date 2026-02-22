import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import MainLayout from "./layout/MainLayout";
import OtherLayout from "./layout/OtherLayout";
import AddBlog from "./pages/AddBlog";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AllBlogs from "./pages/AllBlogs";
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

function App() {
  return (
    <Routes>
      {/* Main Layout Routes - với Navbar và Footer */}
      <Route element={<MainLayout />} path="/">
        <Route element={<Home />} index />
        <Route element={<AllBlogs />} path="blogs" />
        <Route element={<CategoryPage />} path="category/:categoryId" />

        {/* Routes cho từng danh mục cụ thể */}
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

        {/* Nested Routes cho Profile */}
        <Route element={<Profile />} path="profile">
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

      {/* Admin Layout Routes - với Sidebar */}
      <Route element={<AdminLayout />} path="admin-dashboard">
        <Route element={<AdminDashboard />} index />
        <Route element={<AddBlog />} path="add-blogs" />
        <Route element={<EditBlogs />} path="edit-blogs" />
      </Route>
    </Routes>
  );
}

export default App;
