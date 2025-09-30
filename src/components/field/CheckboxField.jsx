import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxField = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1 justify-start">
      <div className="flex gap-1 items-center">
        <FormGroup>
          <FormControlLabel
            className="!mr-1 !mt-0 !p-0"
            control={
              <Checkbox
                size="5px"
                sx={{
                  "&.Mui-checked": {
                    color: "#013c67",
                  },
                }}
                checked={value}
                onChange={onChange}
              />
            }
            label={<span className={`text-[12px]`}>{label}</span>}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default CheckboxField;
