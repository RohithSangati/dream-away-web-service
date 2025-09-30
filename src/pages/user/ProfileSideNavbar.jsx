import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import defaultProfile from "../../assets/images/default-profile.png";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { RiHotelLine } from "react-icons/ri";
import { FiCamera } from "react-icons/fi";
import EditProfilePicture from "./EditProfilePicture";
import NavCard from "../../components/common/NavCard";

const ProfileSideNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showEditProfile, setShowEditProfile] = useState(false);
  return (
    <>
      {showEditProfile && (
        <EditProfilePicture setShowEditProfile={setShowEditProfile} />
      )}
      <div className="flex flex-col w-[350px] gap-5 mt-3">
        <div className="flex flex-col items-center justify-center border border-gray-200 rounded-[10px] py-5">
          <img
            src={user.profilePicture ?? defaultProfile}
            alt="Profile Picture"
            className="w-[140px] h-[140px] object-cover rounded-full border border-gray-200"
          />
          <div className="text-primary flex items-center justify-center relative left-12.5 -top-12.5 bg-white rounded-[50%] w-[30px] h-[30px] p-1 border-1 border-gray-200">
            <FiCamera
              className="w-5 h-5 cursor-pointer"
              onClick={() => setShowEditProfile(true)}
            />
          </div>
          <div className="font-[600] text-[20px] color-primary">
            {user?.firstName}
          </div>
          <div className="text-[15px]">{user?.userName}</div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <NavCard
            title={"Profile"}
            description={"Provide your personal details and travel documents"}
            icon={<FaRegUser className="w-5 h-5" />}
            to={"/user/profile"}
          />
          <NavCard
            title={"My Bookings"}
            description={"Access, review, and manage your bookings anytime"}
            icon={<RiHotelLine className="w-5 h-5" />}
            to={"#"}
          />
          <NavCard
            title={"Settings"}
            description={"Easily manage your account settings and privacy"}
            icon={<IoSettingsOutline className="w-5 h-5" />}
            to={"/user/settings"}
          />
          <NavCard
            title={"My Reviews"}
            description={"Read reviews you have shared"}
            icon={<RiHotelLine className="w-5 h-5" />}
            to={"#"}
          />
          <div onClick={logout}>
            <NavCard
              title={"Logout"}
              description={"Sign out of your account"}
              icon={<HiOutlineLogout className="w-5 h-5" />}
              to={"#"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSideNavbar;
