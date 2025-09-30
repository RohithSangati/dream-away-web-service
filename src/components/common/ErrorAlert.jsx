import { PiWarningCircleFill } from "react-icons/pi";

const ErrorAlert = ({ errorData, width }) => {
  if (!Object.keys(errorData).length) return null;
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 rounded-[4px] px-4 py-2 flex flex-col gap-1"
      style={{ width: width }}
    >
      <div className="flex gap-2 p-0.5 items-center">
        <PiWarningCircleFill className="w-[24px] h-[24px] text-red-500 ring-1 ring-red-300 rounded-full" />
        <div className="font-bold text-red-500 pt-1">
          {Object.keys(errorData).length} Error
          {Object.keys(errorData).length > 1 && "s"} found
        </div>
      </div>
      <div className="flex flex-col pl-8">
        {Object.entries(errorData).map(([key, value], index) => (
          <div key={index} className="text-[12px] text-gray-800">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ErrorAlert;
