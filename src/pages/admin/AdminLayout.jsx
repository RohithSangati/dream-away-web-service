import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="pl-2 h-full w-full flex justify-center gap-20">
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
