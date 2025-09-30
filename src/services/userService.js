import apiRoutes from "../constants/apiRoutes";
import responseCode from "../constants/responseCode";
import { makeRequest } from "../utils/apiUtil";
import logger from "../utils/logger";
import { showToast } from "../utils/toastUtil";

const getUserDetails = async (payload, logout) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.USERS.GET_USER_DETAILS,
      options,
      null,
      true,
      logout
    );
  } catch (err) {
    logger.error("Get user details request failed:", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  return response;
};

const getEditProfileDetails = async (payload, logout) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.USERS.GET_EDIT_PROFILE_DETAILS,
      options,
      null,
      true,
      logout
    );
  } catch (err) {
    logger.error("Get user details request failed:", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  return response;
};

const updateProfileDetails = async (
  payload,
  setErrorData,
  setUserInfo,
  setShowEditProfile,
  setShowConfirmationModal,
  updateUser,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.USERS.UPDATE_PROFILE_DETAILS,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      setUserInfo(response.data);
      updateUser({ firstName: response.data.firstName });
      setShowEditProfile(false);
    }
  } catch (err) {
    logger.error("Update profile details request failed:", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  setShowConfirmationModal(false);
  showToast(response.success, response.message);
  return response;
};

const updateProfilePicture = async (
  payload,
  setErrorData,
  updateUser,
  setShowEditProfile,
  logout
) => {
  let response = null;
  try {
    let options = {
      method: "post",
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    };
    response = await makeRequest(
      apiRoutes.USERS.UPDATE_PROFILE_PICTURE,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      updateUser({ profilePicture: response?.data });
      setShowEditProfile(false);
    }
  } catch (err) {
    logger.error("Update profile picture request failed:", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  showToast(response.success, response.message);
  return response;
};

const updateNotificationSettings = async (payload,setShowConfirmationModal, logout) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.SETTINGS.UPDATE_NOTIFICATION_SETTINGS,
      options,
      null,
      true,
      logout
    );
    if(response.success){
      setShowConfirmationModal(false);
    }
  } catch (err) {
    logger.error("Update notification settings request failed:", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  showToast(response.success, response.message);
  return response;
};

const getNotificationSettings = async (payload, setFormData, logout) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.SETTINGS.GET_NOTIFICATION_SETTINGS,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setFormData(response?.data);
    }
  } catch (err) {
    logger.error("Get notification settings request failed:", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  if (!response.success) {
    showToast(false, response.message);
  }
  return response;
};

export default {
  getUserDetails,
  getEditProfileDetails,
  updateProfileDetails,
  updateProfilePicture,
  updateNotificationSettings,
  getNotificationSettings,
};
