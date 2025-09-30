// src/constants/apiRoutes.js
const API_BASE_URL =
  import.meta.env.VITE_DREAM_AWAY_API_BASE_URL || "http://localhost:8080";

const apiRoutes = {
  USERS: {
    SIGNUP: `${API_BASE_URL}/users/signup`,
    LOGIN: `${API_BASE_URL}/users/login`,
    SEND_RESET_PASSWORD_OTP: `${API_BASE_URL}/users/sendResetPasswordOtp`,
    VERIFY_RESET_PASSWORD_OTP: `${API_BASE_URL}/users/verifyResetPasswordOtp`,
    RESET_PASSWORD_AFTER_VERIFICATION: `${API_BASE_URL}/users/resetPasswordAfterVerification`,
    GET_USER_DETAILS: `${API_BASE_URL}/users/getUserDetails`,
    GET_EDIT_PROFILE_DETAILS: `${API_BASE_URL}/users/getEditProfileDetails`,
    UPDATE_PROFILE_DETAILS: `${API_BASE_URL}/users/updateProfileDetails`,
    UPDATE_PROFILE_PICTURE: `${API_BASE_URL}/users/updateProfilePicture`,
  },
  REFERENCE_DETAILS: {
    COUNTRIES: `${API_BASE_URL}/reference-data/countries`,
  },
  SUPPORT: {
    CONTACT: `${API_BASE_URL}/support/contact`,
  },
  SETTINGS: {
    UPDATE_NOTIFICATION_SETTINGS: `${API_BASE_URL}/settings/updateNotificationSettings`,
    GET_NOTIFICATION_SETTINGS: `${API_BASE_URL}/settings/getNotificationSettings`,
  },
  HOTEL: {
    FETCH_PROPERTY_DRAFTS: `${API_BASE_URL}/hotel/fetchPropertyDrafts`,
    FETCH_PENDING_PROPERTIES: `${API_BASE_URL}/hotel/fetchPendingProperties`,
    FETCH_DRAFT_AND_PENDING_PROPERTIES_COUNT: `${API_BASE_URL}/hotel/fetchDraftAndPendingPropertiesCount`,
    DELETE_DRAFT: `${API_BASE_URL}/hotel/deleteDraft`,
    DELETE_PENDING_PROPERTY: `${API_BASE_URL}/hotel/deletePendingProperty`,
    GET_STEP_ONE_DATA: `${API_BASE_URL}/hotel/getStepOneData`,
    GET_STEP_TWO_DATA: `${API_BASE_URL}/hotel/getStepTwoData`,
    GET_STEP_THREE_DATA: `${API_BASE_URL}/hotel/getStepThreeData`,
    GET_STEP_FOUR_DATA: `${API_BASE_URL}/hotel/getStepFourData`,
    GET_STEP_SIX_DATA: `${API_BASE_URL}/hotel/getStepSixData`,
    GET_STEP_SEVEN_DATA: `${API_BASE_URL}/hotel/getStepSevenData`,
    GET_STEP_FIVE_DATA: `${API_BASE_URL}/hotel/getStepFiveData`,
    FETCH_STEP_NUMBER: `${API_BASE_URL}/hotel/fetchHotelStepNumber`,
    SUBMIT_LIST_PROPERTY_STEP_ONE: `${API_BASE_URL}/hotel/submitListPropertyStepOne`,
    SUBMIT_LIST_PROPERTY_STEP_TWO: `${API_BASE_URL}/hotel/submitListPropertyStepTwo`,
    SUBMIT_LIST_PROPERTY_STEP_THREE: `${API_BASE_URL}/hotel/submitListPropertyStepThree`,
    SUBMIT_LIST_PROPERTY_STEP_FOUR: `${API_BASE_URL}/hotel/submitListPropertyStepFour`,
    SUBMIT_LIST_PROPERTY_STEP_FIVE: `${API_BASE_URL}/hotel/submitListPropertyStepFive`,
    SUBMIT_LIST_PROPERTY_STEP_SIX: `${API_BASE_URL}/hotel/submitListPropertyStepSix`,
    SUBMIT_LIST_PROPERTY_STEP_SIX_UPDATE: `${API_BASE_URL}/hotel/submitListPropertyStepSixUpdate`,
    SUBMIT_LIST_PROPERTY_STEP_SEVEN: `${API_BASE_URL}/hotel/submitListPropertyStepSeven`,
  },
  ADMIN: {
    GET_PENDING_PROPERTY_REQUESTS: `${API_BASE_URL}/admin/getPendingPropertyRequests`,
    APPROVE_OR_REJECT_REQUEST: `${API_BASE_URL}/admin/approveOrRejectRequest`,
    FETCH_VIEW_PROPERTY_DETAILS: `${API_BASE_URL}/admin/fetchViewPropertyDetails`,
  },
};

export default apiRoutes;
