import { Outlet } from "react-router-dom";
import ProfileSideNavbar from "./ProfileSideNavbar";

const UserLayout = () => {
  return (
    <div className="pl-2 h-full w-full flex justify-center gap-20">
      <ProfileSideNavbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
