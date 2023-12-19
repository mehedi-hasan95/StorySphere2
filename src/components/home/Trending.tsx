import { TrendingUp } from "lucide-react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

const Trending = () => {
  return (
    <div>
      <div className="max-w-6xl p-4 mx-auto">
        <div className="py-6 md:py-8 lg:py-10">
          <p className="flex items-center font-bold">
            <TrendingUp className="mr-2 h-6 w-6 border-black border rounded-full" />
            Trending on Medium
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-7">
            <div className="flex gap-5">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-200">
                O1
              </h2>
              <div>
                <div className="flex gap-3 items-center">
                  <Image
                    src=""
                    alt=""
                    height={500}
                    width={500}
                    className="w-6 h-6 rounded-full"
                  />
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger className="cursor-pointer">
                      Hover
                    </HoverCardTrigger>
                    <HoverCardContent>
                      The React Framework – created and maintained by @vercel.
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <h3 className="line-clamp-2 py-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quasi, sit?
                </h3>
                <div className="flex gap-4 text-xs">
                  <p>Dec 17</p>
                  <p>10 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Trending;
