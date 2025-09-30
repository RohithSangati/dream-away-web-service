import DropDownField from "../../components/field/DropDownField";
import InputField from "../../components/field/InputField";
import NumberInputField from "../../components/field/NumberInputField";
import roomTypes from "../../constants/roomTypes";
import MultiFileUpload from "../../components/field/MultiFileUploadField";
import RadioField from "../../components/field/RadioField";
import bedTypes from "../../constants/bedTypes";
import { AiOutlineSave } from "react-icons/ai";
import { useEffect, useState } from "react";
import { showToast } from "../../utils/toastUtil";
import { RxCross2 } from "react-icons/rx";

const RoomForm = ({ formData, setFormData, roomType, setAddRoomFor }) => {
  const [roomData, setRoomData] = useState({});

  const saveRoom = () => {
    const updatedFormData = {
      ...formData,
      [roomType]: { ...roomData, roomType: roomType },
    };
    setFormData(updatedFormData);
    showToast(true, "Room details saved successfully!");
  };

  const removeRoom = () => {
    const updatedFormData = { ...formData };
    delete updatedFormData[roomType];
    setFormData(updatedFormData);
    setAddRoomFor(null);
  };

  useEffect(() => {
    setRoomData(
      formData?.[roomType] ?? {
        name: null,
        count: 1,
        roomType: roomType,
        bedType: null,
        description: null,
        isExtraBedProviding: false,
        maximumAdults: 0,
        maximumChildren: 0,
        maximumOccupancy: 1,
        price: 1,
        images: [],
      }
    );
  }, [roomType]);

  return (
    <div className="flex flex-wrap py-5 items-center justify-center border-1 border-gray-200 rounded-[10px] w-[900px] max-h-[500px] overflow-auto">
      <div className="flex w-[90%] justify-end">
        <RxCross2
          className="cursor-pointer hover:bg-gray-300 rounded-[50%] w-[30px] h-[30px] p-1"
          onClick={removeRoom}
        />
      </div>
      <div className="flex gap-10">
        <div className="pt-7">
          <InputField
            label={"Room Name"}
            width={"350px"}
            name={"name"}
            value={roomData?.name ?? ""}
            onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
          />
        </div>
        <NumberInputField
          min={1}
          max={1000}
          width={"270px"}
          name={"count"}
          label={"Number of Rooms"}
          value={roomData?.count ?? 1}
          onChange={(e) => setRoomData({ ...roomData, count: e.target.value })}
        />
      </div>
      <div className="flex gap-10 pt-7">
        <DropDownField
          label={"Room Type"}
          width={"350px"}
          name={"roomType"}
          options={Object.entries(roomTypes).map(([key, value]) => {
            return { label: value, value: key };
          })}
          value={roomType ?? ""}
          disabled={true}
        />
        <DropDownField
          label={"Bed Type"}
          width={"350px"}
          name={"bedType"}
          options={Object.entries(bedTypes).map(([key, value]) => {
            return { label: value, value: key };
          })}
          value={roomData.bedType ?? ""}
          onChange={(e) =>
            setRoomData({ ...roomData, bedType: e.target.value })
          }
        />
      </div>
      <div className="pt-3">
        <InputField
          label={"Room Description"}
          width={"735px"}
          name={"description"}
          value={roomData?.description ?? ""}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              description: e.target.value,
            })
          }
          multiline={true}
          rows={5}
        />
      </div>
      <div className="flex justify-between items-center px-4 py-0.5 border border-gray-300 mt-4 w-[735px] rounded-[4px]">
        <div className="text-[14px] font-[600] text-gray-500">
          Do you provide extra bed?
        </div>
        <div className="flex gap-2">
          <RadioField
            label={"Yes"}
            value={true}
            name="isExtraBedProviding"
            onChange={() =>
              setRoomData({
                ...roomData,
                isExtraBedProviding: true,
              })
            }
            checked={roomData.isExtraBedProviding === true}
          />
          <RadioField
            label={"No"}
            value={false}
            name="isExtraBedProviding"
            onChange={() =>
              setRoomData({
                ...roomData,
                isExtraBedProviding: false,
              })
            }
            checked={roomData.isExtraBedProviding === false}
          />
        </div>
      </div>
      <div className="flex gap-10 pt-3">
        <NumberInputField
          min={0}
          max={50}
          width={"270px"}
          name={"maximumAdults"}
          label={"Maximum Adults"}
          value={roomData?.maximumAdults ?? 0}
          onChange={(e) =>
            setRoomData({ ...roomData, maximumAdults: e.target.value })
          }
        />
        <NumberInputField
          min={0}
          max={50}
          width={"270px"}
          name={"maximumChildren"}
          label={"Maximum Children"}
          value={roomData?.maximumChildren ?? 0}
          onChange={(e) =>
            setRoomData({ ...roomData, maximumChildren: e.target.value })
          }
        />
      </div>
      <div className="flex gap-10 pt-3">
        <NumberInputField
          min={1}
          max={50}
          width={"270px"}
          name={"maximumOccupancy"}
          label={"Maximum Occupancy"}
          value={roomData?.maximumOccupancy ?? 1}
          onChange={(e) =>
            setRoomData({ ...roomData, maximumOccupancy: e.target.value })
          }
        />
        <NumberInputField
          min={1}
          width={"270px"}
          name={"price"}
          label={"Price"}
          value={roomData?.price ?? 1}
          onChange={(e) => setRoomData({ ...roomData, price: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-10 pt-3 border border-gray-200 mt-6 w-[735px] justify-center">
        <MultiFileUpload
          label={"Add Room images"}
          width={"300px"}
          onChange={(files) => {
            setRoomData({ ...roomData, images: files });
          }}
          accept=".jpg,.jpeg,.png"
          supportedFormatText="Supported formats: .jpg, .jpeg, .png and Max allowed size: 10MB/image"
          infoText={"Select at least 3 clear images of the room"}
          filesValue={roomData?.images}
        />
      </div>
      <div className="flex px-4 justify-end w-full sticky bottom-0">
        <div
          className="btn-primary flex gap-2 items-center justify-center"
          onClick={saveRoom}
        >
          <AiOutlineSave />
          Save
        </div>
      </div>
    </div>
  );
};

export default RoomForm;
