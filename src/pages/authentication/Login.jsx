import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import InputField from "../../components/field/InputField";
import { LoaderContext } from "../../context/LoaderContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authenticationService from "../../services/authenticationService";
import { showToast } from "../../utils/toastUtil";
import logger from "../../utils/logger";
import PasswordField from "../../components/field/PasswordField";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});
  const { setIsLoading } = useContext(LoaderContext);
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const loginUser = async () => {
    setErrorData({});
    setIsLoading(true);
    try {
      await authenticationService.login(
        formData,
        setErrorData,
        login,
        location,
        navigate
      );
    } catch (err) {
      logger.error("Something went wrong while login :", err);
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
              Sign In to Your Account
            </h1>
            <p className="text-sm text-gray-500 italic">
              Access exclusive hotel deals and offers.
            </p>
          </div>
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
        />
        <div className="flex flex-col gap-3">
          <div className="text-[12px] flex justify-end">
            <Link to="/auth/forgot-password" className="text-primary">
              Forgot password ?
            </Link>
          </div>
          <div
            className="btn-primary cursor-pointer text-center"
            onClick={loginUser}
          >
            Login
          </div>
          <div className="text-[12px] flex gap-1">
            Don't have an account ?
            <Link to="/auth/signup" className="text-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
