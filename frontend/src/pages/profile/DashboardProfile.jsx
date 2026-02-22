const DashboardProfile = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 font-bold text-zinc-900 dark:text-white text-3xl">
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
    </div>
  );
};

export default DashboardProfile;
