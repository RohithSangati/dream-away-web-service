import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import commonService from "../../services/commonService";
import { LoaderContext } from "../../context/LoaderContext";
import { useState } from "react";
import { useContext } from "react";
import { showToast } from "../../utils/toastUtil";
import logger from "../../utils/logger";
import { useEffect } from "react";
import { VscErrorSmall } from "react-icons/vsc";

export default function CountrySelect({
  label,
  width,
  value,
  onChange,
  error,
}) {
  const [countries, setCountries] = useState([]);
  const { setIsLoading } = useContext(LoaderContext);
  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      const response = await commonService.getCountries();
      setCountries(response.data);
    } catch (err) {
      logger.error("Something went wrong while fetching country list :", err);
      showToast(false, "Something went wrong while fetching country list!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Autocomplete
      id="country-select-demo"
      options={countries ?? []}
      autoHighlight
      getOptionLabel={(option) => `+${option.phone} (${option.label})`}
      sx={{ width: width }}
      value={countries.find((c) => `+${c.phone}` === value) || null}
      onChange={(event, newValue) =>
        onChange(newValue ? `+${newValue.phone}` : "")
      }
      size="small"
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            },
          }}
          error={!!error}
          helperText={
            error && (
              <p className="flex items-center gap-1  -ml-4">
                <VscErrorSmall size={18} className="mb-0.5" />
                {error}
              </p>
            )
          }
        />
      )}
    />
  );
}
