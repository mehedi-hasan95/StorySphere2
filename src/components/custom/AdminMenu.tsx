import Logo from "./Logo";
import UserSettings from "./UserSettings";

const AdminMenu = () => {
  return (
    <div className="max-w-6xl px-4 flex justify-between items-center mx-auto py-3">
      <Logo />
      <UserSettings />
    </div>
  );
};

export default AdminMenu;
