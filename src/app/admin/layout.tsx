import getCurrentUser from "@/actions/getCurrentUser";
import AdminMenu from "@/components/custom/AdminMenu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <AdminMenu />
      <Separator className={cn("bg-black")} />
      <div className="max-w-6xl mx-auto p-4 md:flex gap-10">
        <div className="w-1/3 flex flex-col gap-4">
          <Button variant={"outline"} className={cn("w-full")} asChild>
            <Link href="/admin/user">User</Link>
          </Button>
          <Button variant={"outline"} className={cn("w-full")} asChild>
            <Link href="/admin/unpublished">Unpublished Post</Link>
          </Button>
        </div>
        <div className="w-2/3">{children}</div>
      </div>
    </div>
  );
}
