import { MdPendingActions } from "react-icons/md";
import NavCard from "../../components/common/NavCard";

const AdminNavbar = () => {
  return (
    <>
      <div className="flex flex-col w-[350px] gap-5 mt-3">
        <div className="flex flex-col justify-center gap-2">
          <div className="text-[15px] border border-gray-200 rounded-[10px] px-4 py-8">
            <div className="font-[600]">
              Manage users, bookings, and system settings all in one place.{" "}
            </div>
            <div className="text-[13px]">
              Explore the tools below to take control instantly.
            </div>
          </div>
          <NavCard
            title="Pending Requests"
            description={"Approve or reject listings that are awaiting review."}
            icon={<MdPendingActions className="w-5 h-5" />}
            to={"/admin/property-requests"}
          />
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
