import apiRoutes from "../constants/apiRoutes";
import propertySteps from "../constants/propertySteps";
import responseCode from "../constants/responseCode";
import { makeRequest } from "../utils/apiUtil";
import logger from "../utils/logger";
import { showToast } from "../utils/toastUtil";

const submitListPropertyStepOne = async (
  payload,
  setCurrentStep,
  setFormData,
  setHotelId,
  completedSteps,
  setCompletedSteps,
  setErrorData,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_ONE,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      setCurrentStep(propertySteps.STEP_2);
      setCompletedSteps({ ...completedSteps, STEP_1: true });
      setHotelId(response.data ?? null);
      setFormData({});
    }
  } catch (err) {
    logger.error("Submit list property step 1 request failed:", err);
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

const submitListPropertyStepTwo = async (
  payload,
  setCurrentStep,
  setFormData,
  setErrorData,
  completedSteps,
  setCompletedSteps,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_TWO,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      setCurrentStep(propertySteps.STEP_3);
      setCompletedSteps({ ...completedSteps, STEP_2: true });
      setFormData({});
    }
  } catch (err) {
    logger.error("Submit list property step 2 request failed:", err);
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

const submitListPropertyStepThree = async (
  payload,
  setCurrentStep,
  setFormData,
  setErrorData,
  completedSteps,
  setCompletedSteps,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_THREE,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      setCurrentStep(propertySteps.STEP_4);
      setCompletedSteps({ ...completedSteps, STEP_3: true });
      setFormData({});
    }
  } catch (err) {
    logger.error("Submit list property step 3 request failed:", err);
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

const submitListPropertyStepFour = async (
  payload,
  setCurrentStep,
  setFormData,
  setErrorData,
  completedSteps,
  setCompletedSteps,
  modifyErrorData,
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
      apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_FOUR,
      options,
      setErrorData,
      true,
      logout,
      modifyErrorData
    );
    if (response.success) {
      setCurrentStep(propertySteps.STEP_5);
      setCompletedSteps({ ...completedSteps, STEP_4: true });
      setFormData({});
    }
  } catch (err) {
    logger.error("Submit list property step 4 request failed:", err);
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

const submitListPropertyStepFive = async (
  payload,
  isEdit,
  setCurrentStep,
  setFormData,
  setErrorData,
  completedSteps,
  setCompletedSteps,
  logout
) => {
  if (isEdit) {
    setCurrentStep(propertySteps.STEP_6);
    setCompletedSteps({ ...completedSteps, STEP_5: true });
    setFormData({});
    showToast(true, "Successfully saved Step 5");
    return;
  }
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_FIVE,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      setCurrentStep(propertySteps.STEP_6);
      setCompletedSteps({ ...completedSteps, STEP_5: true });
      setFormData({});
    }
  } catch (err) {
    logger.error("Submit list property step 5 request failed:", err);
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

const submitListPropertyStepSix = async (
  payload,
  isEdit,
  setCurrentStep,
  setFormData,
  setErrorData,
  completedSteps,
  setCompletedSteps,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      isEdit
        ? apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_SIX_UPDATE
        : apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_SIX,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      setCurrentStep(propertySteps.STEP_7);
      setCompletedSteps({ ...completedSteps, STEP_6: true });
      setFormData({});
    }
  } catch (err) {
    logger.error("Submit list property step 6 request failed:", err);
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

const submitListPropertyStepSeven = async (
  payload,
  setCurrentStep,
  setFormData,
  setErrorData,
  closeForm,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.SUBMIT_LIST_PROPERTY_STEP_SEVEN,
      options,
      setErrorData,
      true,
      logout
    );
    if (response.success) {
      closeForm();
      setCurrentStep(null);
      setFormData({});
    }
  } catch (err) {
    logger.error("Submit list property step 7 request failed:", err);
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

const fetchPropertyDrafts = async (payload, setPropertyDrafts, logout) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.FETCH_PROPERTY_DRAFTS,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setPropertyDrafts(response.data ?? []);
    }
  } catch (err) {
    logger.error("Something went wrong while fetching drafts :", err);
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
    showToast(response.success, response.message);
  }
  return response;
};

const fetchPendingProperties = async (
  payload,
  setPendingProperties,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.FETCH_PENDING_PROPERTIES,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setPendingProperties(response.data ?? []);
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
    showToast(response.success, response.message);
  }
  return response;
};

const fetchDraftAndPendingPropertiesCount = async (
  payload,
  setDraftAndPendingPropertiesCount,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.FETCH_DRAFT_AND_PENDING_PROPERTIES_COUNT,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setDraftAndPendingPropertiesCount(
        response.data ?? { drafts: 0, pendingApproval: 0 }
      );
    }
  } catch (err) {
    logger.error(
      "Something went wrong while fetching drafts and pending approval count  :",
      err
    );
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
    showToast(response.success, response.message);
  }
  return response;
};

const deleteDraft = async (
  payload,
  setCurrentSelectedDraftId,
  setShowConfirmationAlert,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.DELETE_DRAFT,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setCurrentSelectedDraftId(null);
      setShowConfirmationAlert(false);
    }
  } catch (err) {
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
    logger.error("Something went wrong while deleting draft :", err);
  }
  showToast(response.success, response.message);
  return response;
};

const deletePendingProperty = async (
  payload,
  setCurrentSelectedPendingPropertyId,
  setShowConfirmationAlert,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.DELETE_PENDING_PROPERTY,
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      setCurrentSelectedPendingPropertyId(null);
      setShowConfirmationAlert(false);
    }
  } catch (err) {
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
    logger.error("Something went wrong while deleting pending property :", err);
  }
  showToast(response.success, response.message);
  return response;
};

const fetchHotelStepNumber = async (
  payload,
  setCompletedSteps,
  setCurrentStep,
  logout
) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      apiRoutes.HOTEL.FETCH_STEP_NUMBER,
      options,
      null,
      true,
      logout
    );
    if (response.success && response.data) {
      const completedSteps = {};
      let isCompleted = true;
      Object.entries(propertySteps).map(([key, value]) => {
        completedSteps[key] = isCompleted;
        if (response.data == value) {
          isCompleted = false;
        }
      });
      setCompletedSteps(completedSteps);
      setCurrentStep(propertySteps.STEP_1);
    }
  } catch (err) {
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
    logger.error("Something went wrong while fetching step number :", err);
    showToast(response.success, response.message);
  }
  return response;
};

const getUrlByStepNumber = (step) => {
  switch (step) {
    case propertySteps.STEP_1:
      return apiRoutes.HOTEL.GET_STEP_ONE_DATA;
    case propertySteps.STEP_2:
      return apiRoutes.HOTEL.GET_STEP_TWO_DATA;
    case propertySteps.STEP_3:
      return apiRoutes.HOTEL.GET_STEP_THREE_DATA;
    case propertySteps.STEP_4:
      return apiRoutes.HOTEL.GET_STEP_FOUR_DATA;
    case propertySteps.STEP_5:
      return apiRoutes.HOTEL.GET_STEP_FIVE_DATA;
    case propertySteps.STEP_6:
      return apiRoutes.HOTEL.GET_STEP_SIX_DATA;
    case propertySteps.STEP_7:
      return apiRoutes.HOTEL.GET_STEP_SEVEN_DATA;
    default:
      return apiRoutes.HOTEL.GET_STEP_ONE_DATA;
  }
};

const urlToBlob = async (url, filename, type) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: type });
};

const getModifiedStepFourData = async (data) => {
  for (const [key, value] of Object.entries(data)) {
    const images = await Promise.all(
      value?.uploadedImages.map((image) =>
        urlToBlob(image.fileUrl, image.fileName, image.type)
      )
    );
    data[key].images = images;
    delete data[key].uploadedImages;
  }
  return data;
};

const fetchFormData = async (payload, currentStep, setFormData, logout) => {
  let response = null;
  try {
    let options = { method: "post", data: payload };
    response = await makeRequest(
      getUrlByStepNumber(currentStep),
      options,
      null,
      true,
      logout
    );
    if (response.success) {
      if (currentStep == propertySteps.STEP_4) {
        setFormData(await getModifiedStepFourData(response.data));
      } else {
        setFormData(response.data);
      }
    }
  } catch (err) {
    response = {
      success: false,
      message: err.response.data.message || err.message,
      code: err.response.data.code || responseCode.SOMETHING_WENT_WRONG,
      data: err.response.data.data || null,
    };
    logger.error("Something went wrong while fetching step data :", err);
    showToast(response.success, response.message);
  }
  return response;
};

export default {
  fetchPropertyDrafts,
  fetchPendingProperties,
  fetchDraftAndPendingPropertiesCount,
  submitListPropertyStepOne,
  submitListPropertyStepTwo,
  submitListPropertyStepThree,
  submitListPropertyStepFour,
  submitListPropertyStepFive,
  submitListPropertyStepSix,
  submitListPropertyStepSeven,
  deleteDraft,
  deletePendingProperty,
  fetchHotelStepNumber,
  fetchFormData,
};
