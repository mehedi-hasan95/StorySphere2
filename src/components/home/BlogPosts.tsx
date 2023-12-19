import Blog from "./Blog";

const BlogPosts = () => {
  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto p-4 flex gap-10">
        <div className="md:w-2/3">
          <Blog />
        </div>
        <div className="hidden md:flex md:w-1/3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
          minima doloremque maiores tempore. Sapiente illum id excepturi,
          tenetur amet veniam.
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
