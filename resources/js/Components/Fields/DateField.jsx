import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateField = (props) => {
    const { label, value, onChange, ...rest } = props;
    const [selectedDate, setSelectedDate] = useState(value);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={selectedDate}
                onChange={handleDateChange}
                textField={(params) => <TextField {...params} />}
                slotProps={{ textField: { fullWidth: true } }}
                {...rest}
            />
        </LocalizationProvider>
    );
};

export default DateField;
