import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../context/LoaderContext";
import userService from "../../services/userService";
import logger from "../../utils/logger";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../../utils/toastUtil";
import { TbEdit } from "react-icons/tb";
import EditProfile from "./EditProfile";
import gender from "../../constants/gender";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const { user, logout } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoaderContext);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await userService.getUserDetails(
        { userName: user?.userName },
        logout
      );
      setUserInfo(response.data);
    } catch (err) {
      logger.error("Something went wrong while fetching user details :", err);
      showToast(false, "Something went wrong while fetching user details!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="mt-3 py-3 w-[900px] flex border border-gray-200 rounded-[10px]">
      <div className="flex flex-col flex-grow min-w-full">
        <div className="flex justify-between items-center pb-8 pt-4 px-10">
          <div className="flex flex-col">
            <div className="text-gray-700 text-[20px] font-[600]">
              Your Profile Details
            </div>
            <div className="text-[13px]">
              Manage your personal details with ease
            </div>
          </div>
          <TbEdit
            className="w-5 h-5 cursor-pointer text-primary"
            onClick={() => setShowEditProfile(true)}
          />
        </div>
        <div className="flex gap-10 px-10 py-5.5">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              First Name
            </div>
            <div className="text-[14px]">
              {userInfo?.firstName ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Last Name
            </div>
            <div className="text-[14px]">
              {userInfo?.lastName ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-10 py-5.5">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Email
            </div>
            <div className="text-[14px]">
              {userInfo?.userName ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Date of Birth
            </div>
            <div className="text-[14px]">
              {userInfo?.dateOfBirth ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-10 py-5.5">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Secondary Email
            </div>
            <div className="text-[14px]">
              {userInfo?.secondaryEmail ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Gender
            </div>
            <div className="text-[14px]">
              {gender[userInfo?.gender] ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-10 py-5.5">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Mobile Number
            </div>
            <div className="text-[14px]">
              {userInfo?.mobileNumber ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Emergency Contact
            </div>
            <div className="text-[14px]">
              {userInfo?.emergencyContactNumber ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-10 py-5.5">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Country
            </div>
            <div className="text-[14px]">
              {userInfo?.country ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              State
            </div>
            <div className="text-[14px]">
              {userInfo?.state ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-10 py-5.5">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              City
            </div>
            <div className="text-[14px]">
              {userInfo?.city ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Postal Code
            </div>
            <div className="text-[14px]">
              {userInfo?.postalCode ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-10 py-5.5">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-700 font-[600]">
              Address
            </div>
            <div className="text-[14px]">
              {userInfo?.address ?? "Not Provided"}
            </div>
          </div>
        </div>
      </div>
      {showEditProfile && (
        <EditProfile
          setShowEditProfile={setShowEditProfile}
          setUserInfo={setUserInfo}
        />
      )}
    </div>
  );
};

export default Profile;
