import { Link } from "react-router-dom";
import AllBlogs from "./AllBlogs";

const AdminDashboard = () => {
  const stats = [
    {
      color: "bg-blue-500",
      icon: (
        <svg
          aria-label="Biểu tượng bài viết"
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      id: "total-posts",
      title: "Tổng số bài viết",
      value: "24",
    },
    {
      color: "bg-green-500",
      icon: (
        <svg
          aria-label="Biểu tượng đồng hồ"
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      id: "weekly-posts",
      title: "Bài viết mới tuần này",
      value: "5",
    },
    {
      color: "bg-purple-500",
      icon: (
        <svg
          aria-label="Biểu tượng thẻ"
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      id: "total-categories",
      title: "Tổng số danh mục",
      value: "8",
    },
    {
      color: "bg-orange-500",
      icon: (
        <svg
          aria-label="Biểu tượng mắt"
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <path
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      id: "weekly-views",
      title: "Lượt xem tuần này",
      value: "1,234",
    },
  ];

  const recentActivities = [
    {
      action: "Thêm bài viết mới",
      id: "activity-1",
      time: "2 giờ trước",
      title: "Top 10 Mẹo Chăm Sóc Tóc",
    },
    {
      action: "Cập nhật bài viết",
      id: "activity-2",
      time: "5 giờ trước",
      title: "Kỹ Thuật Tạo Kiểu Tại Nhà",
    },
    {
      action: "Xóa bài viết",
      id: "activity-3",
      time: "1 ngày trước",
      title: "Hướng Dẫn Sử Dụng Dầu Gội",
    },
    {
      action: "Thêm danh mục mới",
      id: "activity-4",
      time: "2 ngày trước",
      title: "Chăm Sóc Tóc Tự Nhiên",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-bold text-zinc-800 text-3xl">
          Tổng quan Dashboard
        </h1>
        <p className="mt-2 text-zinc-500">
          Chào mừng đến với hệ thống quản trị
        </p>
      </div>

      {/* Stats Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            className="bg-white shadow-lg hover:shadow-xl p-6 border border-zinc-100 rounded-xl transition-shadow duration-300"
            key={stat.id}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-zinc-500 text-sm">
                  {stat.title}
                </p>
                <p className="mt-2 font-bold text-zinc-800 text-3xl">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-4 rounded-xl text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow-lg mb-8 border border-zinc-100 rounded-xl">
        <div className="p-6 border-zinc-100 border-b">
          <h2 className="font-bold text-zinc-800 text-xl">Hoạt động gần đây</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                className="flex justify-between items-center py-3 border-zinc-50 last:border-0 border-b"
                key={activity.id}
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center bg-zinc-100 rounded-full w-10 h-10">
                    <svg
                      aria-label="Biểu tượng thông tin"
                      className="w-5 h-5 text-zinc-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-800">
                      {activity.action}
                    </p>
                    <p className="text-zinc-500 text-sm">{activity.title}</p>
                  </div>
                </div>
                <span className="text-zinc-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiển thị danh sách tất cả bài viết */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-zinc-800 text-xl">Tất cả bài viết</h2>
          <Link
            className="font-medium text-blue-500 hover:text-blue-700 text-sm"
            to="/admin-dashboard/edit-blogs"
          >
            Quản lý bài viết →
          </Link>
        </div>
        <div className="bg-zinc-50 p-4 rounded-xl">
          <AllBlogs />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
