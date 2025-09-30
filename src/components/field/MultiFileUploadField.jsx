import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
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

const MultiFileUpload = ({
  label,
  width,
  onChange,
  accept,
  supportedFormatText,
  infoText,
  error,
  filesValue = [],
}) => {
  const [files, setFiles] = useState([]);
  const fileUploadRef = useRef(null);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);
    onChange(files);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange(newFiles);
    if (fileUploadRef?.current && newFiles.length === 0) {
      fileUploadRef.current.value = "";
    }
  };

  useEffect(() => {
    setFiles(filesValue);
  }, [filesValue]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {infoText && <div className="text-[13px] px-2 py-1 mb-4">{infoText}</div>}
      {files && (
        <div className="flex flex-row items-center justify-center px-2 flex-wrap gap-3">
          {files.map((file, index) => {
            return (
              <div
                key={index}
                className="relative flex flex-col items-end p-0 -mt-5"
              >
                <RxCross2
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-[50%] w-4 h-4 p-0.5 shadow-md border border-gray-200 relative top-4 -right-2"
                  onClick={() => removeFile(index)}
                />
                <div className="border border-gray-200 rounded-[4px] text-[13px] shadow-md w-fit p-1.5 mt-1 bg-white">
                  <div>{file?.name}</div>
                </div>
              </div>
            );
          })}
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
            multiple
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

export default MultiFileUpload;
