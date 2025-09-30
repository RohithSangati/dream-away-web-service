import apiRoutes from "../constants/apiRoutes";
import responseCode from "../constants/responseCode";
import { makeRequest } from "../utils/apiUtil";
import logger from "../utils/logger";
import { showToast } from "../utils/toastUtil";

const signUp = async (formData, setErrorData, navigate) => {
  let response = null;
  try {
    let options = { method: "post", data: formData };
    response = await makeRequest(apiRoutes.USERS.SIGNUP, options, setErrorData);
    if (response.success) {
      navigate("/auth/login");
    }
  } catch (err) {
    logger.error("Sign up request failed:", err);
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

const login = async (formData, setErrorData, login, location, navigate) => {
  let response = null;
  try {
    let options = { method: "post", data: formData };
    response = await makeRequest(apiRoutes.USERS.LOGIN, options, setErrorData);
    if (response.success) {
      login(response.data.token ?? null, response.data.userDetails ?? null);
      const from = location.state?.from?.pathname || "/";
      setTimeout(() => navigate(from, { replace: true }), 2);
    }
  } catch (err) {
    logger.error("Login request failed:", err);
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

const sendOtp = async (formData, setErrorData, setIsOtpSent, setFormData) => {
  let response = null;
  try {
    let options = { method: "post", data: formData };
    response = await makeRequest(
      apiRoutes.USERS.SEND_RESET_PASSWORD_OTP,
      options,
      setErrorData
    );
    if (response.success) {
      setIsOtpSent(true);
      setFormData({});
    }
  } catch (err) {
    logger.error("Send otp request failed:", err);
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

const verifyOtp = async (
  formData,
  setErrorData,
  setIsOtpEntered,
  setFormData
) => {
  let response = null;
  try {
    let options = { method: "post", data: formData };
    response = await makeRequest(
      apiRoutes.USERS.VERIFY_RESET_PASSWORD_OTP,
      options,
      setErrorData
    );
    if (response.success) {
      setIsOtpEntered(true);
      setFormData({ verificationToken: response.data });
    }
  } catch (err) {
    logger.error("Verify otp request failed:", err);
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

const resetPasswordAfterVerification = async (
  formData,
  setErrorData,
  navigate
) => {
  let response = null;
  try {
    let options = { method: "post", data: formData };
    response = await makeRequest(
      apiRoutes.USERS.RESET_PASSWORD_AFTER_VERIFICATION,
      options,
      setErrorData
    );
    if (response.success) {
      navigate("/auth/login");
    }
  } catch (err) {
    logger.error("Reset password request failed:", err);
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

export default {
  signUp,
  login,
  sendOtp,
  verifyOtp,
  resetPasswordAfterVerification,
};
