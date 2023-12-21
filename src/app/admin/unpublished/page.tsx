import Image from "next/image";
import Link from "next/link";

interface UnPublishedPageParams {
  id: string;
  image: string;
  title: string;
}

async function getUnpublishedPost() {
  try {
    const res = await fetch(`/api/admin/unpublished`, {
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
      <div>Unverified Posts ({data?.posts?.length})</div>
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
