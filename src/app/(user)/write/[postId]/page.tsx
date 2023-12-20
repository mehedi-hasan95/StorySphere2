import prismadb from "@/lib/prismadb";
// import PostForm from "../_components/PostForm";

import PostForm from "@/app/(user)/write/_components/PostForm";

const PostId = async ({ params }: { params: { postId: string } }) => {
  const post = await prismadb.posts.findUnique({
    where: {
      id: params.postId,
    },
  });
  return (
    <div>
      <PostForm initialData={post} />
    </div>
  );
};

export default PostId;
