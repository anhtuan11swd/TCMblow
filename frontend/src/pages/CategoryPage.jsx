import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";

/**
 * CategoryPage - Trang hiển thị các bài viết theo từng danh mục
 *
 * @description Tái sử dụng BlogCard để hiển thị danh sách bài viết trong từng danh mục
 * Hiện tại hiển thị tất cả bài viết (dữ liệu giả lập) - sẽ được lọc theo category khi kết nối MongoDB
 */

// Danh sách danh mục với thông tin hiển thị
const categoryInfo = {
  devops: {
    description: "CI/CD, Docker, Kubernetes và tự động hóa",
    displayName: "DevOps",
    name: "DevOps",
  },
  ds: {
    description: "Phân tích dữ liệu, thống kê và machine learning",
    displayName: "Khoa học dữ liệu",
    name: "KHD",
  },
  dsa: {
    description: "Khám phá các thuật toán và cấu trúc dữ liệu quan trọng",
    displayName: "Cấu trúc dữ liệu & Giải thuật",
    name: "DSA",
  },
  javascript: {
    description: "Ngôn ngữ lập trình phổ biến nhất",
    displayName: "JavaScript",
    name: "JavaScript",
  },
  ml: {
    description: "Machine Learning và Deep Learning",
    displayName: "Học máy",
    name: "Học máy",
  },
  nextjs: {
    description: "Framework React với Server Side Rendering",
    displayName: "Next.js",
    name: "Next.js",
  },
  react: {
    description: "Thư viện JavaScript cho giao diện người dùng",
    displayName: "React.js",
    name: "React.js",
  },
  trending: {
    description: "Các xu hướng công nghệ mới nhất",
    displayName: "Chủ đề xu hướng",
    name: "Xu hướng",
  },
  typescript: {
    description: "JavaScript với kiểu dữ liệu tĩnh",
    displayName: "TypeScript",
    name: "TypeScript",
  },
};

// Dữ liệu mẫu cho các bài viết (giả lập - sẽ được thay thế bằng API từ MongoDB)
const sampleBlogs = [
  {
    category: "dsa",
    date: "2024-01-15",
    description:
      "Hướng dẫn toàn diện về cấu trúc dữ liệu cây (Tree) và các thuật toán duyệt cây. Tìm hiểu về cây nhị phân, cây AVL, cây đỏ đen và ứng dụng thực tế trong lập trình.",
    IMG: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop",
    id: "dsa-1",
    title: "Cấu trúc dữ liệu cây (Tree) từ cơ bản đến nâng cao",
  },
  {
    category: "dsa",
    date: "2024-01-12",
    description:
      "Tìm hiểu về thuật toán sắp xếp nổi bọt (Bubble Sort), sắp xếp chèn (Insertion Sort) và so sánh hiệu suất giữa các thuật toán.",
    IMG: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop",
    id: "dsa-2",
    title: "Các thuật toán sắp xếp cơ bản trong lập trình",
  },
  {
    category: "dsa",
    date: "2024-01-10",
    description:
      "Giới thiệu về đồ thị (Graph) và các thuật toán tìm đường ngắn nhất như Dijkstra, Bellman-Ford và Floyd-Warshall.",
    IMG: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
    id: "dsa-3",
    title: "Đồ thị và các thuật toán tìm đường ngắn nhất",
  },
  {
    category: "dsa",
    date: "2024-01-08",
    description:
      "Hướng dẫn chi tiết về ngăn xếp (Stack) và hàng đợi (Queue) - hai cấu trúc dữ liệu quan trọng trong lập trình.",
    IMG: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    id: "dsa-4",
    title: "Ngăn xếp (Stack) và Hàng đợi (Queue)",
  },
  {
    category: "ds",
    date: "2024-01-15",
    description:
      "Tìm hiểu về Big Data và các công nghệ xử lý dữ liệu lớn như Hadoop, Spark và các công cụ phân tích dữ liệu hiện đại.",
    IMG: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    id: "ds-1",
    title: "Giới thiệu về Big Data và các công nghệ xử lý dữ liệu lớn",
  },
  {
    category: "ds",
    date: "2024-01-10",
    description:
      "Hướng dẫn sử dụng Python với Pandas và NumPy để phân tích dữ liệu một cách hiệu quả.",
    IMG: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    id: "ds-2",
    title: "Phân tích dữ liệu với Python: Pandas và NumPy",
  },
  {
    category: "ds",
    date: "2024-01-05",
    description:
      "Tìm hiểu về Data Visualization và cách tạo biểu đồ đẹp mắt với các thư viện như Matplotlib và Seaborn.",
    IMG: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    id: "ds-3",
    title: "Trực quan hóa dữ liệu với Python",
  },
  {
    category: "nextjs",
    date: "2024-01-15",
    description:
      "Hướng dẫn chi tiết cách xây dựng ứng dụng React với Server Components và App Router trong Next.js 14.",
    IMG: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    id: "nextjs-1",
    title: "Xây dựng ứng dụng Next.js 14 với App Router",
  },
  {
    category: "nextjs",
    date: "2024-01-10",
    description:
      "Tìm hiểu về Server Side Rendering (SSR) và Static Site Generation (SSG) trong Next.js.",
    IMG: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
    id: "nextjs-2",
    title: "SSR vs SSG trong Next.js: Khi nào sử dụng?",
  },
  {
    category: "devops",
    date: "2024-01-15",
    description:
      "Hướng dẫn toàn diện về Docker từ cơ bản đến nâng cao. Cách tạo Docker image, quản lý containers và triển khai ứng dụng.",
    IMG: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop",
    id: "devops-1",
    title: "Docker từ cơ bản đến nâng cao",
  },
  {
    category: "devops",
    date: "2024-01-10",
    description:
      "Tìm hiểu về CI/CD pipeline và cách thiết lập GitHub Actions cho dự án của bạn.",
    IMG: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    id: "devops-2",
    title: "Thiết lập CI/CD với GitHub Actions",
  },
  {
    category: "ml",
    date: "2024-01-15",
    description:
      "Giới thiệu về Machine Learning và các khái niệm cơ bản. Tìm hiểu về supervised learning, unsupervised learning và reinforcement learning.",
    IMG: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    id: "ml-1",
    title: "Machine Learning cơ bản cho người mới bắt đầu",
  },
  {
    category: "ml",
    date: "2024-01-10",
    description:
      "Hướng dẫn xây dựng mô hình Neural Network đơn giản với TensorFlow và Keras.",
    IMG: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    id: "ml-2",
    title: "Xây dựng Neural Network đầu tiên với TensorFlow",
  },
  {
    category: "trending",
    date: "2024-01-15",
    description:
      "Tổng hợp các xu hướng công nghệ nổi bật trong năm 2024 mà các lập trình viên cần theo dõi.",
    IMG: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    id: "trending-1",
    title: "Xu hướng công nghệ 2024",
  },
  {
    category: "react",
    date: "2024-01-15",
    description:
      "Tìm hiểu về React Hooks và cách sử dụng useState, useEffect, useContext và các hooks tùy chỉnh.",
    IMG: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=600&fit=crop",
    id: "react-1",
    title: "React Hooks toàn diện cho người mới",
  },
  {
    category: "react",
    date: "2024-01-10",
    description:
      "Hướng dẫn quản lý state trong React với Redux Toolkit và RTK Query.",
    IMG: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop",
    id: "react-2",
    title: "Quản lý State với Redux Toolkit",
  },
  {
    category: "javascript",
    date: "2024-01-15",
    description:
      "Tìm hiểu về ES6+ features như arrow functions, destructuring, async/await và các tính năng mới trong JavaScript hiện đại.",
    IMG: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop",
    id: "javascript-1",
    title: "JavaScript ES6+ Từ cơ bản đến nâng cao",
  },
  {
    category: "javascript",
    date: "2024-01-10",
    description: "Hướng dẫn xây dựng REST API với Node.js và Express.",
    IMG: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
    id: "javascript-2",
    title: "Xây dựng REST API với Node.js",
  },
  {
    category: "typescript",
    date: "2024-01-15",
    description:
      "Tìm hiểu về TypeScript và các tính năng như interfaces, generics, utility types.",
    IMG: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    id: "typescript-1",
    title: "TypeScript cho người mới bắt đầu",
  },
  {
    category: "typescript",
    date: "2024-01-10",
    description:
      "Hướng dẫn tích hợp TypeScript vào dự án React để tăng type safety.",
    IMG: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop",
    id: "typescript-2",
    title: "Sử dụng TypeScript với React",
  },
];

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categoryInfo[categoryId] || {
    description: `Các bài viết về ${categoryId}`,
    displayName: categoryId || "Danh mục",
    name: categoryId?.toUpperCase() || "Danh mục",
  };

  // Lọc bài viết theo danh mục (hiện tại hiển thị tất cả nếu không tìm thấy danh mục cụ thể)
  // Khi kết nối MongoDB, API sẽ trả về bài viết đã được lọc theo category
  const filteredBlogs =
    sampleBlogs.filter((blog) => blog.category === categoryId).length > 0
      ? sampleBlogs.filter((blog) => blog.category === categoryId)
      : sampleBlogs;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Header của danh mục */}
      <section className="py-8">
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">
            {category.displayName}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {category.description}
          </p>
        </div>

        {/* Đường phân cách */}
        <div className="mb-8 border-zinc-500 border-b-2" />
      </section>

      {/* Danh sách bài viết */}
      <section className="py-4">
        {/* Tiêu đề phần */}
        <h2 className="mb-6 font-semibold text-gray-800 dark:text-white text-xl">
          Bài viết trong {category.displayName}
        </h2>

        {/* Container thẻ Blog với padding */}
        <div className="p-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => <BlogCard item={item} key={item.id} />)
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Chưa có bài viết nào trong danh mục này.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
