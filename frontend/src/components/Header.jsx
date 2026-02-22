const Header = () => {
  return (
    <header className="flex flex-row justify-center items-center border-zinc-500 border-b-2 py-16 min-h-[60vh]">
      {/* Phần văn bản - bên trái */}
      <div className="flex flex-col items-start px-8 w-1/2">
        <h1 className="font-bold text-gray-900 text-5xl leading-loose">
          Xin chào, tôi là Trần Anh Tuấn
        </h1>
        <h2 className="text-zinc-600 text-xl leading-loose">
          Khám phá những blog mới về công nghệ và thiết bị
        </h2>
      </div>

      {/* Phần hình ảnh - bên phải */}
      <div className="px-8 w-1/2">
        <img
          alt="Code Master"
          className="rounded w-full h-auto max-h-[300px] object-cover"
          src="/temp.jpg"
        />
      </div>
    </header>
  );
};

export default Header;
