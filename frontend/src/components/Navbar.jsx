import { Menu } from "lucide-react";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const links = [
    { name: "Trang chủ", path: "/" },
    { name: "Tất cả bài viết", path: "/blogs" },
    { name: "Hồ sơ", path: "/profile" },
    { name: "Đăng nhập", path: "/login" },
  ];

  return (
    <nav className="top-0 right-0 left-0 z-50 fixed bg-white border-gray-200 border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link
            className="py-4 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-bold text-gray-900 hover:text-gray-600 text-2xl transition-colors duration-300"
            to="/"
          >
            TCM Blog
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-gray-700 hover:text-zinc-500 transition-all duration-300"
                key={link.name}
                to={link.path}
              >
                {link.name}
              </Link>
            ))}
            <Link
              className="bg-black hover:bg-gray-800 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-white transition-colors duration-300 cursor-pointer"
              to="/signup"
            >
              Đăng ký
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-expanded={mobileMenu}
            aria-label={mobileMenu ? "Đóng menu" : "Mở menu"}
            className="md:hidden flex justify-center items-center p-2 focus:outline-none focus:ring-2 focus:ring-black min-w-[44px] min-h-[44px] text-gray-700 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
            type="button"
          >
            {mobileMenu ? (
              <RxCross1 className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out ${
          mobileMenu
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col justify-center items-center space-y-2 px-4 py-8">
          {links.map((link) => (
            <Link
              className="flex justify-center items-center hover:bg-gray-50 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 w-full max-w-xs min-h-[48px] text-gray-700 hover:text-zinc-500 text-lg transition-all duration-300 cursor-pointer"
              key={link.name}
              onClick={() => setMobileMenu(false)}
              to={link.path}
            >
              {link.name}
            </Link>
          ))}
          <Link
            className="bg-black hover:bg-gray-800 mt-4 px-8 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 w-full max-w-xs min-h-[48px] text-white text-center transition-colors duration-300 cursor-pointer"
            onClick={() => setMobileMenu(false)}
            to="/signup"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
