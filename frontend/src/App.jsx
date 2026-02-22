import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import OtherLayout from "./layout/OtherLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AllBlogs from "./pages/AllBlogs";
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
        <Route element={<AdminDashboard />} path="admin" />

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
    </Routes>
  );
}

export default App;
