import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import InputField from "../../components/field/InputField";
import { useContext, useState } from "react";
import CheckboxField from "../../components/field/CheckboxField";
import authenticationService from "../../services/authenticationService";
import { LoaderContext } from "../..//context/LoaderContext";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import PasswordField from "../../components/field/PasswordField";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});
  const [allowSignUp, setAllowSignUp] = useState(false);
  const { setIsLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  const signUp = async () => {
    setErrorData({});
    if (!allowSignUp) {
      showToast(false, "Please agree to the Terms and Conditions to proceed");
      return;
    }
    setIsLoading(true);
    try {
      await authenticationService.signUp(
        formData,
        setErrorData,
        navigate
      );
    } catch (err) {
      logger.error("Something went wrong while signing up:", err);
      showToast(false, "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-6 px-30 py-15 w-[800px] shadow-2xl">
        <div className="flex flex-col items-center gap-1 -ml-3">
          <img src={logo} alt="Dream Away logo" className="w-24" />
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-secondary">
              Every journey begins with a booking.
            </h1>
            <p className="text-sm text-gray-500 italic">
              Start yours with Dream Away.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <InputField
            label={"First Name"}
            width={"275px"}
            name={"firstName"}
            value={formData.firstName ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            error={errorData.firstName}
          />
          <InputField
            label={"Last Name"}
            width={"275px"}
            name={"lastName"}
            value={formData.lastName ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            error={errorData.lastName}
          />
        </div>
        <InputField
          label={"Email"}
          width={"562px"}
          name={"email"}
          value={formData.userName ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          error={errorData.userName}
        />
        <PasswordField
          label={"Password"}
          width={"562px"}
          name={"password"}
          value={formData.password ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errorData.password}
          tooltip={
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
          }
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <CheckboxField
              label={"I agree to the "}
              onChange={(e) => setAllowSignUp(e.target.checked)}
            />
            <Link
              to="/auth/terms-and-conditions"
              target="_blank"
              className="text-primary text-[12px] underline"
            >
              Terms and Conditions
            </Link>
          </div>
          <div
            className="btn-primary cursor-pointer text-center"
            onClick={signUp}
          >
            Create my account
          </div>
          <div className="text-[12px] flex gap-1">
            Already have an account ?
            <Link to="/auth/login" className="text-primary">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
