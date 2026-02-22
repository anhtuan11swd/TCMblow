import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", inputs);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
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
            <input
              className="px-3 py-2 border border-zinc-400 focus:border-blue-500 rounded outline-none transition-colors"
              id="password"
              name="password"
              onChange={change}
              placeholder="Nhập mật khẩu của bạn"
              required
              type="password"
              value={inputs.password}
            />
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
