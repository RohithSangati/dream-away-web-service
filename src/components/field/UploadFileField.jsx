import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";
import { VscErrorSmall } from "react-icons/vsc";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadFileField = ({
  label,
  width,
  onChange,
  accept,
  supportedFormatText,
  infoText,
  error,
  hideFilePreview,
}) => {
  const [file, setFile] = useState(null);
  const fileUploadRef = useRef(null);

  const handleChange = (event) => {
    const files = event.target.files;
    const file = files.length > 0 ? files[0] : null;
    setFile(file);
    onChange(file);
  };

  const removeFile = () => {
    setFile(null);
    onChange(null);
    if (fileUploadRef) fileUploadRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {infoText && <div className="text-[13px] px-2 py-1 mb-4">{infoText}</div>}
      {!hideFilePreview && file && (
        <div className="relative flex flex-col items-end p-0 -mt-5">
          <RxCross2
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-[50%] w-4 h-4 p-0.5 shadow-md border border-gray-200 relative top-4 -right-2"
            onClick={removeFile}
          />
          <div className="border border-gray-200 rounded-[4px] text-[13px] shadow-md w-fit p-1.5 mt-1 bg-white">
            <div>{file?.name}</div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ width: width }}
        >
          {label}
          <VisuallyHiddenInput
            ref={fileUploadRef}
            type="file"
            onChange={(event) => handleChange(event)}
            accept={accept}
          />
        </Button>
        {supportedFormatText && (
          <div>
            <span className="text-gray-400 text-[12px]">
              {supportedFormatText}
            </span>
          </div>
        )}
        {error && (
          <div className="flex items-center -ml-4 text-red-500 text-[12px]">
            <VscErrorSmall fontSize={20} className="mb-0.5" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFileField;
