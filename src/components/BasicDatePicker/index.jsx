import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function BasicDatePicker({
  label,
  inputFormat,
  value,
  onChange,
  renderInput,
  ...other
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        inputFormat={inputFormat}
        value={dayjs(value)}
        onChange={onChange}
        renderInput={renderInput}
        {...other}
      />
    </LocalizationProvider>
  );
}

export default BasicDatePicker;
