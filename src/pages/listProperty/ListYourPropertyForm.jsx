import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import propertySteps from "../../constants/propertySteps";
import StepOne from "./StepOne";
import { LoaderContext } from "../../context/LoaderContext";
import hotelService from "../../services/hotelService";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import { AuthContext } from "../../context/AuthContext";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import amenities from "../../constants/ameneties";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import ErrorAlert from "../../components/common/ErrorAlert";
import { jsonToFormData } from "../../utils/commonUtil";
import roomTypes from "../../constants/roomTypes";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import ConfirmationAlert from "../../components/common/ConfirmationAlert";

const ListYourPropertyForm = ({
  setShowListYourPropertyForm,
  currentStep,
  setCurrentStep,
  hotelId,
  setHotelId,
}) => {
  const [completedSteps, setCompletedSteps] = useState({});
  const [currentInCompletedStep, setCurrentInCompletedStep] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});
  const { setIsLoading } = useContext(LoaderContext);
  const { user, logout } = useContext(AuthContext);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

  const submitStep = () => {
    setErrorData({});
    switch (currentStep) {
      case propertySteps.STEP_1:
        submitStepOne();
        break;
      case propertySteps.STEP_2:
        submitStepTwo();
        break;
      case propertySteps.STEP_3:
        submitStepThree();
        break;
      case propertySteps.STEP_4:
        submitStepFour();
        break;
      case propertySteps.STEP_5:
        submitStepFive();
        break;
      case propertySteps.STEP_6:
        submitStepSix();
        break;
      case propertySteps.STEP_7:
        setShowConfirmationAlert(true);
        break;
    }
  };

  const submitStepOne = async () => {
    setIsLoading(true);
    try {
      await hotelService.submitListPropertyStepOne(
        { ...formData, userName: user.userName, hotelId: hotelId },
        setCurrentStep,
        setFormData,
        setHotelId,
        completedSteps,
        setCompletedSteps,
        setErrorData,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while submitting Step 1 :", err);
      showToast(false, "Something went wrong while submitting Step 1");
    } finally {
      setIsLoading(false);
    }
  };

  const submitStepTwo = async () => {
    setIsLoading(true);
    try {
      await hotelService.submitListPropertyStepTwo(
        { ...formData, userName: user.userName, hotelId: hotelId },
        setCurrentStep,
        setFormData,
        setErrorData,
        completedSteps,
        setCompletedSteps,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while submitting Step 2 :", err);
      showToast(false, "Something went wrong while submitting Step 2");
    } finally {
      setIsLoading(false);
    }
  };

  const submitStepThree = async () => {
    let modifiedFormData = { ...formData };
    Object.values(amenities).forEach((amenityData) => {
      amenityData.forEach((amenity) => {
        modifiedFormData[amenity.field] =
          modifiedFormData[amenity.field] ?? false;
      });
    });
    setIsLoading(true);
    try {
      await hotelService.submitListPropertyStepThree(
        { ...modifiedFormData, userName: user.userName, hotelId: hotelId },
        setCurrentStep,
        setFormData,
        setErrorData,
        completedSteps,
        setCompletedSteps,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while submitting Step 3 :", err);
      showToast(false, "Something went wrong while submitting Step 3");
    } finally {
      setIsLoading(false);
    }
  };

  const submitStepFour = async () => {
    setIsLoading(true);
    const modifiedFormData = jsonToFormData({
      rooms: Object.values(formData),
      hotelId,
      userName: user.userName,
    });
    try {
      await hotelService.submitListPropertyStepFour(
        modifiedFormData,
        setCurrentStep,
        setFormData,
        setErrorData,
        completedSteps,
        setCompletedSteps,
        modifyErrorData,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while submitting Step 4 :", err);
      showToast(false, "Something went wrong while submitting Step 4");
    } finally {
      setIsLoading(false);
    }
  };

  const submitStepFive = async () => {
    setIsLoading(true);
    const isEdit = formData?.uploadedImages?.length > 0;
    const modifiedFormData = jsonToFormData({
      images: formData?.images,
      hotelId,
      userName: user.userName,
    });
    try {
      await hotelService.submitListPropertyStepFive(
        modifiedFormData,
        isEdit,
        setCurrentStep,
        setFormData,
        setErrorData,
        completedSteps,
        setCompletedSteps,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while submitting Step 5 :", err);
      showToast(false, "Something went wrong while submitting Step 5");
    } finally {
      setIsLoading(false);
    }
  };

  const submitStepSix = async () => {
    setIsLoading(true);
    let isEdit = false;
    if (formData?.policyDocumentObject) {
      delete formData?.policyDocumentObject;
      isEdit = true;
    }
    let modifiedFormData = {
      ...formData,
      userName: user.userName,
      hotelId,
    };
    modifiedFormData = isEdit
      ? modifiedFormData
      : jsonToFormData(modifiedFormData);
    try {
      await hotelService.submitListPropertyStepSix(
        modifiedFormData,
        isEdit,
        setCurrentStep,
        setFormData,
        setErrorData,
        completedSteps,
        setCompletedSteps,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while submitting Step 6 :", err);
      showToast(false, "Something went wrong while submitting Step 6");
    } finally {
      setIsLoading(false);
    }
  };

  const submitStepSeven = async () => {
    setShowConfirmationAlert(false);
    if (
      formData?.accountNumber &&
      formData?.accountNumber !== formData?.confirmAccountNumber
    ) {
      showToast(
        false,
        "Account Number and Confirm Account Number should be same."
      );
      return;
    }
    setIsLoading(true);
    try {
      delete formData?.confirmAccountNumber;
      await hotelService.submitListPropertyStepSeven(
        { ...formData, userName: user.userName, hotelId: hotelId },
        setCurrentStep,
        setFormData,
        setErrorData,
        closeForm,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while submitting Step 7 :", err);
      showToast(false, "Something went wrong while submitting Step 7");
    } finally {
      setIsLoading(false);
    }
  };

  const closeForm = () => {
    setCurrentStep(null);
    setCompletedSteps({});
    setShowListYourPropertyForm(false);
    setHotelId(null);
  };

  const handleKeyPress = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeForm();
      }
    });
  };

  const isCompleted = (step) => {
    return completedSteps[step] ?? false;
  };

  const modifyErrorData = (errors) => {
    let modifiedErrorData = {};
    Object.entries(errors).forEach(([key, value]) => {
      const index = key.substring(key.indexOf("[") + 1, key.indexOf("]"));
      let roomTypesArray = Object.keys(roomTypes);
      const type = roomTypesArray[index] ?? null;
      if (type) {
        modifiedErrorData[key] = (value + " - " + roomTypes[type]) ?? "";
      } else {
        modifiedErrorData[key] = value;
      }
    });
    return modifiedErrorData;
  };

  const fetchAndSetCompletedSteps = async () => {
    if (currentStep) return;
    setCurrentInCompletedStep(null);
    if (!hotelId) {
      setCurrentStep(propertySteps.STEP_1);
      setCompletedSteps({
        STEP_1: false,
        STEP_2: false,
        STEP_3: false,
        STEP_4: false,
        STEP_5: false,
        STEP_6: false,
        STEP_7: false,
      });
    } else {
      setIsLoading(true);
      try {
        await hotelService.fetchHotelStepNumber(
          { hotelId: hotelId },
          setCompletedSteps,
          setCurrentStep,
          logout
        );
      } catch (err) {
        logger.error(
          "Something went wrong while fetching steps information :",
          err
        );
        showToast(
          false,
          "Something went wrong while fetching steps information"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchAndSetFormData = async () => {
    if (hotelId == null || !completedSteps[currentStep]) {
      setFormData({});
      return;
    }
    setIsLoading(true);
    try {
      await hotelService.fetchFormData(
        { hotelId: hotelId },
        currentStep,
        setFormData,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while fetching Step data :", err);
      showToast(false, "Something went wrong while fetching Step data");
    } finally {
      setIsLoading(false);
    }
  };

  const findAndSetCurrentIncompletedStep = () => {
    for (let step in completedSteps) {
      if (!completedSteps[step]) {
        setCurrentInCompletedStep(step);
        return;
      }
    }
  };

  useEffect(() => {
    fetchAndSetCompletedSteps();
  }, [hotelId]);

  useEffect(() => {
    findAndSetCurrentIncompletedStep();
    fetchAndSetFormData();
    setErrorData({});
  }, [currentStep]);

  useEffect(() => {
    handleKeyPress();
  }, []);

  return (
    <div className="fixed inset-0 bg-white/40 z-2">
      <div className="flex flex-col z-10 min-h-screen w-[80%] bg-white side-pane fixed top-0 right-0 shadow-lg border-1 border-gray-100">
        <div className="flex items-center justify-between p-6 border-b-1 border-gray-200 shadow-xs text-gray-700 text-[18px] font-[500]">
          <div>Fill property details</div>
          <RxCross2
            className="cursor-pointer hover:bg-gray-300 rounded-[50%] w-[25px] h-[25px] p-1"
            onClick={closeForm}
          />
        </div>
        <div className="flex-grow flex flex-col items-center gap-4 px-6 py-8 max-h-[85vh] overflow-y-scroll">
          <div className="flex flex-row items-center gap-1.5 pb-5">
            {Array.from({ length: 7 }, (_, i) => {
              let isStepCompleted = isCompleted("STEP_" + (i + 1));
              return (
                <>
                  <div
                    key={"STEP_" + (i + 1)}
                    className={`border border-gray-300 px-5 py-3 rounded-full ${
                      isStepCompleted &&
                      "bg-primary/80 text-white cursor-pointer hover:bg-white hover:text-primary hover:border-0.5 hover:border-primary font-[600]"
                    } ${
                      ("STEP_" + (i + 1) == currentInCompletedStep ||
                        "STEP_" + (i + 1) == currentStep) &&
                      "border-0.5 border-primary !text-primary font-[700] cursor-pointer bg-white"
                    }`}
                    onClick={() => {
                      if (
                        !isStepCompleted &&
                        "STEP_" + (i + 1) != currentInCompletedStep
                      )
                        return;
                      setCurrentStep("STEP_" + (i + 1));
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < 6 && (
                    <div className="w-[100px] h-[2px] border-1 border-gray-200"></div>
                  )}
                </>
              );
            })}
          </div>
          <ErrorAlert errorData={errorData} width={"1050px"} />
          {currentStep == propertySteps.STEP_1 && (
            <StepOne formData={formData} setFormData={setFormData} />
          )}
          {currentStep == propertySteps.STEP_2 && (
            <StepTwo formData={formData} setFormData={setFormData} />
          )}
          {currentStep == propertySteps.STEP_3 && (
            <StepThree formData={formData} setFormData={setFormData} />
          )}
          {currentStep == propertySteps.STEP_4 && (
            <StepFour formData={formData} setFormData={setFormData} />
          )}
          {currentStep == propertySteps.STEP_5 && (
            <StepFive formData={formData} setFormData={setFormData} />
          )}
          {currentStep == propertySteps.STEP_6 && (
            <StepSix formData={formData} setFormData={setFormData} />
          )}
          {currentStep == propertySteps.STEP_7 && (
            <StepSeven formData={formData} setFormData={setFormData} />
          )}
        </div>
        <div className="flex p-4 border-t-1 border-gray-300 shadow-md text-gray-700 text-[18px] font-[500] bg-white gap-4 justify-end items-center">
          <div
            className="btn-secondary cursor-pointer w-[100px] text-center"
            onClick={closeForm}
          >
            Cancel
          </div>
          <div
            className="btn-primary cursor-pointer w-[180px] text-center"
            onClick={submitStep}
          >
            {currentStep == propertySteps.STEP_7 ? "Submit" : "Save & Continue"}
          </div>
        </div>
      </div>
      {showConfirmationAlert && (
        <ConfirmationAlert
          header={"Are you sure?"}
          confirmationMessage={
            "Saving will submit your property details and notify the admin for review."
          }
          onConfirm={submitStepSeven}
          onClose={() => setShowConfirmationAlert(false)}
        />
      )}
    </div>
  );
};

export default ListYourPropertyForm;
