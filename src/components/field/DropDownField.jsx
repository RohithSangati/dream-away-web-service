import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { VscErrorSmall } from "react-icons/vsc";

const DropDownField = ({
  label,
  width,
  name,
  options,
  value,
  onChange,
  error,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-start">
      <div className="relative w-full">
        <FormControl sx={{ width: width }} size="small" error={!!error}>
          <InputLabel id={name} disabled={disabled}>{label}</InputLabel>
          <Select
            disabled={disabled}
            name={name}
            labelId={name}
            value={value ?? ""}
            onChange={onChange}
            label={label}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250,
                },
              },
            }}
          >
            {options.length == 0 && (
              <MenuItem disabled>No options available</MenuItem>
            )}
            {options.map((option) => {
              return (
                <MenuItem
                  value={option.value ?? ""}
                  disabled={option.disabled ?? false}
                >
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>
            {error && (
              <p className="flex items-center -ml-4">
                <VscErrorSmall fontSize={"20px"} className="mb-0.5" />
                {error}
              </p>
            )}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

export default DropDownField;
