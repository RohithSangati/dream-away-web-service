import apiRoutes from "../constants/apiRoutes";
import responseCode from "../constants/responseCode";
import { makeRequest } from "../utils/apiUtil";
import logger from "../utils/logger";
import { showToast } from "../utils/toastUtil";

const getPendingPropertyRequests = async (
  payload,
  setData,
  setTotalRows,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.ADMIN.GET_PENDING_PROPERTY_REQUESTS,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setData(response?.data?.properties);
      setTotalRows(response?.data?.totalPendingProperties);
    }
  } catch (err) {
    logger.error(
      "Something went wrong while fetching pending properties :",
      err
    );
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

const approveOrRejectRequest = async (
  payload,
  closeAlert,
  setReloadTable,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.ADMIN.APPROVE_OR_REJECT_REQUEST,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setReloadTable((prev) => !prev);
    }
  } catch (err) {
    logger.error("Something went wrong while approving or rejecting :", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  closeAlert();
  showToast(response.success, response.message);
  return response;
};

const fetchViewPropertyDetails = async (payload, setPropertyData, logout) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.ADMIN.FETCH_VIEW_PROPERTY_DETAILS,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setPropertyData(response?.data);
    }
  } catch (err) {
    logger.error(
      "Something went wrong while fetching property details :",
      err
    );
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
  getPendingPropertyRequests,
  approveOrRejectRequest,
  fetchViewPropertyDetails,
};
