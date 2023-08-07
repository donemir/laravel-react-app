import React, { useEffect, useState } from "react";
import { TextField, Switch, Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useForm } from "@inertiajs/react";

import AddressForm from "../../Components/Fields/AddressForm";

const ValidationTestForm = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters"),
        email: Yup.string().required("Email is required"),
        engine: Yup.boolean().test(
            "is-true",
            "Engine must be true",
            (value) => value === true
        ),
        address: Yup.object().shape({
            address: Yup.string().required("Address is required"),
            country: Yup.string().required("Country is required"),
            city: Yup.string()
                .required("City is required")
                .min(3, "City must be at least 3 characters"),
            postalCode: Yup.string().when("country", {
                is: "Canada",
                then: () => Yup.string().required("Postal Code is required"),
            }),
            zipCode: Yup.string().when("country", {
                is: "US",
                then: () => Yup.string().required("Zip Code is required"),
            }),
        }),
    });

    const [address, setAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        zipCode: "",
        country: "Canada",
        provinceState: "",
    });

    const {
        data,
        setData,
        setError,
        post,
        errors,
        clearErrors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: "",
        email: "",
        engine: false,
        address: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setData("address", address);
    }, [address]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Clear any previous errors before revalidating
            clearErrors();

            await validationSchema.validate(data, { abortEarly: false });

            setIsLoading(true); // Set isLoading to true before submitting

            // Simulate form submission delay (Remove this in actual implementation)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setIsLoading(false);
            console.log("Data Ready to Submit:", data);
            // console.log("Address to Submit:", address);
            // const response = await post(
            //     route("form.submitValidationTest"),
            //     data
            // );
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                console.log(errors);
                setError(validationErrors);
            } else {
                console.error("Error:", error);
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <form onSubmit={handleFormSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name || ""}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Email Address"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email || ""}
                    />
                </Box>
                <Box mb={2}>
                    <div>
                        <label>Engine: </label>
                        <Switch
                            checked={data.engine}
                            onChange={(e) =>
                                setData("engine", e.target.checked)
                            }
                        />
                        {errors.engine && (
                            <span style={{ color: "red" }}>
                                {errors.engine}
                            </span>
                        )}
                    </div>
                </Box>
                <Box>
                    <AddressForm
                        address={address}
                        setAddress={setAddress}
                        errors={errors}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading || processing} // Disable the button during loading or form processing
                >
                    {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ValidationTestForm;
