import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { GrFavorite } from "react-icons/gr";
import { RiHotelLine } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";
import { BsDatabaseFillGear } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { isAuthenticated } from "../../utils/authUtil";
import defaultProfile from "../../assets/images/default-profile.png";
import roles from "../../constants/roles";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-[rgb(255,254,254)] px-70 border-b-1 border-gray-200 shadow-xs sticky top-0 z-2">
        <Link to="/">
          <img src={logo} alt="Dream Away logo" className="w-24" />
        </Link>
        <div className="flex justify-between gap-10">
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[15px] transition-all duration-100 nav-link
              ${isActive ? "text-primary" : ""}`
              }
            >
              <div className="flex items-center justify-center gap-1">
                <RiHotelLine />
                <div className="pt-0.5">My Bookings</div>
              </div>
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `text-[15px] transition-all duration-100 nav-link
              ${isActive ? "text-primary" : ""}`
              }
            >
              <div className="flex items-center justify-center gap-1">
                <GrFavorite />
                <div className="pt-0.5">Favorites</div>
              </div>
            </NavLink>
            <NavLink
              to="/support/get-in-touch"
              className={({ isActive }) =>
                `text-[15px] transition-all duration-100 nav-link
              ${isActive ? "text-primary" : ""}`
              }
            >
              <div className="flex items-center justify-center gap-1">
                <MdOutlineContactSupport />
                <div className="pt-0.5">Help and Support</div>
              </div>
            </NavLink>
            {isAuthenticated(user, [roles.ROLE_ADMIN]) && (
              <NavLink
                to="/admin/property-requests"
                className={({ isActive }) =>
                  `text-[15px] transition-all duration-100 nav-link
                ${isActive ? "text-primary" : ""}`
                }
              >
                <div className="flex items-center justify-center gap-1">
                  <BsDatabaseFillGear />
                  <div className="pt-0.5">Admin Panel</div>
                </div>
              </NavLink>
            )}
          </div>
          {!isAuthenticated(user) && (
            <div className="flex items-center justify-between gap-3">
              <Link className="btn-secondary" to="/auth/signup">
                Sign up
              </Link>
              <Link className="btn-primary" to="/auth/login">
                Log in
              </Link>
            </div>
          )}
          {isAuthenticated(user) && (
            <div className="flex items-center justify-between gap-5">
              <NavLink
                to="list-your-property"
                className={({ isActive }) =>
                  `px-4 py-2 text-[15px] transition-all duration-100 border-1 rounded-[50px] border-gray-200 hover:bg-gray-100
             ${isActive ? "text-primary" : ""}`
                }
              >
                List your property
              </NavLink>
              <div
                className="flex flex-col relative items-center justify-center"
                tabIndex={0}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setShowProfileOptions(false);
                  }
                }}
              >
                <div
                  onClick={() => setShowProfileOptions(!showProfileOptions)}
                  className="cursor-pointer"
                >
                  <img
                    src={user.profilePicture ?? defaultProfile}
                    alt="Profile"
                    className="w-10 h-10 object-cover rounded-full border border-gray-200"
                  />
                </div>
                {showProfileOptions && (
                  <div className="absolute top-10 -right-10 border border-gray-200 mt-2 w-35 bg-white rounded-md shadow-lg z-10 py-2">
                    <Link
                      className="block btn-normal"
                      to="/user/profile"
                      onClick={() => setShowProfileOptions(false)}
                    >
                      My Profile
                    </Link>
                    <div className="block btn-normal" onClick={logout}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
