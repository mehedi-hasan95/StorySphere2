import { TrendingUp } from "lucide-react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

// types
interface TrendingProps {
  id: string;
  title: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
}

async function getTrendingPost() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/public/trending`, {
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
const Trending = async () => {
  const data = await getTrendingPost();
  return (
    <div>
      <div className="max-w-6xl p-4 mx-auto">
        <div className="py-6 md:py-8 lg:py-10">
          <p className="flex items-center font-bold">
            <TrendingUp className="mr-2 h-6 w-6 border-black border rounded-full" />
            Trending on Medium
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-7">
            {data?.posts?.map((item: TrendingProps, idx: number) => (
              <div key={item.id} className="flex gap-5">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-200 select-none">
                  O{idx + 1}
                </h2>
                <div>
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.user.image}
                      alt=""
                      height={500}
                      width={500}
                      className="w-6 h-6 rounded-full"
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
                    className="line-clamp-2 py-2 md:text-xl font-bold"
                  >
                    <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-[length:0px_4px] hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                      {item.title}
                    </span>
                  </Link>
                  <div className="flex gap-4 text-xs">
                    <p>{item.createdAt.slice(0, 10)}</p>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Trending;
