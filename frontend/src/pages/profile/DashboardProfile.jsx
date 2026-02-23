import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardProfile = () => {
  // Lấy backend URL từ Redux store
  const backendLink = useSelector((state) => state.production.link);

  // State quản lý dữ liệu người dùng
  const [userData, setUserData] = useState(null);

  // State for avatar preview
  const [avatarPreview, setAvatarPreview] = useState(null);

  // State quản lý dữ liệu mật khẩu
  const [passwords, setPasswords] = useState({
    confirmNewPass: "",
    newPass: "",
    password: "",
  });

  // State quản lý hiển thị mật khẩu
  const [showPasswords, setShowPasswords] = useState({
    confirm: false,
    current: false,
    new: false,
  });

  // Gọi API lấy dữ liệu profile khi component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/v1/user/get-profile-data`,
          { withCredentials: true },
        );
        // Backend trả về { user: safeUserData }
        setUserData(response.data.user);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu profile:", error);
      }
    };

    fetchProfileData();
  }, [backendLink]);

  // Handle avatar change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  // Cập nhật state passwords khi người dùng nhập liệu
  const changePass = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle hiển thị mật khẩu
  const toggleShowPassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Gửi yêu cầu đổi mật khẩu
  const handlePass = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${backendLink}/api/v1/user/change-user-password`,
        passwords,
        { withCredentials: true },
      );

      if (response.status === 200) {
        toast.success("Đổi mật khẩu thành công!");
        // Xóa trống các trường nhập liệu sau khi thành công
        setPasswords({
          confirmNewPass: "",
          newPass: "",
          password: "",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đổi mật khẩu thất bại";
      toast.error(errorMessage);
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
            ) : userData?.avatar ? (
              <img
                alt="Avatar"
                className="w-full h-full object-cover"
                src={userData.avatar}
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

        {/* Thông tin người dùng - chỉ hiển thị khi userData đã sẵn sàng */}
        {userData && (
          <div className="flex flex-col items-center md:items-start md:text-left text-center">
            <h2 className="font-semibold text-zinc-900 text-2xl md:text-4xl lg:text-5xl">
              {userData.username}
            </h2>
            <p className="mt-1 text-zinc-700">{userData.email}</p>
          </div>
        )}
      </div>

      <h1 className="mb-4 font-bold text-zinc-900 text-2xl md:text-3xl">
        Xin chào!
      </h1>
      <p className="text-zinc-600 text-lg">
        Chào mừng đến với trang cá nhân của bạn. Tại đây bạn có thể quản lý các
        bài viết yêu thích và bài viết đã thích.
      </p>

      {/* Thống kê nhanh */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-8">
        <div className="bg-white p-6 border border-zinc-200 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-blue-600"
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
              <p className="text-zinc-500 text-sm">Bài viết đã lưu</p>
              <p className="font-bold text-zinc-900 text-2xl">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-zinc-200 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-green-600"
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
              <p className="text-zinc-500 text-sm">Bài viết đã thích</p>
              <p className="font-bold text-zinc-900 text-2xl">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-zinc-200 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-purple-600"
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
              <p className="text-zinc-500 text-sm">Tổng số bài viết</p>
              <p className="font-bold text-zinc-900 text-2xl">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hướng dẫn sử dụng */}
      <div className="bg-zinc-50 mt-8 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-zinc-900 text-xl">Hướng dẫn</h2>
        <ul className="space-y-2 text-zinc-600">
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
      <hr className="my-8 border-zinc-300" />

      {/* Form Thay đổi Mật khẩu */}
      <h1 className="mb-4 font-semibold text-zinc-900 text-2xl">
        Thay đổi mật khẩu tài khoản
      </h1>
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={handlePass}
      >
        {/* Mật khẩu hiện tại */}
        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-gray-700 text-sm"
            htmlFor="currentPassword"
          >
            Mật khẩu hiện tại của bạn
          </label>
          <div className="relative">
            <input
              className="px-3 py-2 pr-10 border border-zinc-400 focus:border-blue-500 rounded outline-none w-full transition-colors"
              id="currentPassword"
              name="password"
              onChange={changePass}
              placeholder="Nhập mật khẩu hiện tại"
              required
              type={showPasswords.current ? "text" : "password"}
              value={passwords.password}
            />
            <button
              className="top-1/2 right-3 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2"
              onClick={() => toggleShowPassword("current")}
              type="button"
            >
              {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="flex flex-col gap-1 mt-4">
          <label
            className="font-medium text-gray-700 text-sm"
            htmlFor="newPassword"
          >
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              className="px-3 py-2 pr-10 border border-zinc-400 focus:border-blue-500 rounded outline-none w-full transition-colors"
              id="newPassword"
              name="newPass"
              onChange={changePass}
              placeholder="Nhập mật khẩu mới"
              required
              type={showPasswords.new ? "text" : "password"}
              value={passwords.newPass}
            />
            <button
              className="top-1/2 right-3 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2"
              onClick={() => toggleShowPassword("new")}
              type="button"
            >
              {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="flex flex-col gap-1 mt-4">
          <label
            className="font-medium text-gray-700 text-sm"
            htmlFor="confirmNewPassword"
          >
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              className="px-3 py-2 pr-10 border border-zinc-400 focus:border-blue-500 rounded outline-none w-full transition-colors"
              id="confirmNewPassword"
              name="confirmNewPass"
              onChange={changePass}
              placeholder="Nhập lại mật khẩu mới"
              required
              type={showPasswords.confirm ? "text" : "password"}
              value={passwords.confirmNewPass}
            />
            <button
              className="top-1/2 right-3 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2"
              onClick={() => toggleShowPassword("confirm")}
              type="button"
            >
              {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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

      {/* Toast Container */}
      <ToastContainer autoClose={3000} position="top-right" />
    </div>
  );
};

export default DashboardProfile;
