import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";

const Profile = () => {
  return (
    <div className="flex items-start gap-8 p-6 min-h-screen">
      {/* Sidebar - bên trái */}
      <div className="flex-shrink-0 w-56">
        <Sidebar />
      </div>

      {/* Nội dung động - bên phải */}
      <div className="flex-1 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
