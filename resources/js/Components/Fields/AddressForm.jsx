import React, { useEffect } from "react";
import {
    TextField,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    Box,
    Grid,
} from "@mui/material";

import { countries } from "@/Constants/countries";

const AddressForm = ({ address: initialAddress, setAddress, errors }) => {
    useEffect(() => {
        setAddress((prevAddress) => ({
            ...prevAddress,
            ...initialAddress,
        }));
    }, [initialAddress, setAddress]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "country") {
            setAddress((prevAddress) => ({
                ...prevAddress,
                country: value,
                provinceState: "", // Reset province/state when country changes
                postalCode: "", // Reset postal/zip code when country changes
            }));
        } else {
            setAddress((prevAddress) => ({
                ...prevAddress,
                [name]: value,
            }));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                        labelId="country-label"
                        label="Country"
                        name="country"
                        value={initialAddress.country}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                    >
                        {Object.keys(countries).map((country) => (
                            <MenuItem key={country} value={country}>
                                {countries[country].label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            {initialAddress.country === "Canada" && (
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="province-label">Province</InputLabel>
                        <Select
                            labelId="province-label"
                            label="Province"
                            name="provinceState"
                            value={initialAddress.provinceState}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                        >
                            {countries[initialAddress.country]?.provinces?.map(
                                (province) => (
                                    <MenuItem key={province} value={province}>
                                        {province}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            {initialAddress.country === "US" && (
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select
                            labelId="state-label"
                            label="State"
                            name="provinceState"
                            value={initialAddress.provinceState}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                        >
                            {countries[initialAddress.country]?.states?.map(
                                (state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField
                        label="Address"
                        name="address"
                        value={initialAddress.address}
                        onChange={handleInputChange}
                        variant="outlined"
                        error={!!errors["address.address"]}
                        helperText={errors["address.address"] || ""}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <TextField
                        label={
                            countries[initialAddress.country]
                                ?.postalCodeLabel || ""
                        }
                        name={
                            initialAddress.country === "Canada"
                                ? "postalCode"
                                : "zipCode"
                        }
                        value={
                            initialAddress.country === "Canada"
                                ? initialAddress.postalCode || ""
                                : initialAddress.zipCode || ""
                        }
                        onChange={handleInputChange}
                        variant="outlined"
                        error={
                            initialAddress.country === "Canada"
                                ? !!errors["address.postalCode"]
                                : !!errors["address.zipCode"]
                        }
                        helperText={
                            initialAddress.country === "Canada"
                                ? errors["address.postalCode"]
                                : errors["address.zipCode"]
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <TextField
                        label="City"
                        name="city"
                        value={initialAddress.city}
                        onChange={handleInputChange}
                        variant="outlined"
                        error={!!errors["address.city"]}
                        helperText={errors["address.city"] || ""}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default AddressForm;
