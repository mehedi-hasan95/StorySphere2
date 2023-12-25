export const revalidate = 0;
import Comments from "@/components/userAction/Comments";
import { Preview } from "@/components/custom/Preview";
import UserMenu from "@/components/custom/UserMenu";
import { Separator } from "@/components/ui/separator";
import BookmarkButton from "@/components/userAction/BookmarkButton";
import LikeButton from "@/components/userAction/LikeButton";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getSingleData(id: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/public/allpost/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

const SinglePost = async ({ params }: { params: { postId: string } }) => {
  const data = await getSingleData(params.postId);
  if (data.msg === "faill") {
    return <p>No data avilable</p>;
  }
  return (
    <div className="max-w-6xl mx-auto p-4">
      <UserMenu />
      <div className="max-w-3xl mx-auto">
        <h2 className="md:text-2xl lg:text-3xl font-bold mt-5 md:mt-10">
          {data?.post.title}
        </h2>
        <p className="text-xl text-slate-400 py-2">{data?.post.short_Desc}</p>
        <div className="flex gap-x-6 items-center pb-5">
          <Image
            src={data?.post.user.image}
            alt=""
            height={500}
            width={500}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h4 className="">{data?.post.user.name}</h4>
            <p>
              Published in <span className="font-bold">Story Sphere</span>{" "}
              <span>{data?.post.createdAt.slice(0, 10)}</span>
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between items-center py-5">
          <div className="flex gap-x-4 items-center">
            <LikeButton data={data?.post} />
            <Link href="#comment" className="flex gap-x-2 items-center">
              <MessagesSquare size={20} />
              {data?.post?._count.postComment}
            </Link>
          </div>
          <BookmarkButton data={data?.post} />
        </div>
        <Separator />
      </div>
      <div className="my-5 md:my-8 lg:my-10">
        <Image
          src={data?.post?.image}
          alt={data?.post?.title}
          height={500}
          width={500}
          className="w-full object-cover"
        />
        <Preview value={data?.post?.content} />
      </div>

      <Separator />
      <div className="py-5">
        <h2 className="md:text-xl lg:text-2xl font-bold py-3">
          Write your comment
        </h2>
        <Comments data={data?.post?.id} />
      </div>
    </div>
  );
};

export default SinglePost;
