import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";

const Blog = () => {
  return (
    <div className="flex justify-between gap-10 items-center">
      <div className="w-2/3">
        <div className="flex gap-2 items-center">
          <Image
            src=""
            alt=""
            height={500}
            width={500}
            className="w-7 h-7 rounded-md"
          />
          <HoverCard>
            <HoverCardTrigger>Author Name</HoverCardTrigger>
            <HoverCardContent>
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
          </HoverCard>
        </div>
        <h2 className="md:text-xl font-bold line-clamp-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatibus, repudiandae!
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <p>Dec 12</p>
            <p>9 min read</p>
            <Badge variant="outline">Badge</Badge>
          </div>
          <Bookmark size={20} />
        </div>
      </div>
      <div className="w-1/3">
        <Image src="" alt="" height={500} width={500} />
      </div>
    </div>
  );
};

export default Blog;
