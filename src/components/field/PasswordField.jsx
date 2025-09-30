import { VscErrorSmall } from "react-icons/vsc";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
const PasswordField = ({
  label,
  width,
  name,
  value,
  onChange,
  error,
  tooltip,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col gap-1 justify-start">
      <div className="relative w-full">
        <FormControl
          sx={{ width: width }}
          variant="outlined"
          size="small"
          error={error}
        >
          <InputLabel htmlFor={name}>
            {(tooltip && (
              <Tooltip title={tooltip} arrow>
                <span>{label ?? ""}</span>
              </Tooltip>
            )) ||
              (label ?? "")}
          </InputLabel>
          <OutlinedInput
            label={label ?? ""}
            type={showPassword ? "text" : "password"}
            defaultValue={value}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {error && (
              <div className="flex items-center -ml-4">
                <VscErrorSmall fontSize={"20px"} className="mb-0.5" />
                {error}
              </div>
            )}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

export default PasswordField;
