import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

const NavCard = ({ icon, title, description, to }) => {
  return (
    <NavLink
      className="!py-10 btn-normal h-[70px] border border-gray-200 rounded-[10px] flex items-center gap-4 justify-between"
      to={to}
    >
      <div className="flex gap-4 items-center justify-center">
        <div className="flex gap-4 items-center">
          {icon}
          <div className="flex flex-col gap-0.5 justify-center">
            <div className="font-[600] !text-[15px]">{title}</div>
            <div className="text-[12px]">{description}</div>
          </div>
        </div>
      </div>
      <IoIosArrowForward className="w-5 h-5" />
    </NavLink>
  );
};

export default NavCard;
