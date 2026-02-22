import BlogCard from "./BlogCard";

/**
 * RecentBlogs - Component container để hiển thị các bài viết blog mới nhất
 * Duyệt qua dữ liệu mẫu và render các component BlogCard
 */
const RecentBlogs = () => {
  // Dữ liệu mẫu mô phỏng phản hồi từ database
  const data = [
    {
      date: "2024-01-15",
      description:
        "Để có mái tóc khỏe mạnh, bạn cần kết hợp giữa chăm sóc đúng cách, dinh dưỡng và lối sống lành mạnh. Trong hướng dẫn toàn diện này, chúng tôi sẽ khám phá những mẹo và thủ thuật cần thiết giúp bạn có được mái tóc bóng khỏe, sống động. Từ việc hiểu loại tóc của bạn đến việc chọn sản phẩm phù hợp, chúng tôi sẽ hỗ trợ bạn. Khám phá tầm quan trọng của việc dưỡng ẩm thường xuyên, lợi ích của các liệu pháp deep treatment, và cách bảo vệ tóc khỏi tổn thương môi trường. Cho dù bạn đang gặp vấn đề về khô tóc, xù tóc hay gãy rụng, những khuyến nghị từ chuyên gia này sẽ thay đổi thói quen chăm sóc tóc của bạn.",
      IMG: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      id: "1",
      title: "Top 10 Mẹo Chăm Sóc Tóc Để Có Mái Tóc Khỏe Mạnh",
    },
    {
      date: "2024-01-10",
      description:
        "Để thực sự chăm sóc tóc, điều quan trọng là phải hiểu cấu trúc sinh học và chu kỳ phát triển của tóc. Mỗi sợi tóc gồm ba lớp: cuticle, cortex và medulla. Cuticle đóng vai trò như một lớp bảo vệ, trong khi cortex chứa sắc tố melanin quyết định màu tóc của bạn. Tóc mọc theo chu kỳ gồm các giai đoạn anagen, catagen và telogen. Hiểu được các giai đoạn này có thể giúp bạn tối ưu hóa thói quen chăm sóc tóc và giải quyết các vấn đề thường gặp như rụng tóc quá nhiều hoặc mọc chậm. Tìm hiểu cách dinh dưỡng, quản lý căng thẳng và chăm sóc da đầu đúng cách có thể ảnh hưởng đến mỗi giai đoạn của chu kỳ phát triển tóc.",
      IMG: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      id: "2",
      title: "Hiểu Cấu Trúc Tóc Và Chu Kỳ Phát Triển Của Tóc",
    },
    {
      date: "2024-01-05",
      description:
        "Bạn không cần phải đến salon mỗi khi muốn tạo kiểu tóc chuyên nghiệp. Với các công cụ và kỹ thuật đúng, bạn có thể đạt được kết quả như salon ngay tại nhà. Hướng dẫn này bao gồm mọi thứ từ các thực hành tốt nhất về nhiệt độ tạo kiểu đến tạo kiểu xoăn bền và kiểu thẳng mượt. Chúng tôi thảo luận về tầm quan trọng của kem bảo vệ nhiệt, phương pháp sấy tóc đúng cách, và cách sử dụng máy uốn tóc và mái ép an toàn. Nắm vững nghệ thuật chia vùng tóc, hiểu cài đặt nhiệt độ phù hợp với loại tóc của bạn, và học các mẹo chuyên nghiệp mà các stylist tóc sử dụng để tạo ra những kiểu tóc ấn tượng giữ được cả ngày.",
      IMG: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&h=600&fit=crop",
      id: "3",
      title: "Kỹ Thuật Tạo Kiểu Chuyên Nghiệp Tại Nhà",
    },
    {
      date: "2024-01-01",
      description:
        "Nhiều vấn đề tóc phổ biến có thể được giải quyết bằng các thành phần tự nhiên có sẵn trong bếp của bạn. Từ gàu đến rụng tóc, tự nhiên cung cấp những giải pháp mạnh mẽ nhẹ nhàng với da đầu và tóc. Khám phá lợi ích của dầu dừa, arnica, nha đam và các loại thuốc tự nhiên khác đã được sử dụng trong nhiều thế kỷ để thúc đẩy sức khỏe tóc. Hướng dẫn toàn diện này sẽ hướng dẫn bạn cách tạo các liệu pháp điều trị tại nhà hiệu quả, hiểu thành phần nào hoạt động tốt nhất cho từng vấn đề cụ thể, và cách tích hợp các giải pháp tự nhiên này vào thói quen chăm sóc tóc hàng ngày. Nói lời tạm biệt với các hóa chất gây hại và đón nhận sức mạnh của tự nhiên để có mái tóc khỏe mạnh, sống động hơn.",
      IMG: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=600&fit=crop",
      id: "4",
      title: "Các Liệu Pháp Tự Nhiên Cho Các Vấn Đề Tóc Thường Gặp",
    },
  ];

  return (
    <section className="py-4">
      {/* Tiêu đề phần */}
      <h2 className="mb-6 font-bold text-gray-900 text-2xl">
        Bài viết mới nhất
      </h2>

      {/* Duyệt qua dữ liệu và render BlogCard cho mỗi bài viết */}
      {data.map((item) => (
        <BlogCard item={item} key={item.id} />
      ))}
    </section>
  );
};

export default RecentBlogs;
