import { useContext, useEffect } from "react";
import UploadFileField from "../../components/field/UploadFileField";
import { AuthContext } from "../../context/AuthContext";
import { LoaderContext } from "../../context/LoaderContext";
import logger from "../../utils/logger";
import { useState } from "react";
import { showToast } from "../../utils/toastUtil";
import userService from "../../services/userService";

const EditProfilePicture = ({ setShowEditProfile }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const { user, logout, updateUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoaderContext);
  const [errorData, setErrorData] = useState({});

  const updateProfilePicture = async () => {
    if (!profilePicture) {
      showToast(false, "Please upload a profile picture to proceed.");
      return;
    }
    setIsLoading(true);
    try {
      setErrorData({});
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("profilePicture", profilePicture);
      await userService.updateProfilePicture(
        formData,
        setErrorData,
        updateUser,
        setShowEditProfile,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while updating profile picture  :",
        err
      );
      showToast(false, "Something went wrong while updating profile picture!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setShowEditProfile(false);
      }
    });
  };

  useEffect(() => {
    handleKeyPress();
  }, []);

  return (
    <div className="fixed inset-0 bg-white/70 z-10">
      <div className="fixed w-[500px] h-fit top-[18%] left-[38%] inset-0 z-10 shadow-lg border-1 border-gray-100 bg-white rounded-md flex flex-col gap-2 px-2 py-2">
        <div className="flex items-center justify-center py-1 px-1 border-b-1 border-gray-200 text-gray-700">
          <div className="text-[17px] px-2 font-[600] text-center">
            Update Profile Picture
          </div>
        </div>
        <div>
          <UploadFileField
            label={"Upload Profile Picture"}
            width={"300px"}
            onChange={(file) => {
              setProfilePicture(file);
            }}
            accept=".jpg,.jpeg,.png"
            supportedFormatText={
              "Supported formats: .jpg, .jpeg, .png and Max allowed size: 10MB"
            }
            infoText={
              "Upload a clear photo of yourself so others can easily recognize you."
            }
            error={errorData.profilePicture}
          />
        </div>
        <div className="flex justify-end mt-3 gap-2">
          <div
            className="!text-[15px] btn-secondary"
            onClick={() => setShowEditProfile(false)}
          >
            Cancel
          </div>
          <div
            className="!text-[15px] btn-primary"
            onClick={updateProfilePicture}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePicture;
