import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { VscErrorSmall } from "react-icons/vsc";
import dayjs from "dayjs";

const DateField = ({ label, width, value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1 -mt-2 justify-start">
      <div className="relative w-full">
        <LocalizationProvider className="" dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              format="DD/MM/YYYY"
              label={label ?? ""}
              value={dayjs(value,"DD/MM/YYYY")}
              width={width}
              onChange={(newValue) => {
                if (newValue) {
                  const formatted = dayjs(newValue).format("DD/MM/YYYY");
                  onChange(formatted);
                } else {
                  onChange(null);
                }
              }}
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    width: width,
                  },
                  error: !!error,
                  helperText: error && (
                    <div className="flex items-center -ml-4">
                      <VscErrorSmall fontSize={20} className="mb-0.5" />
                      {error}
                    </div>
                  ),
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DateField;
