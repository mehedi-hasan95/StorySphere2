"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface UnPublishedPageParams {
  id: string;
  image: string;
  title: string;
}

export const fetchCache = "force-no-store";
const UnPublishedPage = () => {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_API_URL}/admin/unpublished`
  );
  if (isLoading) return <div>loading...</div>;
  if (data?.status === 401) {
    <p>Unauthorize user</p>;
  }
  return (
    <div>
      <h2 className="md:text-xl font-bold pt-5">
        Unverified Posts ({data?.posts?.length})
      </h2>
      <Separator className={cn("my-5")} />
      <div className="grid md:grid-cols-2 gap-5">
        {data?.posts?.map((item: UnPublishedPageParams) => (
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
