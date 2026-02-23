import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../store/auth";

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendLink}/api/v1/user/login`,
        inputs,
        {
          withCredentials: true,
        },
      );
      dispatch(
        login({
          role: response.data.user.role,
          user: response.data.user,
        }),
      );
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại",
      );
    } finally {
      setInputs({ email: "", password: "" });
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <ToastContainer position="top-center" />
      <div className="relative bg-white shadow-2xl p-8 md:p-12 rounded-lg w-[80%] md:w-[60%] lg:w-[40%]">
        <Link
          aria-label="Quay về trang chủ"
          className="top-4 right-4 absolute flex justify-center items-center hover:bg-gray-100 rounded-full w-10 h-10 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          to="/"
        >
          <FaHome className="w-5 h-5" />
        </Link>
        <h1 className="mb-2 font-bold text-2xl text-center">
          Chào mừng trở lại
        </h1>
        <span className="block mb-6 text-gray-600 text-center">
          vui lòng đăng nhập ở đây
        </span>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label
              className="font-medium text-gray-700 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="px-3 py-2 border border-zinc-400 focus:border-blue-500 rounded outline-none transition-colors"
              id="email"
              name="email"
              onChange={change}
              placeholder="Nhập email của bạn"
              required
              type="email"
              value={inputs.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="font-medium text-gray-700 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="px-3 py-2 pr-10 border border-zinc-400 focus:border-blue-500 rounded outline-none w-full transition-colors"
                id="password"
                name="password"
                onChange={change}
                placeholder="Nhập mật khẩu của bạn"
                required
                type={showPassword ? "text" : "password"}
                value={inputs.password}
              />
              <button
                className="top-1/2 right-3 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 mt-4 py-2 rounded w-full font-medium text-white transition-all duration-300"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-center">
          Chưa có tài khoản?{" "}
          <Link
            className="font-medium text-blue-600 hover:text-blue-700"
            to="/signup"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
