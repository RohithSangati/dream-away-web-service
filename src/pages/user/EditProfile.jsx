import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import InputField from "../../components/field/InputField";
import DateField from "../../components/field/DateField";
import CountrySelect from "../../components/field/CountrySelect.";
import DropDownField from "../../components/field/DropDownField";
import { Country, State, City } from "country-state-city";
import gender from "../../constants/gender";
import userService from "../../services/userService";
import { LoaderContext } from "../../context/LoaderContext";
import { AuthContext } from "../../context/AuthContext";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import ConfirmationAlert from "../../components/common/ConfirmationAlert";

const EditProfile = ({ setShowEditProfile, setUserInfo }) => {
  const [errorData, setErrorData] = useState({});
  const [formData, setFormData] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { setIsLoading } = useContext(LoaderContext);
  const { user, logout, updateUser } = useContext(AuthContext);

  const fetchEditProfileDetails = async () => {
    setIsLoading(true);
    try {
      const response = await userService.getEditProfileDetails(
        { userName: user?.userName },
        logout
      );
      loadSelectedStateAndCity(response.data);
      setFormData(response.data);
    } catch (err) {
      logger.error(
        "Something went wrong while fetching edit profile details :",
        err
      );
      showToast(false, "Something went wrong while fetching user details!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryChange = (country) => {
    setFormData({
      ...formData,
      country: country.name,
      state: undefined,
      city: undefined,
    });
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCities([]);
  };

  const handleStateChange = (state) => {
    setFormData({ ...formData, state: state.name, city: undefined });
    setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
  };

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      setErrorData({});
      await userService.updateProfileDetails(
        formData,
        setErrorData,
        setUserInfo,
        setShowEditProfile,
        setShowConfirmationModal,
        updateUser,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while fetching edit profile details :",
        err
      );
      showToast(false, "Something went wrong while updating user details!");
    } finally {
      setIsLoading(false);
    }
  };

  const closeForm = () => {
    setShowEditProfile(false);
  };

  const handleKeyPress = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeForm();
      }
    });
  };

  const loadSelectedStateAndCity = (selectedData) => {
    const countrySelected = countries.find(
      (country) => country.name === selectedData?.country
    );
    if (countrySelected) {
      const currStates = State.getStatesOfCountry(countrySelected.isoCode);
      setStates(currStates);
      const stateSelected = currStates.find(
        (state) => state.name === selectedData?.state
      );
      if (stateSelected) {
        setCities(
          City.getCitiesOfState(countrySelected.isoCode, stateSelected.isoCode)
        );
      }
    }
  };

  useEffect(() => {
    handleKeyPress();
    fetchEditProfileDetails();
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-white/40 z-10">
        <div className="flex flex-col min-h-screen w-[60%] bg-white side-pane fixed top-0 right-0 shadow-lg border-1 border-gray-100">
          <div className="flex items-center justify-between p-6 border-b-1 bg-white border-gray-200 shadow-xs text-gray-700 text-[18px] font-[500]">
            <div>Edit Profile</div>
            <RxCross2
              className="cursor-pointer hover:bg-gray-300 rounded-[50%] w-[25px] h-[25px] p-1"
              onClick={closeForm}
            />
          </div>
          <div className="flex-grow flex flex-col gap-13 px-6 py-8 max-h-[85vh] overflow-y-scroll">
            <div className="flex gap-10 flex-wrap">
              <InputField
                label={"First Name"}
                width={"500px"}
                name={"firstName"}
                value={formData?.firstName ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                error={errorData?.firstName}
              />
              <InputField
                label={"Last Name"}
                width={"500px"}
                name={"lastName"}
                value={formData?.lastName ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                error={errorData?.lastName}
              />
            </div>
            <div className="flex gap-10 flex-wrap">
              <InputField
                label={"Email"}
                width={"500px"}
                name={"userName"}
                value={formData?.userName ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                error={errorData?.userName}
                disabled={true}
              />
              <DateField
                label={"Date of Birth"}
                width={"500px"}
                value={formData.dateOfBirth}
                onChange={(newDate) =>
                  setFormData({ ...formData, dateOfBirth: newDate })
                }
                error={errorData?.dateOfBirth}
              />
            </div>
            <div className="flex gap-10 flex-wrap">
              <InputField
                label={"Bio"}
                width={"500px"}
                name={"bio"}
                value={formData?.bio ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: e.target.value,
                  })
                }
                error={errorData?.bio}
                multiline={true}
                rows={5}
              />
              <div className="flex flex-col gap-10">
                <DropDownField
                  label={"Gender"}
                  width={"500px"}
                  name={"gender"}
                  options={Object.entries(gender).map(([key, value]) => {
                    return { label: value, value: key };
                  })}
                  value={formData.gender ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  error={errorData?.gender}
                />
                <InputField
                  label={"Secondary Email"}
                  width={"500px"}
                  name={"secondaryEmail"}
                  value={formData?.secondaryEmail ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, secondaryEmail: e.target.value })
                  }
                  error={errorData?.secondaryEmail}
                />
              </div>
            </div>
            <div className="flex gap-10 flex-wrap">
              <CountrySelect
                label={"Mobile Country Code"}
                width={"500px"}
                name={"countryCode"}
                value={formData?.countryCode ?? ""}
                onChange={(phoneCode) => {
                  setFormData({ ...formData, countryCode: phoneCode });
                }}
                error={errorData?.countryCode}
              />
              <InputField
                label={"Mobile Number"}
                width={"500px"}
                name={"mobileNumber"}
                value={formData?.mobileNumber ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                error={errorData?.mobileNumber}
              />
            </div>
            <div className="flex gap-10 flex-wrap">
              <CountrySelect
                label={"Emergency Contact Country Code"}
                width={"500px"}
                name={"emergencyContactCountryCode"}
                value={formData?.emergencyContactCountryCode ?? ""}
                onChange={(phoneCode) => {
                  setFormData({
                    ...formData,
                    emergencyContactCountryCode: phoneCode,
                  });
                }}
                error={errorData?.emergencyContactCountryCode}
              />
              <InputField
                label={"Emergency Contact"}
                width={"500px"}
                name={"emergencyContactNumber"}
                value={formData?.emergencyContactNumber ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContactNumber: e.target.value,
                  })
                }
                error={errorData?.emergencyContactNumber}
              />
            </div>
            <div className="flex gap-10 flex-wrap">
              <DropDownField
                label={"Country"}
                width={"500px"}
                name={"country"}
                options={countries.map((country) => {
                  return { label: country.name, value: country.name };
                })}
                value={formData.country ?? ""}
                onChange={(e) =>
                  handleCountryChange(
                    countries.find((country) => country.name == e.target.value)
                  )
                }
                error={errorData?.country}
              />
              <DropDownField
                label={"State"}
                width={"500px"}
                name={"state"}
                options={states.map((state) => {
                  return { label: state.name, value: state.name };
                })}
                value={formData.state ?? ""}
                onChange={(e) =>
                  handleStateChange(
                    states.find((state) => state.name == e.target.value)
                  )
                }
                error={errorData?.state}
              />
            </div>
            <div className="flex gap-10 flex-wrap">
              <DropDownField
                label={"City"}
                width={"500px"}
                name={"city"}
                options={cities.map((city) => {
                  return { label: city.name, value: city.name };
                })}
                value={formData.city ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                error={errorData?.city}
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
                error={errorData?.postalCode}
              />
            </div>
            <div className="flex gap-10 flex-wrap">
              <InputField
                label={"Address Line 1"}
                width={"500px"}
                name={"address1"}
                value={formData?.address1 ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address1: e.target.value,
                  })
                }
                error={errorData?.address1}
              />
              <InputField
                label={"Address Line 2"}
                width={"500px"}
                name={"address2"}
                value={formData?.address2 ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address2: e.target.value,
                  })
                }
                error={errorData?.address2}
              />
            </div>
          </div>
          <div className="flex p-4 border-t-1 border-gray-300 shadow-md text-gray-700 text-[18px] font-[500] bg-white gap-4 justify-end items-center">
            <div
              className="btn-secondary cursor-pointer w-[100px] text-center"
              onClick={closeForm}
            >
              Cancel
            </div>
            <div
              className="btn-primary cursor-pointer w-[100px] text-center"
              onClick={() => setShowConfirmationModal(true)}
            >
              Update
            </div>
          </div>
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationAlert
          header={"Are you sure?"}
          confirmationMessage={"Saving will update your profile with the changes you've made. Please review them before confirming."}
          onConfirm={updateProfile}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </>
  );
};

export default EditProfile;
