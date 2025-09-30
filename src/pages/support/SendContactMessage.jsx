import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import InputField from "../../components/field/InputField";
import contactService from "../../services/contactService";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import { LoaderContext } from "../../context/LoaderContext";

const SendContactMessage = ({ setShowSendContactMessageForm }) => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({});
  const { setIsLoading } = useContext(LoaderContext);

  const closeForm = () => {
    setShowSendContactMessageForm(false);
  };

  const sendContactMessageRequest = async () => {
    setIsLoading(true);
    try {
      setErrorData({});
      await contactService.sendContactMessageRequest(
        formData,
        setErrorData,
        closeForm
      );
    } catch (err) {
      logger.error("Something went wrong while sending request:", err);
      showToast(false, "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeForm();
      }
    });
  };

  useEffect(() => {
    handleKeyPress();
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-white/40">
        <div className="flex flex-col z-10 min-h-screen w-[50%] bg-white side-pane fixed top-0 right-0 shadow-lg border-1 border-gray-100">
          <div className="flex items-center justify-between p-6 border-b-1 border-gray-200 shadow-xs text-gray-700 text-[18px] font-[500]">
            <div>Drop a message </div>
            <RxCross2
              className="cursor-pointer hover:bg-gray-300 rounded-[50%] w-[25px] h-[25px] p-1"
              onClick={closeForm}
            />
          </div>
          <div className="flex-grow flex flex-col gap-13 px-6 py-8 max-h-[85vh] overflow-y-scroll">
            <div className="flex gap-10 flex-wrap">
              <InputField
                label={"First Name"}
                width={"400px"}
                name={"firstName"}
                value={formData?.firstName ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                error={errorData?.firstName}
              />
              <InputField
                label={"Last Name"}
                width={"400px"}
                name={"lastName"}
                value={formData?.lastName ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                error={errorData?.lastName}
              />
            </div>
            <InputField
              label={"Email"}
              width={"842px"}
              name={"email"}
              value={formData?.email ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errorData?.email}
            />
            <InputField
              label={"Subject"}
              width={"842px"}
              name={"subject"}
              value={formData?.subject ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              error={errorData?.subject}
            />
            <InputField
              label={"Your Message"}
              width={"842px"}
              name={"message"}
              value={formData?.message ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              error={errorData?.message}
              multiline={true}
              rows={10}
            />
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
              onClick={sendContactMessageRequest}
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendContactMessage;
