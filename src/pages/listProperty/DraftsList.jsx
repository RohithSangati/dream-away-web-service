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

const DraftsList = ({
  setShowDrafts,
  setHotelId,
  setShowListYourPropertyForm,
}) => {
  const { setIsLoading } = useContext(LoaderContext);
  const { user, logout } = useContext(AuthContext);
  const [propertyDrafts, setPropertyDrafts] = useState([]);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [currentSelectedDraftId, setCurrentSelectedDraftId] = useState(null);

  const fetchPropertyDrafts = async () => {
    setIsLoading(true);
    try {
      await hotelService.fetchPropertyDrafts(
        { userName: user?.userName },
        setPropertyDrafts,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while fetching drafts :", err);
      showToast(false, "Something went wrong while fetching user drafts!");
    } finally {
      setIsLoading(false);
    }
  };

  const openPropertyForm = (draftHotelId) => {
    setHotelId(draftHotelId);
    setShowDrafts(false);
    setShowListYourPropertyForm(true);
  };

  const deleteDraft = async () => {
    setIsLoading(true);
    try {
      await hotelService.deleteDraft(
        { hotelId: currentSelectedDraftId },
        setCurrentSelectedDraftId,
        setShowConfirmationAlert,
        logout
      );
      fetchPropertyDrafts();
    } catch (err) {
      logger.error("Something went wrong while deleting draft :", err);
      showToast(false, "Something went wrong while deleting draft!");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowDrafts(false);
  };

  const handleKeyPress = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  };

  useEffect(() => {
    fetchPropertyDrafts();
    handleKeyPress();
  }, []);

  return (
    <div className="fixed inset-0 bg-white/40 z-2">
      <div className="flex flex-col z-10 min-h-screen w-[28%] bg-white side-pane fixed top-0 right-0 shadow-lg border-1 border-gray-100">
        <div className="flex items-center justify-between p-6 border-b-1 border-gray-200 shadow-xs text-gray-700 text-[18px] font-[500]">
          <div>Your Drafts</div>
          <RxCross2
            className="cursor-pointer hover:bg-gray-300 rounded-[50%] w-[25px] h-[25px] p-1"
            onClick={closeModal}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow gap-4 max-h-[90vh] overflow-y-scroll">
          {propertyDrafts.length > 0 &&
            propertyDrafts.map((draft, index) => (
              <div className="px-3 py-1 flex items-center justify-between border-1 border-gray-200 hover:border-gray-300 rounded-[4px]">
                <div key={index}>
                  <div className="text-[13px] pl-1 font-[600] text-gray-600">
                    {draft.name ?? "Untitled"}
                  </div>
                  <div className="text-[12px]">
                    ( Last saved : {draft.lastSaved} )
                  </div>
                </div>
                <div className="flex gap-2">
                  <TbEdit
                    className="w-7 h-7 cursor-pointer text-primary hover:bg-gray-200 rounded-full p-1"
                    onClick={() => {
                      setCurrentSelectedDraftId(draft.id);
                      openPropertyForm(draft.id);
                    }}
                  />
                  <HiOutlineTrash
                    className="w-7 h-7 cursor-pointer text-primary hover:bg-gray-200 rounded-full p-1"
                    onClick={() => {
                      setCurrentSelectedDraftId(draft.id);
                      setShowConfirmationAlert(true);
                    }}
                  />
                </div>
              </div>
            ))}
          {propertyDrafts.length === 0 && (
            <div className="text-[16px] italic text-gray-600 text-center pt-70">
              No drafts found!
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
          onConfirm={deleteDraft}
        />
      )}
    </div>
  );
};
export default DraftsList;
