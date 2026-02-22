import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navItems = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Dashboard</title>
          <path
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      name: "Bảng điều khiển",
      path: "/admin-dashboard",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Add Blog</title>
          <path
            d="M12 4v16m8-8H4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      name: "Thêm bài viết",
      path: "/admin-dashboard/add-blogs",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Edit Blog</title>
          <path
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      name: "Quản lý bài viết",
      path: "/admin-dashboard/edit-blogs",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - 1/6 chiều rộng, fixed */}
      <aside className="top-0 left-0 fixed flex flex-col bg-zinc-200 border-zinc-300 border-r w-1/6 min-w-[200px] h-screen">
        <div className="p-6 border-zinc-300 border-b">
          <h2 className="my-4 font-semibold text-zinc-800 text-xl">
            Trang Quản trị
          </h2>
          <p className="mt-1 text-zinc-600 text-xs">Hệ thống quản trị</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-zinc-700 hover:bg-zinc-300 hover:scale-105"
                    }`
                  }
                  to={item.path}
                >
                  {item.icon}
                  <span className="font-medium text-xl">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-zinc-300 border-t">
          <NavLink
            className="flex items-center gap-3 hover:bg-zinc-300 px-4 py-3 rounded-lg text-zinc-600 hover:text-zinc-800 transition-all duration-300"
            to="/login"
          >
            <svg
              aria-label="Logout icon"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Logout</title>
              <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span className="font-medium text-base">Đăng xuất</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content - 5/6 chiều rộng, scrollable */}
      <main className="bg-white ml-[16.666%] w-5/6 min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
