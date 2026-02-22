import { useState } from "react";
import { FaUser } from "react-icons/fa";

const DashboardProfile = () => {
  // State for avatar preview
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Mock user data - sẽ được thay thế bằng dữ liệu thực từ API
  const user = {
    avatar: null, // Thay đổi thành URL ảnh thực tế nếu có
    email: "user@example.com",
    username: "The Code Master",
  };

  // Handle avatar change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Phần Avatar và Thông tin người dùng */}
      <div className="flex md:flex-row flex-col items-center md:items-start gap-8 md:gap-12 mb-8">
        {/* Khung Avatar */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center bg-zinc-700 rounded-full w-[15vh] md:w-[20vh] h-[15vh] md:h-[20vh] overflow-hidden shrink-0">
            {avatarPreview ? (
              <img
                alt="Avatar"
                className="w-full h-full object-cover"
                src={avatarPreview}
              />
            ) : user.avatar ? (
              <img
                alt="Avatar"
                className="w-full h-full object-cover"
                src={user.avatar}
              />
            ) : (
              <FaUser className="text-[12vh] text-zinc-600" />
            )}
          </div>

          {/* Nút Change Avatar */}
          <div className="flex justify-center items-center mt-4 w-full">
            <label
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full md:w-auto text-white text-center transition-colors duration-200 cursor-pointer"
              htmlFor="imagefile"
            >
              Đổi ảnh
            </label>
            <input
              accept=".jpg,.jpeg,.png"
              className="hidden"
              id="imagefile"
              onChange={handleAvatarChange}
              type="file"
            />
          </div>
        </div>

        {/* Thông tin người dùng */}
        <div className="flex flex-col items-center md:items-start md:text-left text-center">
          <h2 className="font-semibold text-zinc-900 dark:text-white text-2xl md:text-4xl lg:text-5xl">
            {user.username}
          </h2>
          <p className="mt-1 text-zinc-700 dark:text-zinc-400">{user.email}</p>
        </div>
      </div>

      <h1 className="mb-4 font-bold text-zinc-900 dark:text-white text-2xl md:text-3xl">
        Xin chào!
      </h1>
      <p className="text-zinc-600 dark:text-zinc-300 text-lg">
        Chào mừng đến với trang cá nhân của bạn. Tại đây bạn có thể quản lý các
        bài viết yêu thích và bài viết đã thích.
      </p>

      {/* Thống kê nhanh */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-6 border border-zinc-200 dark:border-zinc-700 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Bài viết đã lưu
              </p>
              <p className="font-bold text-zinc-900 dark:text-white text-2xl">
                0
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 border border-zinc-200 dark:border-zinc-700 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-green-600 dark:text-green-400"
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
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Bài viết đã thích
              </p>
              <p className="font-bold text-zinc-900 dark:text-white text-2xl">
                0
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 border border-zinc-200 dark:border-zinc-700 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Tổng số bài viết
              </p>
              <p className="font-bold text-zinc-900 dark:text-white text-2xl">
                0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hướng dẫn sử dụng */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 mt-8 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white text-xl">
          Hướng dẫn
        </h2>
        <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
          <li className="flex items-center gap-2">
            <span className="bg-blue-500 rounded-full w-2 h-2" />
            Sử dụng menu bên trái để điều hướng
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-blue-500 rounded-full w-2 h-2" />
            Xem danh sách bài viết đã lưu trong mục "Bài viết đã lưu"
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-blue-500 rounded-full w-2 h-2" />
            Xem danh sách bài viết đã thích trong mục "Bài viết đã thích"
          </li>
        </ul>
      </div>

      {/* Đường kẻ ngang phân cách */}
      <hr className="my-8 border-zinc-300 dark:border-zinc-700" />

      {/* Form Thay đổi Mật khẩu */}
      <h1 className="mb-4 font-semibold text-zinc-900 dark:text-white text-2xl">
        Thay đổi mật khẩu tài khoản
      </h1>
      <form className="flex flex-col gap-4 w-full max-w-md">
        {/* Mật khẩu hiện tại */}
        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-gray-700 dark:text-zinc-300 text-sm"
            htmlFor="currentPassword"
          >
            Mật khẩu hiện tại của bạn
          </label>
          <input
            className="dark:bg-zinc-800 px-3 py-2 border border-zinc-400 focus:border-blue-500 dark:border-zinc-600 rounded outline-none w-full dark:text-white transition-colors"
            id="currentPassword"
            name="currentPassword"
            placeholder="Nhập mật khẩu hiện tại"
            required
            type="password"
          />
        </div>

        {/* Mật khẩu mới */}
        <div className="flex flex-col gap-1 mt-4">
          <label
            className="font-medium text-gray-700 dark:text-zinc-300 text-sm"
            htmlFor="newPassword"
          >
            Mật khẩu mới
          </label>
          <input
            className="dark:bg-zinc-800 px-3 py-2 border border-zinc-400 focus:border-blue-500 dark:border-zinc-600 rounded outline-none w-full dark:text-white transition-colors"
            id="newPassword"
            name="newPassword"
            placeholder="Nhập mật khẩu mới"
            required
            type="password"
          />
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="flex flex-col gap-1 mt-4">
          <label
            className="font-medium text-gray-700 dark:text-zinc-300 text-sm"
            htmlFor="confirmNewPassword"
          >
            Xác nhận mật khẩu mới
          </label>
          <input
            className="dark:bg-zinc-800 px-3 py-2 border border-zinc-400 focus:border-blue-500 dark:border-zinc-600 rounded outline-none w-full dark:text-white transition-colors"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Nhập lại mật khẩu mới"
            required
            type="password"
          />
        </div>

        {/* Nút cập nhật mật khẩu */}
        <div className="mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-medium text-white transition-all duration-300"
            type="submit"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
