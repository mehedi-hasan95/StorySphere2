import HomeMenu from "@/components/custom/HomeMenu";
import Hero from "@/components/home/Hero";
import Trending from "@/components/home/Trending";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeMenu />
      <Hero />
      <div className="max-w-6xl p-4 mx-auto">
        <Trending />
      </div>
    </div>
  );
}
