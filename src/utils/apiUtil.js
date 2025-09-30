import axios from "axios";
import responseCode from "../constants/responseCode";
import logger from "./logger";

const makeRequest = async (
  url,
  options,
  setErrorData = null,
  includeJwt = false,
  logout = null,
  modifyErrorData=null
) => {
  let result = null;
  try {
    if (includeJwt) {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
    const response = await axios({ url, ...options });
    result = response.data;
  } catch (err) {
    if (includeJwt && err?.response?.status == 401) {
      logout(false);
    }
    logger.error("API request failed:", err);
    result = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
    if (
      setErrorData &&
      !result.success &&
      result.code == responseCode.VALIDATION_FAILED
    ) {
      let errors = {};
      for (let error of result.data) {
        errors[error.field] = error.message;
      }
      if(modifyErrorData){
        errors = modifyErrorData(errors);
      }
      setErrorData(errors);
    }
  }
  return result;
};

export { makeRequest };
