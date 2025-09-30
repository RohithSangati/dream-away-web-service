import {makeRequest} from "../utils/apiUtil";
import apiRoutes from "../constants/apiRoutes";
import responseCode from "../constants/responseCode";
import logger from "../utils/logger";
import { showToast } from "../utils/toastUtil";

const sendContactMessageRequest = async (payload, setErrorData, closeForm) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.SUPPORT.CONTACT,
      options,
      setErrorData
    );
    if (response.success) {
      closeForm();
    }
  } catch (err) {
    logger.error("Send contact message request failed:", err);
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

export default { sendContactMessageRequest };
