import { Link } from "react-router-dom";
import navLinks from "../../constants/navLinks";
import logo from "../../assets/images/only-logo.png";
const Footer = () => {
  return (
    <div className="bg-[#162334] text-white mt-20 w-full pr-4">
      <div className="max-w-7xl mx-auto px-4 py-10  flex justify-between">
        <div className="flex gap-50">
          <div>
            <Link
              to="/"
              className="flex gap-2 items-center justify-start pl-1 mb-2"
            >
              <img src={logo} alt="Dream Away logo" className="h-10" />
              <h2 className="text-2xl font-semibold">Dream Away</h2>
            </Link>
            <p>Discover and book your perfect stay effortlessly!</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <div className="font-[10px] flex gap-2">
              <span> Email :</span>
              <p className="italic">info@dreamaway.com</p>
            </div>
            <div className="font-[10px] flex gap-2">
              <span>Phone :</span>
              <p className="italic">+1 (234) 567-890</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          {Object.entries(navLinks).map(([key, value]) => (
            <Link
              key={key}
              to={value}
              className="block text-sm py-1 transition-colors hover:underline"
            >
              {key}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 mb-2 text-center text-sm">
        © {new Date().getFullYear()} Dream Away. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
