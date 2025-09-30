import RadioField from "../../components/field/RadioField";
import propertyTypes from "../../constants/propertyTypes";

const StepOne = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[18px] font-[600] text-gray-800 pb-5">
        Select Your Property Type
      </div>
      <div className="flex flex-wrap items-center justify-center gap-20 py-5 px-30">
        {Object.entries(propertyTypes).map(([type, propertyType]) => {
          return (
            <div
              key={type}
              className={`flex flex-col w-[250px] border border-gray-300 rounded-lg overflow-hidden ${
                formData.propertyType === propertyType.type ? "shadow-md" : ""
              }`}
            >
              <div className="w-full h-[100px] overflow-hidden">
                <img
                  src={propertyType.image}
                  alt="Hotel"
                  className="w-full h-full object-cover transition-transform duration-200"
                />
              </div>
              <div className="p-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-[15px] text-gray-800 font-semibold">
                    {propertyType.type}
                  </div>
                  <RadioField
                    value={type}
                    name="propertyType"
                    onChange={() =>
                      setFormData({
                        ...formData,
                        propertyType: type,
                      })
                    }
                    checked={formData.propertyType === type}
                  />
                </div>
                <div className="text-[12px] text-gray-600">
                  {propertyType.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepOne;
