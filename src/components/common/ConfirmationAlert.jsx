import { TiWarning } from "react-icons/ti";

const ConfirmationAlert = ({
  header,
  confirmationMessage,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-white/70 z-1000">
      <div className="fixed w-[400px] h-fit top-[37%] left-[38%] inset-0 z-100 shadow-lg border-1 border-gray-100 bg-white p-4 rounded-md flex flex-col gap-2">
        <div className="flex items-start gap-1 text-gray-text-[14px]800">
          <TiWarning className="w-5 h-5 text-amber-500" />
          <div className="text-[15px] font-[600]">{header}</div>
        </div>
        <div className="px-1 text-[14px] text-gray-700">
          {confirmationMessage}
        </div>

        <div className="flex justify-end mt-3 gap-2">
          <div className="!text-[15px] btn-secondary" onClick={onClose}>
            Cancel
          </div>
          <div className="!text-[15px] btn-primary" onClick={onConfirm}>
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;
