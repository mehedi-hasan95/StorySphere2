import HomeMenu from "@/components/custom/HomeMenu";
import BlogPosts from "@/components/home/BlogPosts";
import Hero from "@/components/home/Hero";
import Trending from "@/components/home/Trending";

export default async function Home() {
  return (
    <div>
      <HomeMenu />
      <Hero />
      <Trending />
      <BlogPosts />
    </div>
  );
}
