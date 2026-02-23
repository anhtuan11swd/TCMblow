import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:1000/api/v1/blogs";

const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);

  // Gọi API lấy chi tiết bài viết
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/getDSCByAddress/${id}`, {
          credentials: "include",
        });
        const result = await response.json();

        if (result.success) {
          setData(result.blog);
          setIsFavorite(result.blog.favorite || false);
          setIsLiked(result.blog.liked || false);
          setLikesCount(result.blog.likes || 0);
        } else {
          setError(result.message || "Không tìm thấy bài viết");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Lỗi khi tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  // Xử lý toggle favorite (hệ thống Favorite Blogs riêng biệt)
  const favoriteHandler = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      // Sử dụng API mới cho hệ thống Favorite
      const endpoint = isFavorite
        ? `${BASE_URL}/removeBlogFromFavorites/${id}`
        : `${BASE_URL}/addBlogsToFavorite/${id}`;
      const method = isFavorite ? "DELETE" : "POST";

      const response = await fetch(endpoint, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method,
      });
      const result = await response.json();

      if (result.success) {
        setIsFavorite(result.favorite);
      } else if (response.status === 401) {
        alert("Vui lòng đăng nhập để thực hiện thao tác này");
      } else {
        alert(result.message || "Có lỗi xảy ra");
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert("Lỗi khi thực hiện thao tác");
    } finally {
      setIsProcessing(false);
    }
  };

  // Xử lý toggle like (hệ thống Like Blogs)
  const likeHandler = async () => {
    if (isLikeProcessing) return;

    setIsLikeProcessing(true);
    try {
      const endpoint = isLiked
        ? `${BASE_URL}/removeFromFavorites/${id}`
        : `${BASE_URL}/addToFavorites/${id}`;
      const method = isLiked ? "DELETE" : "POST";

      const response = await fetch(endpoint, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method,
      });
      const result = await response.json();

      if (result.success) {
        setIsLiked(result.liked);
        // Cập nhật số lượt thích
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        // Cập nhật trong data để đồng bộ
        setData((prev) => ({
          ...prev,
          likes: isLiked ? prev.likes - 1 : prev.likes + 1,
        }));
      } else if (response.status === 401) {
        alert("Vui lòng đăng nhập để thích bài viết");
      } else {
        alert(result.message || "Có lỗi xảy ra");
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      alert("Lỗi khi thực hiện thao tác");
    } finally {
      setIsLikeProcessing(false);
    }
  };

  // Format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Không tìm thấy bài viết</div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      {/* Nút quay lại - Đầu trang */}
      <div className="mb-6">
        <button
          aria-label="Quay lại danh sách bài viết"
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
          onClick={() => navigate(-1)}
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Quay lại</title>
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          <span className="font-medium">Quay lại</span>
        </button>
      </div>

      {/* Container chính */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Hình ảnh - w-full, h-[400px] */}
        <div className="relative">
          <img
            alt={data.title}
            className="w-full h-[400px] object-cover"
            src={data.image || "/temp.jpg"}
          />
          {/* Nút yêu thích - góc phải trên hình ảnh */}
          <button
            className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
              isFavorite
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-white text-gray-500 hover:bg-gray-100"
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={isProcessing}
            onClick={favoriteHandler}
            title={isFavorite ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
            type="button"
          >
            <svg
              className={`w-6 h-6 ${isFavorite ? "text-white" : "text-gray-500"}`}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>
                {isFavorite ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
              </title>
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Nội dung chi tiết */}
        <div className="p-6">
          {/* Tiêu đề - text-2xl, font-semibold */}
          <h1 className="mb-4 font-semibold text-gray-900 text-2xl">
            {data.title}
          </h1>

          {/* Thông tin meta */}
          <div className="flex items-center gap-4 mb-6 text-gray-500 text-sm">
            {data.author && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Tác giả</title>
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                {data.author.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Ngày đăng</title>
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              {formatDate(data.createdAt)}
            </span>
            {data.category && (
              <span className="bg-blue-100 px-2 py-1 rounded text-blue-600 text-xs">
                {data.category.name}
              </span>
            )}
            <button
              className={`flex items-center gap-1 transition-all duration-200 ${
                isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-500 hover:text-red-500"
              } ${isLikeProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={isLikeProcessing}
              onClick={likeHandler}
              title={isLiked ? "Bỏ thích" : "Thích bài viết"}
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>{isLiked ? "Đã thích" : "Thích"}</title>
                <path
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{likesCount || data.likes || 0}</span>
            </button>
          </div>

          {/* Mô tả chi tiết - leading-relaxed */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
