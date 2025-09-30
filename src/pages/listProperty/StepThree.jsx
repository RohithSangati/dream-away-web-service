import { IoIosArrowForward } from "react-icons/io";
import CheckboxField from "../../components/field/CheckboxField";
import amenities from "../../constants/ameneties";
import { useState } from "react";

const StepThree = ({ formData, setFormData }) => {
  const [currentSelectedAmenity, setCurrentSelectedAmenity] =
    useState("Basic Services");

  return (
    <div className="flex flex-col gap-5 w-[65%]">
      <div className="text-[18px] font-[600] text-gray-800 text-center">
        Select Property Amenities
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          {Object.entries(amenities).map(([amenity], index) => {
            return (
              <div
                key={index}
                className="!py-5 btn-normal h-[10px] w-[280px] border border-gray-200 rounded-[10px] flex items-center justify-between"
                onClick={() => setCurrentSelectedAmenity(amenity)}
              >
                <div className="font-[600] !text-[15px]">{amenity}</div>
                <IoIosArrowForward className="w-5 h-5" />
              </div>
            );
          })}
        </div>
        {Object.entries(amenities).map(([amenity, amenityData], amenityIndex) => {
          return (
            <div
              key={amenityIndex}
              className="flex flex-col flex-grow  border py-2 px-4 border-gray-200 rounded-[10px]"
              hidden={amenity !== currentSelectedAmenity}
            >
              {amenityData.map((amenity, index) => {
                return (
                  <CheckboxField
                    key={index}
                    label={amenity.name}
                    value={formData[amenity.field] ?? false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [amenity.field]: e.target.checked,
                      })
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepThree;
