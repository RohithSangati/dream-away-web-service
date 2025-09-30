import CountrySelect from "../../components/field/CountrySelect.";
import DropDownField from "../../components/field/DropDownField";
import InputField from "../../components/field/InputField";
import hotelStarRatings from "../../constants/hotelStarRatings";

const StepTwo = ({ formData, setFormData }) => {
  return (
    <div className="flex-grow flex flex-col">
      <div className="text-[18px] font-[600] text-gray-800 text-center">
        Enter Your Property Details
      </div>
      <div className="flex gap-10 pt-10 flex-wrap">
        <InputField
          label={"Property Name"}
          width={"500px"}
          name={"name"}
          value={formData?.name ?? ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <DropDownField
          label={"Star Rating"}
          width={"500px"}
          name={"rating"}
          options={Object.entries(hotelStarRatings).map(([key, value]) => {
            return { label: value, value: key };
          })}
          value={formData?.rating ?? ""}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        />
      </div>
      <div className="flex gap-10 pt-10 flex-wrap">
        <CountrySelect
          label={"Mobile Country Code"}
          width={"500px"}
          name={"countryCode"}
          value={formData?.countryCode ?? ""}
          onChange={(phoneCode) => {
            setFormData({ ...formData, countryCode: phoneCode });
          }}
        />
        <InputField
          label={"Mobile Number"}
          width={"500px"}
          name={"mobileNumber"}
          value={formData?.mobileNumber ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, mobileNumber: e.target.value })
          }
        />
      </div>
      <div className="flex gap-10 pt-10 flex-wrap">
        <InputField
          label={"City"}
          width={"500px"}
          name={"city"}
          value={formData?.city ?? ""}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <InputField
          label={"Postal Code"}
          width={"500px"}
          name={"postalCode"}
          value={formData?.postalCode ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              postalCode: e.target.value,
            })
          }
        />
      </div>
      <div className="flex gap-10 pt-10 flex-wrap">
        <InputField
          label={"Full Address"}
          width={"500px"}
          name={"address"}
          value={formData?.address ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default StepTwo;
