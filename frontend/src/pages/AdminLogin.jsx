import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../store/auth";

const AdminLogin = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendLink = useSelector((state) => state.production.link);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendLink}/api/v1/admin/admin-login`,
        inputs,
        { withCredentials: true },
      );
      toast.success(response.data.message || "Login successfully");
      dispatch(
        login({
          role: response.data.user.role,
          user: response.data.user,
        }),
      );
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-100 to-zinc-200 h-screen">
      <div className="bg-white shadow-2xl p-8 md:p-12 rounded-xl w-[90%] md:w-[50%] lg:w-[35%]">
        <ToastContainer position="top-center" />
        <div className="mb-8 text-center">
          <div className="inline-flex justify-center items-center bg-zinc-100 mb-4 rounded-full w-16 h-16">
            <svg
              aria-label="Biểu tượng khóa"
              className="w-8 h-8 text-zinc-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h1 className="mb-2 font-bold text-zinc-800 text-3xl">Admin Login</h1>
          <span className="block text-zinc-500">
            Đăng nhập vào hệ thống quản trị
          </span>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleAdminLogin}>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-zinc-700 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-zinc-50 focus:bg-white px-4 py-3 border border-zinc-300 focus:border-blue-600 rounded-lg outline-none transition-all duration-300"
              id="email"
              name="email"
              onChange={change}
              placeholder="Nhập email quản trị"
              required
              type="email"
              value={inputs.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-zinc-700 text-sm"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                className="bg-zinc-50 focus:bg-white px-4 py-3 pr-12 border border-zinc-300 focus:border-blue-600 rounded-lg w-full outline-none transition-all duration-300"
                id="password"
                name="password"
                onChange={change}
                placeholder="Nhập mật khẩu"
                required
                type={showPassword ? "text" : "password"}
                value={inputs.password}
              />
              <button
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Ẩn mật khẩu</title>
                    <path
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Hiện mật khẩu</title>
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
                )}
              </button>
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl mt-4 py-3 rounded-lg w-full font-semibold text-white transition-all duration-300"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
