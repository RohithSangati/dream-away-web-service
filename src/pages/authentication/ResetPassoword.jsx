import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { LoaderContext } from "../../context/LoaderContext";
import InputField from "../../components/field/InputField";
import { showToast } from "../../utils/toastUtil";
import authenticationService from "../../services/authenticationService";
import logger from "../../utils/logger";
import { useNavigate } from "react-router-dom";
import PasswordField from "../../components/field/PasswordField";

const ResetPassword = () => {
  const [formData, setFormData] = useState({});
  const [email, setEmail] = useState(null);
  const [errorData, setErrorData] = useState({});
  const { setIsLoading } = useContext(LoaderContext);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const sendOtpMail = async () => {
    setErrorData({});
    setIsLoading(true);
    let updatedFormData = { ...formData, userName: email };
    setFormData(updatedFormData);
    try {
      await authenticationService.sendOtp(
        updatedFormData,
        setErrorData,
        setIsOtpSent,
        setFormData
      );
    } catch (err) {
      logger.error("Something went wrong while sending email:", err);
      showToast(false, "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setErrorData({});
    let updatedFormData = { ...formData, userName: email };
    setFormData(updatedFormData);
    try {
      await authenticationService.verifyOtp(
        updatedFormData,
        setErrorData,
        setIsOtpEntered,
        setFormData
      );
    } catch (err) {
      logger.error("Something went wrong while sending email:", err);
      showToast(false, "Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async () => {
    setErrorData({});
    setIsLoading(true);
    let updatedFormData = { ...formData, userName: email };
    setFormData(updatedFormData);
    try {
      if (updatedFormData.password != confirmPassword) {
        showToast(false, "Confirm password does not match.");
        return;
      }
      await authenticationService.resetPasswordAfterVerification(
        updatedFormData,
        setErrorData,
        navigate
      );
    } catch (err) {
      logger.error("Something went wrong while sending email:", err);
      showToast(false, "Something went wrong!!");
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
              {!isOtpSent
                ? "Enter your email address to send otp"
                : isOtpSent && !isOtpEntered
                ? "Enter OTP to reset password"
                : "Enter new password to reset"}
            </h1>
          </div>
        </div>
        {!isOtpSent && (
          <InputField
            label={"Email"}
            width={"562px"}
            name={"email"}
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            error={errorData.userName}
          />
        )}
        {isOtpSent && !isOtpEntered && (
          <InputField
            label={"OTP"}
            width={"562px"}
            name={"otp"}
            value={formData.otp ?? ""}
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            error={errorData.otp}
          />
        )}
        {isOtpSent && isOtpEntered && (
          <PasswordField
            label={"New Password"}
            width={"562px"}
            name={"password"}
            value={formData.password ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            tooltip={
              "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
            }
            error={errorData.password}
          />
        )}
        {isOtpSent && isOtpEntered && (
          <PasswordField
            label={"Confirm Password"}
            width={"562px"}
            name={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <div
          className="btn-primary cursor-pointer text-center"
          onClick={
            !isOtpSent
              ? sendOtpMail
              : isOtpSent && !isOtpEntered
              ? verifyOtp
              : resetPassword
          }
        >
          {!isOtpSent
            ? "Send OTP"
            : isOtpSent && !isOtpEntered
            ? "Verify OTP"
            : "Reset Password"}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
