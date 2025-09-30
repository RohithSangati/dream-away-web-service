import { useContext, useEffect, useState } from "react";
import CheckboxField from "../../components/field/CheckboxField";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import userService from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import { LoaderContext } from "../../context/LoaderContext";
import ConfirmationAlert from "../../components/common/ConfirmationAlert";

const Settings = () => {
  const [formData, setFormData] = useState({});
  const { setIsLoading } = useContext(LoaderContext);
  const { user, logout } = useContext(AuthContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const updateNotificationSettings = async () => {
    setIsLoading(true);
    try {
      await userService.updateNotificationSettings(
        { ...formData, userName: user.userName },
        setShowConfirmationModal,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while updating notification settings",
        err
      );
      showToast(
        false,
        "Something went wrong while updating notification settings"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getNotificationSettings = async () => {
    setIsLoading(true);
    try {
      await userService.getNotificationSettings(
        { userName: user.userName },
        setFormData,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while fetching notification settings",
        err
      );
      showToast(
        false,
        "Something went wrong while fetching notification settings"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotificationSettings();
  }, []);

  return (
    <>
      <div className="mt-3 py-3 w-[900px] flex border border-gray-200 rounded-[10px]">
        <div className="flex flex-col flex-grow min-w-full">
          <div className="flex justify-between items-center pb-8 pt-4 px-10">
            <div className="flex flex-col">
              <div className="text-gray-700 text-[20px] font-[600]">
                Your Settings
              </div>
              <div className="text-[13px]">
                Customize and manage your preferences easily
              </div>
            </div>
            <div
              className="btn-primary flex gap-2 items-center justify-center"
              onClick={() => setShowConfirmationModal(true)}
            >
              <div>Update</div>
            </div>
          </div>
          <div className="flex gap-10 px-10">
            <div className="w-[50%]">
              <CheckboxField
                label={"Enable Email Notifications"}
                value={formData.emailNotificationsEnabled ?? false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailNotificationsEnabled: e.target.checked,
                  })
                }
              />
            </div>
            <div className="w-[50%]">
              <CheckboxField
                label={"Enable Sms Notifications"}
                value={formData.smsNotificationsEnabled ?? false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smsNotificationsEnabled: e.target.checked,
                  })
                }
              />
            </div>
          </div>
          <div className="flex gap-10 px-10">
            <div className="w-[50%]">
              <CheckboxField
                label={"Enable WhatsApp Notifications"}
                value={formData.whatsAppNotificationsEnabled ?? false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whatsAppNotificationsEnabled: e.target.checked,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationAlert
          header={"Are you sure?"}
          confirmationMessage={
            "Updating will save your new preferences. Please review them before confirming."
          }
          onConfirm={updateNotificationSettings}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </>
  );
};

export default Settings;
