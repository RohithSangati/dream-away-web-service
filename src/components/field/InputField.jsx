import { VscErrorSmall } from "react-icons/vsc";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

const InputField = ({
  label,
  width,
  name,
  value,
  onChange,
  error,
  tooltip,
  disabled,
  multiline,
  rows
}) => {
  return (
    <div className="flex flex-col gap-1 justify-start">
      <div className="relative w-full">
        <TextField
          id={name}
          label={
            (tooltip && (
              <Tooltip title={tooltip} placement="right-end" arrow>
                <span>{label ?? ""}</span>
              </Tooltip>
            )) ||
            (label ?? "")
          }
          multiline={multiline}
          rows={rows}
          variant="outlined"
          defaultValue={value}
          onChange={onChange}
          disabled={disabled}
          size="small"
          sx={{
            width: width,
            "& .MuiOutlinedInput-root.Mui-disabled": {
              backgroundColor: "#f0f0f0",
            },
          }}
          error={error}
          helperText={
            error && (
              <div className="flex items-center -ml-4">
                <VscErrorSmall fontSize={20} className="mb-0.5"/>
                {error}
              </div>
            )
          }
        />
      </div>
    </div>
  );
};

export default InputField;
