import axios from "axios";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/auth";

const sidebarLinks = [
  {
    icon: (
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="9" width="7" x="3" y="3" />
        <rect height="5" width="7" x="14" y="3" />
        <rect height="9" width="7" x="14" y="12" />
        <rect height="5" width="7" x="3" y="16" />
      </svg>
    ),
    name: "Bảng điều khiển",
    path: "/profile",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    name: "Bài viết đã lưu",
    path: "/profile/favorites",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
    name: "Bài viết đã thích",
    path: "/profile/liked-blogs",
  },
];

const Sidebar = ({ closeSideBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:1000/api/v1/user/logout",
        {},
        { withCredentials: true },
      );
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 border border-zinc-200 rounded-xl min-h-[400px]">
      {/* Tiêu đề Sidebar */}
      <h2 className="mb-2 font-bold text-zinc-900 text-xl">Menu</h2>

      {/* Danh sách liên kết điều hướng */}
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link) => (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-zinc-900 text-white font-semibold"
                  : "text-zinc-600 hover:bg-zinc-100 hover:font-semibold"
              }`
            }
            end={link.path === "/profile"}
            key={link.path}
            onClick={() => closeSideBar?.()}
            to={link.path}
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Nút Đăng xuất */}
      <button
        className="flex justify-center items-center gap-3 bg-zinc-900 hover:bg-zinc-800 mt-auto px-4 py-3 rounded-lg font-medium text-white transition-all duration-300"
        onClick={handleLogout}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
        <span>Đăng xuất</span>
      </button>
    </div>
  );
};

export default Sidebar;
