import { Link } from "react-router-dom";

const categories = [
  {
    color: "bg-green-200",
    hoverColor: "hover:bg-green-300",
    id: "dsa",
    label: "Cấu trúc dữ liệu & Giải thuật",
    name: "DSA",
    path: "/dsa",
  },
  {
    color: "bg-blue-300",
    hoverColor: "hover:bg-blue-400",
    id: "ds",
    label: "Khoa học dữ liệu",
    name: "KHD",
    path: "/ds",
  },
  {
    color: "bg-red-200",
    hoverColor: "hover:bg-red-300",
    id: "nextjs",
    label: "Next.js",
    name: "Next.js",
    path: "/nextjs",
  },
  {
    color: "bg-orange-200",
    hoverColor: "hover:bg-orange-300",
    id: "devops",
    label: "DevOps",
    name: "DevOps",
    path: "/devops",
  },
  {
    color: "bg-pink-200",
    hoverColor: "hover:bg-pink-300",
    id: "ml",
    label: "Học máy",
    name: "Học máy",
    path: "/machine-learning",
  },
  {
    color: "bg-blue-200",
    hoverColor: "hover:bg-blue-300",
    id: "trending",
    label: "Chủ đề xu hướng",
    name: "Xu hướng",
    path: "/trending",
  },
  {
    color: "bg-purple-200",
    hoverColor: "hover:bg-purple-300",
    id: "react",
    label: "React.js",
    name: "React.js",
    path: "/react",
  },
  {
    color: "bg-yellow-200",
    hoverColor: "hover:bg-yellow-300",
    id: "javascript",
    label: "JavaScript",
    name: "JavaScript",
    path: "/javascript",
  },
  {
    color: "bg-cyan-200",
    hoverColor: "hover:bg-cyan-300",
    id: "typescript",
    label: "TypeScript",
    name: "TypeScript",
    path: "/typescript",
  },
];

const Categories = () => {
  return (
    <section className="py-8">
      <h2 className="mb-6 font-semibold text-gray-800 text-xl">Danh mục</h2>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            className={`${category.color} ${category.hoverColor} rounded-lg px-4 py-3 text-center font-semibold text-gray-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md`}
            key={category.id}
            to={category.path}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
