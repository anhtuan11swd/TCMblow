import Categories from "../components/Categories";
import Header from "../components/Header";
import RecentBlogs from "../components/RecentBlogs";

const Home = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <Header />
      <Categories />
      <RecentBlogs />
    </div>
  );
};

export default Home;
