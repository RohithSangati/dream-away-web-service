import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import adminService from "../../services/adminService";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import { AuthContext } from "../../context/AuthContext";
import { LoaderContext } from "../../context/LoaderContext";
import hotelStarRatings from "../../constants/hotelStarRatings";
import propertyTypes from "../../constants/propertyTypes";
import amenities from "../../constants/ameneties";
import { TiTick } from "react-icons/ti";
import { LiaCloudDownloadAltSolid } from "react-icons/lia";
import checkInTime from "../../constants/checkInTime";
import checkOutTime from "../../constants/checkOutTime";
import cancellationPolicies from "../../constants/cancellationPolicies";
import ImageViewer from "../../components/common/ImageViewer";
import roomTypes from "../../constants/roomTypes";
import bedTypes from "../../constants/bedTypes";

const ViewProperty = ({
  setIsViewPropertyOpen,
  currentSelectedHotel,
  setCurrentSelectedHotel,
}) => {
  const [propertyData, setPropertyData] = useState({});
  const { logout } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoaderContext);
  const [images, setImages] = useState([]);

  const fetchViewPropertyDetails = async () => {
    if (currentSelectedHotel == null) return;
    setIsLoading(true);
    try {
      await adminService.fetchViewPropertyDetails(
        { hotelId: currentSelectedHotel },
        setPropertyData,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while fetching property details :",
        err
      );
      showToast(false, "Something went wrong while fetching property details");
    } finally {
      setIsLoading(false);
    }
  };

  const setImagesForViewer = (images) => {
    const ImageUrls = images.map((image) => image?.fileUrl);
    setImages(ImageUrls);
  };

  const closeForm = () => {
    setIsViewPropertyOpen(false);
    setCurrentSelectedHotel(null);
  };

  const handleKeyPress = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeForm();
      }
    });
  };

  useEffect(() => {
    handleKeyPress();
  }, []);

  useEffect(() => {
    fetchViewPropertyDetails();
  }, [currentSelectedHotel]);

  return (
    <div className="fixed inset-0 bg-white/40 z-2">
      <div className="flex flex-col z-10 min-h-screen w-[70%] bg-white side-pane fixed top-0 right-0 shadow-lg border-1 border-gray-100 max-h-[85vh] overflow-y-scroll">
        <div className="flex items-center justify-between p-6 border-b-1 border-gray-200 shadow-xs text-gray-700 text-[18px] font-[500]">
          <div>View property details</div>
          <RxCross2
            className="cursor-pointer hover:bg-gray-300 rounded-[50%] w-[25px] h-[25px] p-1"
            onClick={closeForm}
          />
        </div>
        <div className="px-10 pt-6 flex">
          <div className="font-bold text-[16px] text-gray-700">
            Basic Information
          </div>
        </div>
        <div className="flex gap-10 px-15 py-3">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Property Name
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.name ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Property Type
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.propertyType
                ? propertyTypes[propertyData?.propertyType].type
                : "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Hotel Rating
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.rating
                ? hotelStarRatings[propertyData?.rating]
                : "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-15 py-3">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Mobile Number
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.mobileNumber ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">City</div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.city ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Postal Code
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.postalCode ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex gap-10 px-15 py-3">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">Address</div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.address ?? "Not Provided"}
            </div>
          </div>
        </div>
        <div className="mx-10 pt-6 flex">
          <div className="font-bold text-[16px] text-gray-700">Amenities</div>
        </div>
        <div className="flex flex-col gap-5 px-15 py-3">
          {Object.entries(amenities).map(([key, value], index) => {
            return (
              <div className="flex flex-col gap-1" key={index}>
                <div className="text-[13px] text-gray-600 font-[600]">
                  {key}
                </div>
                <div className="flex flex-wrap gap-2">
                  {value.map((item, index) => (
                    <div className="flex items-center justify-center">
                      <div className="text-[13px]" key={index}>
                        {item.name}
                      </div>
                      {propertyData?.amenities && (
                        <div>
                          {propertyData?.amenities[item.field] ? (
                            <TiTick className="text-green-500 w-[20px] h-[20px]" />
                          ) : (
                            <RxCross2 className="text-red-500 w-[18px] h-[18px]" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-10 pt-6 flex">
          <div className="font-bold text-[16px] text-gray-700">
            Rooms Information
          </div>
        </div>
        {propertyData?.roomData &&
          Object.entries(propertyData.roomData).map(([key, room], index) => {
            return (
              <div key={index} className="mx-10 py-3 flex flex-col gap-5">
                <div className="text-[15px] text-gray-600 font-[600] italic">
                  {roomTypes[key]} Room
                </div>
                <div className="flex gap-10 pl-5">
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Room Name
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.name ?? "Not Provided"}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Room Count
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.count ?? "Not Provided"}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Bed Type
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.bedType ? bedTypes[room?.bedType] : "Not Provided"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 pl-5">
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Room Description
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.description ?? "Not Provided"}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Is Extra bed Providing?
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {(room?.isExtraBedProviding == true ? "Yes" : "No") ??
                        "Not Provided"}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Price
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.price ?? "Not Provided"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 pl-5">
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Maximum Adults
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.maximumAdults ?? "Not Provided"}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Maximum Children
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.maximumChildren ?? "Not Provided"}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="text-[13px] text-gray-600 font-[600]">
                      Maximum Occupancy
                    </div>
                    <div className="text-[14px] truncate w-[350px]">
                      {room?.maximumOccupancy ?? "Not Provided"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 pl-5">
                  <div className="text-[13px] text-gray-600 font-[600]">
                    View Room Images
                  </div>
                  <div>-</div>
                  <div
                    className="btn-secondary !px-1 !py-0.5 !text-[12px] "
                    onClick={() => setImagesForViewer(room?.uploadedImages)}
                  >
                    View Images
                  </div>
                </div>
              </div>
            );
          })}
        <div className="mx-10 pt-6 flex">
          <div className="font-bold text-[16px] text-gray-700">Pictures</div>
        </div>
        <div className="px-15 py-6 flex gap-5 items-center">
          <div className="text-[13px] text-gray-600 font-[600]">
            Property Images
          </div>
          <div>-</div>
          <div
            className="btn-secondary !px-1 !py-0.5 !text-[12px]"
            onClick={() => setImagesForViewer(propertyData?.uploadedImages)}
          >
            View Images
          </div>
        </div>
        <div className="mx-10 pt-6 flex">
          <div className="font-bold text-[16px] text-gray-700">
            Policy Details
          </div>
        </div>
        <div className="flex gap-10 px-15 py-3">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              CheckIn Time
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {checkInTime.find(
                (item) => item.key === propertyData?.checkInTime
              )?.value ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              CheckOut Time
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {checkOutTime.find(
                (item) => item.key === propertyData?.checkOutTime
              )?.value ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Cancellation Policy
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.cancellationPolicy
                ? cancellationPolicies[propertyData.cancellationPolicy]
                : "Not Provided"}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-3 mx-15 pt-3">
          <div className="text-[13px] text-gray-600 font-[600]">
            Policy Document
          </div>
          {propertyData?.policyDocumentObject && (
            <div className="flex items-center justify-center w-fit gap-2 text-[15px] font-[600] border-1 border-gray-300 py-1 px-4 rounded-[4px]">
              <div>{propertyData?.policyDocumentObject?.fileName}</div>
              <a
                href={propertyData?.policyDocumentObject?.fileUrl}
                className="cursor-pointer hover:bg-gray-200 p-0.5 rounded-full"
              >
                <LiaCloudDownloadAltSolid className=" w-[25px] h-[25px]" />
              </a>
            </div>
          )}
        </div>
        <div className="mx-10 pt-6 flex">
          <div className="font-bold text-[16px] text-gray-700">
            Bank Details
          </div>
        </div>
        <div className="flex gap-10 px-15 py-3 mb-8">
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Account Number
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.accountNumber ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              IFSC Code
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.ifscCode ?? "Not Provided"}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="text-[13px] text-gray-600 font-[600]">
              Bank Name
            </div>
            <div className="text-[14px] truncate w-[350px]">
              {propertyData?.bankName ?? "Not Provided"}
            </div>
          </div>
        </div>
      </div>
      {images.length > 0 && (
        <ImageViewer images={images} closeViewer={() => setImages([])} />
      )}
    </div>
  );
};

export default ViewProperty;
