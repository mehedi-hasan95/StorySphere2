import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <div className="bg-[#FFC017]">
      <div className="max-w-6xl px-4 mx-auto py-10 md:py-16 lg:py-20">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium">
          Stay curious.
        </h2>
        <p className="max-w-md text-lg py-4 font-medium">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Button className={cn("text-lg font-medium rounded-full px-10 mt-10")}>
          Start reading
        </Button>
      </div>
      <Separator className={cn("bg-black")} />
    </div>
  );
};

export default Hero;
