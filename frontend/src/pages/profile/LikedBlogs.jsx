import BlogCard from "../../components/BlogCard";

// Dữ liệu mẫu cho bài viết đã thích
const likedBlogs = [
  {
    date: "19/02/2026",
    description:
      "Redux Toolkit là cách đơn giản nhất để quản lý state trong ứng dụng React. Bài viết này sẽ hướng dẫn bạn cách thiết lập Redux store, tạo slices và sử dụng hooks.",
    IMG: "/temp.jpg",
    id: "4",
    title: "State Management trong React với Redux Toolkit",
  },
  {
    date: "16/02/2026",
    description:
      "React Router v6 là thư viện định tuyến chính thức cho React. Tìm hiểu cách sử dụng các tính năng mới như nested routes, outlet, và dynamic routing.",
    IMG: "/temp.jpg",
    id: "5",
    title: "React Router v6 - Hướng dẫn toàn diện",
  },
];

const LikedBlogs = () => {
  return (
    <div className="p-6">
      <h1 className="mb-6 font-bold text-zinc-900 dark:text-white text-3xl">
        Bài viết đã thích
      </h1>

      {likedBlogs.length > 0 ? (
        <div className="space-y-4">
          {likedBlogs.map((item) => (
            <BlogCard item={item} key={item.id} slice={170} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <svg
            aria-hidden="true"
            className="mx-auto mb-4 w-16 h-16 text-zinc-300 dark:text-zinc-600"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            Chưa có bài viết đã thích nào
          </p>
          <p className="mt-2 text-zinc-400 dark:text-zinc-500">
            Hãy like các bài viết bạn quan tâm
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedBlogs;
