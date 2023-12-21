import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface UnPublishedPageParams {
  id: string;
  image: string;
  title: string;
}

async function getUnpublishedPost() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/admin/unpublished`, {
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
const UnPublishedPage = async () => {
  const data = await getUnpublishedPost();
  console.log(data);
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
