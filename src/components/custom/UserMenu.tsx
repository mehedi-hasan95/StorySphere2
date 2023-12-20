import Link from "next/link";
import Logo from "./Logo";
import UserSettings from "./UserSettings";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import getCurrentUser from "@/actions/getCurrentUser";

const UserMenu = async () => {
  const data = await getCurrentUser();
  return (
    <div>
      <div className="flex justify-between max-w-6xl px-4 mx-auto items-center py-3">
        <Logo />
        <div className="flex gap-5 items-center">
          <Link href="#">Our Story</Link>
          <Link href="#">Membership</Link>
          {data?.id ? (
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

export default UserMenu;
