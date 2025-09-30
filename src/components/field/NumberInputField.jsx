import * as React from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import { VscErrorSmall } from "react-icons/vsc";

const NumberInputField = ({
  width,
  name,
  label,
  value,
  onChange,
  error,
  min,
  max,
}) => {
  return (
    <NumberField.Root
      id={name}
      value={value ?? 0}
      className="flex flex-col items-start gap-1"
      min={min ?? Number.MIN_VALUE}
      max={max ?? Number.MAX_VALUE}
    >
      <NumberField.ScrubArea className="cursor-ew-resize">
        <label
          htmlFor={name ?? ""}
          className={`cursor-ew-resize text-[12px] font-medium ${
            error ? "text-red-500" : "text-gray-600"
          }`}
        >
          {label}
        </label>
        <NumberField.ScrubAreaCursor className="drop-shadow-[0_1px_1px_#0008] filter">
          <CursorGrowIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className="flex">
        <NumberField.Decrement
          className={`flex size-10 items-center justify-center rounded-tl-md rounded-bl-md border ${
            error ? "border-red-500" : "border-gray-300"
          } bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100`}
        >
          <MinusIcon />
        </NumberField.Decrement>

        <NumberField.Input
          className={`h-10 border-t border-b ${
            error ? "border-red-500" : "border-gray-300"
          } text-center text-base text-gray-900 tabular-nums focus:z-1 focus:outline-none`}
          style={{ width }}
          onChange={onChange}
          formatOptions={{ useGrouping: false }}
        />

        <NumberField.Increment
          className={`flex size-10 items-center justify-center rounded-tr-md rounded-br-md border ${
            error ? "border-red-500" : "border-gray-300"
          } bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100`}
        >
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
      {error && (
        <div className="flex items-center text-xs text-red-500">
          <VscErrorSmall fontSize={20} />
          {error}
        </div>
      )}
    </NumberField.Root>
  );
};

function CursorGrowIcon(props) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}

export default NumberInputField;
