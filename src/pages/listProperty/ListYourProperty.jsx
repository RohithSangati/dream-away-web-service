import { useContext, useEffect, useState } from "react";
import listYourPropertyBg from "../../assets/images/list-your-property-bg.jpg";
import listProperties from "../../constants/listPropertySteps";
import ListYourPropertyForm from "./ListYourPropertyForm";
import DraftsList from "./DraftsList";
import propertySteps from "../../constants/propertySteps";
import PendingPropertiesList from "./PendingPropertiesList";
import { AuthContext } from "../../context/AuthContext";
import { LoaderContext } from "../../context/LoaderContext";
import logger from "../../utils/logger";
import hotelService from "../../services/hotelService";
import { showToast } from "../../utils/toastUtil";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";

const ListYourProperty = () => {
  const [showListYourPropertyForm, setShowListYourPropertyForm] =
    useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [showPendingListings, setShowPendingListings] = useState(false);
  const [currentStep, setCurrentStep] = useState(propertySteps.STEP_1);
  const [hotelId, setHotelId] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoaderContext);
  const [draftAndPendingPropertiesCount, setDraftAndPendingPropertiesCount] =
    useState({ drafts: 0, pendingApproval: 0 });

  const fetchAndSetDraftsAndPendingPropertiesCount = async () => {
    setIsLoading(true);
    try {
      await hotelService.fetchDraftAndPendingPropertiesCount(
        { userName: user?.userName },
        setDraftAndPendingPropertiesCount,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while fetching drafts and pending approval count :",
        err
      );
      showToast(
        false,
        "Something went wrong while fetching drafts and pending approval count"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetDraftsAndPendingPropertiesCount();
  }, [showDrafts, showPendingListings, showListYourPropertyForm]);

  return (
    <div className="mt-3 pt-3 pb-10 w-full flex border border-gray-200 rounded-[10px] ml-2">
      <div className="flex flex-col flex-grow min-w-full">
        <div className="flex justify-between items-center pb-8 pt-4 px-10">
          <div>
            <div className="flex flex-col">
              <div className="text-gray-700 text-[20px] font-[600]">
                Turn Your Hotel In to an Opportunity
              </div>
              <div className="text-[13px]">
                List your property, attract guests, and grow your business.
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div
              className="btn-primary flex gap-2 items-center justify-center"
              onClick={() => setShowListYourPropertyForm(true)}
            >
              List your property
            </div>
          </div>
        </div>
        <div
          className="w-[100%] h-[350px]"
          style={{
            backgroundImage: `url(${listYourPropertyBg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-white/50 font-[600] h-[100%] flex items-center justify-center !text-[30px] text-center">
            All you have to do
          </div>
        </div>
        <div className="flex flex-wrap gap-10 items-center justify-center -mt-20 pb-10">
          {listProperties.map((step, index) => {
            return (
              <div
                key={`step-${index}`}
                className="w-[28%] flex flex-col items-center"
              >
                <div className="rounded-full border max-w-fit py-1 px-3 border-gray-300 bg-white shadow-lg text-center w-[100px] -mb-4 z-1">
                  {index + 1}
                </div>
                <div className="bg-white border w-[100%] h-[100px] border-gray-300 rounded-[10px] shadow-md flex flex-col items-center px-2 gap-1.5 pt-6">
                  <div className="font-[600] !text-[15px]">{step.stepName}</div>
                  <div className="text-[13px] text-center">
                    {step.stepDetails}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-5 p-10">
          <div className="text-gray-700 text-[20px] font-[600]">
            Continue from where you left off
          </div>
          <div className="flex flex-wrap gap-10 pl-10 pt-5">
            <div className="py-3 px-4 w-[350px] border-1 border-gray-300 rounded-[10px] flex flex-col items-center gap-1 justify-center">
              <div className="flex items-center justify-center gap-2 text-[16px] font-[600]">
                <RiDraftLine className="w-[19px] h-[19px]" />
                <div>Draft Listings</div>
              </div>
              <div className="text-[13px]">
                ({draftAndPendingPropertiesCount.drafts}{" "}
                {draftAndPendingPropertiesCount.drafts == 1
                  ? "property"
                  : "properties"}{" "}
                in Drafts)
              </div>
              <div
                className="hover:border-gray-300 hover:shadow-sm py-1.5 px-4 rounded-[4px] cursor-pointer border-1 border-gray-200 text-[15px] font-[600] mt-2"
                onClick={() => setShowDrafts(true)}
              >
                View & Manage
              </div>
            </div>
            <div className="py-3 px-4 w-[350px] border-1 border-gray-300 rounded-[10px] flex flex-col items-center gap-1 justify-center">
              <div className="flex items-center justify-center gap-2 text-[16px] font-[600]">
                <MdOutlinePendingActions className="w-[19px] h-[19px]" />
                <div>Pending Approval</div>
              </div>
              <div className="text-[13px]">
                ({draftAndPendingPropertiesCount.pendingApproval}{" "}
                {draftAndPendingPropertiesCount.pendingApproval == 1
                  ? "property"
                  : "properties"}{" "}
                in Pending)
              </div>
              <div
                className="hover:border-gray-300 hover:shadow-sm py-1.5 px-4 rounded-[4px] cursor-pointer border-1 border-gray-200 text-[15px] font-[600] mt-2"
                onClick={() => setShowPendingListings(true)}
              >
                View & Manage
              </div>
            </div>
          </div>
        </div>
      </div>
      {showListYourPropertyForm && (
        <ListYourPropertyForm
          setShowListYourPropertyForm={setShowListYourPropertyForm}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          hotelId={hotelId}
          setHotelId={setHotelId}
        />
      )}
      {showDrafts && (
        <DraftsList
          setShowDrafts={setShowDrafts}
          setShowListYourPropertyForm={setShowListYourPropertyForm}
          setHotelId={setHotelId}
        />
      )}
      {showPendingListings && (
        <PendingPropertiesList
          setShowPendingListings={setShowPendingListings}
          setShowListYourPropertyForm={setShowListYourPropertyForm}
          setHotelId={setHotelId}
        />
      )}
    </div>
  );
};

export default ListYourProperty;
