import React from "react";
import InputMask from "react-input-mask";
import { TextField } from "@mui/material";

const PhoneInput = (props) => {
    const { value, onChange, ...rest } = props;

    return (
        <InputMask mask="(999) 999-9999" value={value} onChange={onChange}>
            {(inputProps) => (
                <TextField
                    {...inputProps}
                    fullWidth
                    variant="outlined"
                    type="tel"
                    {...rest}
                />
            )}
        </InputMask>
    );
};

export default PhoneInput;
