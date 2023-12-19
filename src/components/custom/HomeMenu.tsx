"use client";

import Link from "next/link";
// ScrollingMenu.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const HomeMenu: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`menu ${
        scrolling ? "scrolled bg-yourNewColor" : "bg-transparent"
      } fixed top-0 w-full z-50`}
    >
      <div className="flex justify-between max-w-6xl px-4 mx-auto items-center">
        <Link
          href="/"
          className="text-lg md:text-xl lg:text-2xl font-bold py-4 md:py-7"
        >
          StorySphere
        </Link>
        <div className="flex gap-5 items-center">
          <Link href="#">Our Story</Link>
          <Link href="#">Membership</Link>
          <Link href="#">Write</Link>
          <Link href="#">Sign In</Link>
          <Button>Get Started</Button>
        </div>
      </div>
      <Separator className={cn("bg-black")} />
    </div>
  );
};

export default HomeMenu;
