import { PiEnvelopeThin } from "react-icons/pi";
import NavCard from "../../components/common/NavCard";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const SupportNavbar = () => {
  return (
    <>
      <div className="flex flex-col w-[350px] gap-5 mt-3">
        <div className="flex flex-col justify-center gap-2">
          <div className="text-[15px] border border-gray-200 rounded-[10px] px-4 py-8">
            <div className="font-[600]">
              Have questions about your bookings or stay?
            </div>
            <div className="text-[13px]">Explore the options below to get assistance instantly.</div>
          </div>
          <NavCard
            title="Contact"
            description={
              "Get in touch with our support team for quick assistance."
            }
            icon={<PiEnvelopeThin className="w-5 h-5" />}
            to={"/support/get-in-touch"}
          />
          <NavCard
            title="FAQ"
            description={"Find answers to the most common questions instantly."}
            icon={<FaRegQuestionCircle className="w-5 h-5" />}
            to={"/support/faqs"}
          />
          <NavCard
            title="Raise a Ticket"
            description={"Submit your issue and track its resolution easily."}
            icon={<IoChatboxEllipsesOutline className="w-5 h-5" />}
            to={"#"}
          />
        </div>
      </div>
    </>
  );
};

export default SupportNavbar;
