import { useState } from "react";
import roomTypes from "../../constants/roomTypes";
import RoomForm from "./RoomForm";
import { IoIosArrowForward } from "react-icons/io";

const StepFour = ({ formData, setFormData }) => {
  const [currentSelectedRoomType, setCurrentSelectedRoomType] =
    useState("DELUXE");
  const [addRoomFor, setAddRoomFor] = useState(null);
  return (
    <div className="flex-grow flex flex-col gap-13">
      <div className="text-[18px] text-center font-[600] text-gray-800">
        Set Up Room Details
      </div>
      <div className="flex flex-row justify-between items-center gap-10 w-[100%]">
        <div className="w-[10%] flex flex-col gap-2">
          {Object.entries(roomTypes).map(([roomTypeKey, label], index) => {
            return (
              <div
                key={index}
                className="!py-5 btn-normal h-[10px] w-[280px] border border-gray-200 rounded-[10px] flex items-center justify-between"
                onClick={() => {
                  setCurrentSelectedRoomType(roomTypeKey);
                  setAddRoomFor(null);
                }}
              >
                <div className="font-[600] !text-[15px]">{label}</div>
                <IoIosArrowForward className="w-5 h-5" />
              </div>
            );
          })}
        </div>
        <div>
          {!formData[currentSelectedRoomType] &&
            currentSelectedRoomType !== addRoomFor && (
              <div className="flex flex-col items-center min-h-[500px] justify-center gap-2 w-[900px] border border-gray-200 rounded-[10px]">
                <div className="flex gap-1">
                  <span>Room type</span>
                  <div className="font-[600]">
                    {roomTypes[currentSelectedRoomType]}
                  </div>
                  <span>is not yet configured.</span>
                </div>

                <div
                  className="btn-primary"
                  onClick={() => setAddRoomFor(currentSelectedRoomType)}
                >
                  Add Room
                </div>
              </div>
            )}
          {(formData[currentSelectedRoomType] ||
            currentSelectedRoomType === addRoomFor) && (
            <RoomForm
              key={currentSelectedRoomType}
              formData={formData}
              setFormData={setFormData}
              setAddRoomFor={setAddRoomFor}
              roomType={currentSelectedRoomType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFour;
