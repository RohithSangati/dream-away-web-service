import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { LoaderContext } from "../../context/LoaderContext";
import { AuthContext } from "../../context/AuthContext";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import hotelService from "../../services/hotelService";
import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";
import ConfirmationAlert from "../../components/common/ConfirmationAlert";

const PendingPropertiesList = ({
  setShowPendingListings,
  setHotelId,
  setShowListYourPropertyForm,
}) => {
  const { setIsLoading } = useContext(LoaderContext);
  const { user, logout } = useContext(AuthContext);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [
    currentSelectedPendingPropertyId,
    setCurrentSelectedPendingPropertyId,
  ] = useState(null);

  const fetchPendingProperties = async () => {
    setIsLoading(true);
    try {
      await hotelService.fetchPendingProperties(
        { userName: user?.userName },
        setPendingProperties,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while fetching pending properties :",
        err
      );
      showToast(
        false,
        "Something went wrong while fetching user pending properties!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openPropertyForm = (pendingHotelId) => {
    setHotelId(pendingHotelId);
    setShowPendingListings(false);
    setShowListYourPropertyForm(true);
  };

  const deletePendingProperty = async () => {
    setIsLoading(true);
    try {
      await hotelService.deletePendingProperty(
        { hotelId: currentSelectedPendingPropertyId },
        setCurrentSelectedPendingPropertyId,
        setShowConfirmationAlert,
        logout
      );
      fetchPendingProperties();
    } catch (err) {
      logger.error(
        "Something went wrong while deleting pending property :",
        err
      );
      showToast(false, "Something went wrong while deleting pending property!");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowPendingListings(false);
  };

  const handleKeyPress = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  };

  useEffect(() => {
    fetchPendingProperties();
    handleKeyPress();
  }, []);

  return (
    <div className="fixed inset-0 bg-white/40 z-2">
      <div className="flex flex-col z-10 min-h-screen w-[28%] bg-white side-pane fixed top-0 right-0 shadow-lg border-1 border-gray-100">
        <div className="flex items-center justify-between p-6 border-b-1 border-gray-200 shadow-xs text-gray-700 text-[18px] font-[500]">
          <div>Your Pending Property Requests</div>
          <RxCross2
            className="cursor-pointer hover:bg-gray-300 rounded-[50%] w-[25px] h-[25px] p-1"
            onClick={closeModal}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow gap-4 max-h-[90vh] overflow-y-scroll">
          {pendingProperties.length > 0 &&
            pendingProperties.map((pendingProperty, index) => (
              <div className="px-3 py-1 flex items-center justify-between border-1 border-gray-200 hover:border-gray-300 rounded-[4px]">
                <div key={index}>
                  <div className="text-[13px] pl-1 font-[600] text-gray-600">
                    {pendingProperty.name ?? "Untitled"}
                  </div>
                  <div className="text-[12px]">
                    ( Last saved : {pendingProperty.lastSaved} )
                  </div>
                </div>
                <div className="flex gap-2">
                  <TbEdit
                    className="w-7 h-7 cursor-pointer text-primary hover:bg-gray-200 rounded-full p-1"
                    onClick={() => {
                      setCurrentSelectedPendingPropertyId(pendingProperty.id);
                      openPropertyForm(pendingProperty.id);
                    }}
                  />
                  <HiOutlineTrash
                    className="w-7 h-7 cursor-pointer text-primary hover:bg-gray-200 rounded-full p-1"
                    onClick={() => {
                      setCurrentSelectedPendingPropertyId(pendingProperty.id);
                      setShowConfirmationAlert(true);
                    }}
                  />
                </div>
              </div>
            ))}
          {pendingProperties.length === 0 && (
            <div className="text-[16px] italic text-gray-600 text-center pt-70">
              No pending properties found!
            </div>
          )}
        </div>
      </div>
      {showConfirmationAlert && (
        <ConfirmationAlert
          header={"Are you sure?"}
          confirmationMessage={
            "This action cannot be reversed. Please confirm to proceed."
          }
          onClose={() => setShowConfirmationAlert(false)}
          onConfirm={deletePendingProperty}
        />
      )}
    </div>
  );
};
export default PendingPropertiesList;
