import { Outlet } from "react-router-dom";
import SupportNavbar from "./SupportNavbar";

const SupportLayout = () => {
  return (
    <div className="pl-2 h-full w-full flex justify-center gap-20">
      <SupportNavbar />
      <Outlet />
    </div>
  );
};

export default SupportLayout;
