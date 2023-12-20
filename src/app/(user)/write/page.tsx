import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WritePage = () => {
  return (
    <div className="max-w-6xl p-4 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl font-bold">Your Blog ()</h2>
        <Button asChild>
          <Link href="/write/new">
            <Edit className="mr-2 h-4 w-4" />
            New
          </Link>
        </Button>
      </div>
      <Separator className={cn("my-3")} />
      {/* Grid functionality */}
      <div className="">
        <div className="">
          <Image src="" alt="" height={500} width={500} className="h-10 w-10" />
          <h2 className="md:text-xl font-bold">Title</h2>
          <p>Short Desc</p>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
