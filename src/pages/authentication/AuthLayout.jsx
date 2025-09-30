import { useContext } from "react";
import { LoaderContext } from "../../context/LoaderContext";
import { Link, Outlet } from "react-router-dom";
import Loader from "../../components/common/Loader";
import logo from "../../assets/images/logo.png";

const AuthLayout = () => {
  const { isLoading } = useContext(LoaderContext);
  return (
    <div className="h-full w-full">
      <div className="px-70 mb-15">
        <Link to="/" className="w-24 border-red-200 block">
          <img src={logo} alt="Dream Away logo" className="w-28" />
        </Link>
      </div>
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
