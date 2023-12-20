import getCurrentUser from "@/actions/getCurrentUser";
import UserMenu from "@/components/custom/UserMenu";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    redirect("/");
  }
  return (
    <div>
      <UserMenu />
      {children}
    </div>
  );
}
