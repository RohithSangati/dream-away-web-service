import { RxCross2 } from "react-icons/rx";
import UploadFileField from "../field/UploadFileField";

const UploadImagesWithPreview = ({
  label,
  width,
  onChange,
  accept,
  supportedFormatText,
  files,
  removeFile,
  previewContainerWidth,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <UploadFileField
        label={label}
        width={width}
        onChange={onChange}
        accept={accept}
        supportedFormatText={supportedFormatText}
        hideFilePreview={true}
      />
      <div
        className={`flex flex-row flex-wrap gap-15 p-5 justify-center items-center border-1 border-gray-200 shadow-sm rounded-[5px] min-h-[200px] max-h-[500px] overflow-auto w-[${previewContainerWidth}]`}
      >
        {files.length == 0 && <div className="text-[15px] text-gray-400">No files uploaded</div>}
        {files.map((file, index) => (
          <div key={index} className="relative flex flex-col items-end -mt-5">
            <RxCross2
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-[50%] w-4 h-4 p-0.5 shadow-md border border-gray-200 relative top-3 -right-2"
              onClick={() => removeFile(index)}
            />
            <img
              src={file ? URL.createObjectURL(file) : ""}
              alt="property"
              className="w-[150px] h-[150px] rounded-[4px] border-1 border-gray-200 shadow-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImagesWithPreview;
