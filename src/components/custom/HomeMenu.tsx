"use client";

import Link from "next/link";

// ScrollingMenu.tsx
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import UserSettings from "./UserSettings";
import Logo from "./Logo";
import { useSession } from "next-auth/react";

const HomeMenu: React.FC = () => {
  const { data } = useSession();
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
      <div className="flex justify-between max-w-6xl px-4 mx-auto items-center py-3">
        <Logo />
        <div className="flex gap-5 items-center">
          <Link href="#">Our Story</Link>
          <Link href="#">Membership</Link>
          {data?.user.id ? (
            <Link href="/write">Write</Link>
          ) : (
            <Link href="/signin">Write</Link>
          )}
          <UserSettings />
        </div>
      </div>
      <Separator className={cn("bg-black")} />
    </div>
  );
};

export default HomeMenu;
