"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const UserSettings = () => {
  const { data: session } = useSession();
  console.log(session?.user.image);
  return (
    <>
      {session?.user.id ? (
        <Popover>
          <PopoverTrigger>
            <Avatar>
              {session?.user?.image === "" ? (
                <AvatarImage src="https://github.com/shadcn.png" />
              ) : (
                <AvatarImage src={session?.user?.image as string} />
              )}
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className={cn("flex gap-y-5 flex-col")}>
            {session.user.role === "admin" && (
              <Button asChild>
                <Link href="/admin">Admin</Link>
              </Button>
            )}
            <Button onClick={() => signOut()}>Sign out</Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </>
  );
};

export default UserSettings;
