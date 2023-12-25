import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BookmarkButton from "../userAction/BookmarkButton";

interface BlogProps {
  id: string;
  title: string;
  short_Desc: string;
  image: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  _count: {
    postComment: number;
    postLike: number;
    wishlist: number;
  };
}
async function getAllData() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/public/allpost`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return <p>Something went wrong</p>;
  }
}
const Blog = async () => {
  const data = await getAllData();
  return (
    <>
      {data?.posts?.map((item: BlogProps) => (
        <div
          key={item.id}
          className="flex justify-between gap-10 items-center mb-10"
        >
          <div className="w-2/3">
            <div className="flex gap-2 items-center">
              <Image
                src={item.user.image}
                alt=""
                height={500}
                width={500}
                className="w-7 h-7 rounded-full"
              />
              <HoverCard openDelay={100}>
                <HoverCardTrigger
                  className={cn("cursor-pointer font-bold text-xs")}
                >
                  {item.user.name}
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={item.user.image}
                      alt=""
                      height={500}
                      width={500}
                      className="h-10 w-10 rounded-full"
                    />
                    {item.user.name}
                  </div>
                  {item.user.email}
                </HoverCardContent>
              </HoverCard>
            </div>
            <Link
              href={`/${item.id}`}
              className="md:text-xl font-bold line-clamp-2 pt-3"
            >
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-[length:0px_4px] hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                {item.title}
              </span>
            </Link>
            <p className="line-clamp-2 py-2">{item.short_Desc}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <p>{item.createdAt.slice(0, 10)}</p>
              </div>
              <BookmarkButton data={item} />
            </div>
          </div>
          <div className="w-1/3">
            <Image src={item.image} alt="" height={500} width={500} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
