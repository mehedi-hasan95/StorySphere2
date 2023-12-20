import getCurrentUser from "@/actions/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WritePage = async () => {
  const currentUser = await getCurrentUser();
  const data = await prismadb.posts.findMany({
    where: {
      userId: currentUser?.id,
    },
  });
  return (
    <div className="max-w-6xl p-4 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl font-bold">Your Blog ({data?.length})</h2>
        <Button asChild>
          <Link href="/write/new">
            <Edit className="mr-2 h-4 w-4" />
            New
          </Link>
        </Button>
      </div>
      <Separator className={cn("my-3")} />
      {/* Grid functionality */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.map((item) => (
          <Link
            href={`/write/${item.id}`}
            key={item.id}
            className="shadow-lg px-4 py-8"
          >
            <Image
              src={item.image}
              alt=""
              height={500}
              width={500}
              className="h-52 w-full"
            />
            <div className="py-5">
              <h2 className="md:text-xl font-bold">{item.title}</h2>
              <p className="line-clamp-2">{item.short_Desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WritePage;
