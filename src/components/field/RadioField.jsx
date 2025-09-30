import Radio from "@mui/material/Radio";

const RadioField = ({ checked, value, onChange, name, label }) => {
  return (
    <div className="flex flex-col gap-1 justify-start">
      <div className="flex items-center justify-center">
        <Radio
          value={value}
          onChange={onChange}
          checked={checked}
          name={name}
          sx={{
            "&.Mui-checked": {
              color: "#013c67",
            },
          }}
        />
        {label && <div className="text-[15px]">{label}</div>}
      </div>
    </div>
  );
};

export default RadioField;
