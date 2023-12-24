import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface UnPublishedPageParams {
  id: string;
  image: string;
  title: string;
}

const UnPublishedPage = async () => {
  const data = await prismadb.posts.findMany({
    where: {
      verifide: false,
    },
  });
  return (
    <div>
      <h2 className="md:text-xl font-bold pt-5">
        Unverified Posts ({data?.length})
      </h2>
      <Separator className={cn("my-5")} />
      <div className="grid md:grid-cols-2 gap-5">
        {data?.map((item: UnPublishedPageParams) => (
          <Link href={`/admin/unpublished/${item.id}`} key={item.id}>
            <Image
              src={item.image}
              alt=""
              height={500}
              width={500}
              className=""
            />
            <h2 className="md:text-lg font-bold">{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UnPublishedPage;
