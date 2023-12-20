import UserMenu from "@/components/custom/UserMenu";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserMenu />
      {children}
    </div>
  );
}
