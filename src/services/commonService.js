import apiRoutes from "../constants/apiRoutes";
import { makeRequest } from "../utils/apiUtil";

const getCountries = async (logout) => {
  let response = null;
  try {
    let options = { method: "get" };
    response = await makeRequest(
      apiRoutes.REFERENCE_DETAILS.COUNTRIES,
      options,
      null,
      true,
      logout
    );
  } catch (err) {
    logger.error("Get country list request failed:", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
  }
  return response;
};

export default { getCountries };
