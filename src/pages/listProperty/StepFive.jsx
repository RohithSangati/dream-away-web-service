import { useEffect, useState } from "react";
import UploadImagesWithPreview from "../../components/common/UploadImagesWithPreview";

const StepFive = ({ formData, setFormData }) => {
  const [files, setFiles] = useState([]);

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  useEffect(() => {
    setFormData({ images: files });
  }, [files]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center">
        <div className="text-[18px] text-center font-[600] text-gray-800">
          Upload a pixel perfect images of your property including rooms to give
          travelers a better experience.
        </div>
        <div className="text-[13px]">
          Minimum 5 images are required and your first picture will be
          considered as the main image
        </div>
      </div>
      {formData?.uploadedImages && formData.uploadedImages.length > 0 && (
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {formData.uploadedImages.map((image, index) => {
            return (
              <div key={index}>
                <img
                  src={image?.fileUrl}
                  className="w-[100px] h-[100px] object-cover"
                />
                <div className="text-[12px] text-center">{image.fileName}</div>
              </div>
            );
          })}
        </div>
      )}
      <UploadImagesWithPreview
        label={files.length > 0 ? "Add another image" : "Add Image"}
        width={"300px"}
        onChange={(file) => {
          delete formData?.uploadedImages;
          setFiles([...files, file]);
        }}
        accept={".jpg,.jpeg,.png"}
        supportedFormatText="Supported formats: .jpg, .jpeg, .png and Max allowed size: 10MB/image"
        files={files}
        removeFile={removeFile}
        previewContainerWidth={"800px"}
      />
    </div>
  );
};

export default StepFive;
