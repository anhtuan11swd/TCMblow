import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";

const Profile = () => {
  const [sideBarDiv, setSideBarDiv] = useState(false);

  const toggleSideBar = () => {
    setSideBarDiv(!sideBarDiv);
  };

  const closeSideBar = () => {
    setSideBarDiv(false);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl">
      <div className="relative lg:flex lg:min-h-screen">
        {/* Nút mở menu trên mobile - chỉ hiển thị trên màn hình nhỏ */}
        <button
          aria-label="Mở menu"
          className="lg:hidden top-20 left-4 z-40 fixed bg-zinc-900 shadow-lg p-3 rounded-lg text-white"
          onClick={toggleSideBar}
          type="button"
        >
          <FaBars className="w-5 h-5" />
        </button>

        {/* Overlay khi sidebar mở trên mobile */}
        {sideBarDiv && (
          <button
            aria-label="Đóng menu"
            className="lg:hidden z-40 fixed inset-0 bg-black/50 border-none cursor-default"
            onClick={closeSideBar}
            type="button"
          />
        )}

        {/* Sidebar - bên trái */}
        <div
          className={`lg:flex lg:shrink-0 lg:w-56 lg:static fixed top-0 left-0 z-40 h-screen lg:h-auto transition-transform duration-300 ease-in-out ${
            sideBarDiv ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 lg:p-0 w-[70%] lg:w-56">
            {/* Nút đóng trên mobile */}
            <button
              aria-label="Đóng menu"
              className="lg:hidden top-4 right-4 absolute p-2 text-zinc-600"
              onClick={closeSideBar}
              type="button"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <Sidebar closeSideBar={closeSideBar} />
          </div>
        </div>

        {/* Nội dung động - bên phải */}
        <div className="lg:flex-1 lg:pl-8 py-4 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
