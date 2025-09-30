import DropDownField from "../../components/field/DropDownField";
import RadioField from "../../components/field/RadioField";
import checkInTime from "../../constants/checkInTime";
import checkOutTime from "../../constants/checkOutTime";
import cancellationPolicies from "../../constants/cancellationPolicies";
import UploadFileField from "../../components/field/UploadFileField";
import { LiaCloudDownloadAltSolid } from "react-icons/lia";

const StepSix = ({ formData, setFormData }) => {
  return (
    <div className="flex-grow flex flex-col">
      <div className="text-[18px] font-[600] text-gray-800 text-center">
        Add your policies
      </div>
      <div className="flex gap-10 pt-10 flex-wrap">
        <DropDownField
          label={"CheckIn Time"}
          width={"500px"}
          name={"checkInTime"}
          options={checkInTime.map(({ key, value }) => {
            return { label: value, value: key };
          })}
          value={formData.checkInTime ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, checkInTime: e.target.value })
          }
        />
        <DropDownField
          label={"CheckOut Time"}
          width={"500px"}
          name={"checkOutTime"}
          options={checkOutTime.map(({ key, value }) => {
            return { label: value, value: key };
          })}
          value={formData.checkOutTime ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, checkOutTime: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-2 pt-10 flex-wrap">
        <div className="text-[14px]">Cancellation Policy</div>
        <div className="flex gap-2.5">
          {Object.entries(cancellationPolicies).map(([key, value]) => {
            return (
              <div
                key={key}
                className="border-1 border-gray-200 shadow-2xs rounded-[4px] pl-2 pr-4"
              >
                <RadioField
                  label={value}
                  value={key}
                  name="cancellationPolicy"
                  onChange={() =>
                    setFormData({ ...formData, cancellationPolicy: key })
                  }
                  checked={formData.cancellationPolicy === key}
                />
              </div>
            );
          })}
        </div>
        <div className="pt-4 flex justify-center">
          {formData?.policyDocumentObject && (
            <div className="flex items-center justify-center gap-2 text-[15px] font-[600] border-1 border-gray-300 py-1 px-4 rounded-[4px]">
              <div>{formData?.policyDocumentObject?.fileName}</div>
              <a
                href={formData?.policyDocumentObject?.fileUrl}
                className="cursor-pointer hover:bg-gray-200 p-0.5 rounded-full"
              >
                <LiaCloudDownloadAltSolid className=" w-[25px] h-[25px]" />
              </a>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6 p-4 mt-6 border-1 border-gray-300">
          <UploadFileField
            label={"Upload Policy Document"}
            width={"300px"}
            onChange={(file) => {
              delete formData?.policyDocumentObject;
              delete formData?.policyDocument;
              setFormData(
                file ? { ...formData, policyDocument: file } : { ...formData }
              );
            }}
            accept=".pdf"
            supportedFormatText={
              "Supported format: .pdf and Max allowed size: 20MB"
            }
            infoText={"Upload policy document for your property"}
          />
        </div>
      </div>
    </div>
  );
};

export default StepSix;
