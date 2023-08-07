import React, { useRef, useState, useEffect } from "react";
import {
    Box,
    CircularProgress,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import FormsLayout from "@/Layouts/FormsLayout";
import AddressForm from "../../../Components/Fields/AddressForm";
import * as Yup from "yup";
import { useForm } from "@inertiajs/react";
import PhoneInput from "@/Components/Fields/PhoneInput";
import DateField from "@/Components/Fields/DateField";
import { ContactSupportOutlined } from "@mui/icons-material";

const PatientIntake = () => {
    const [isLoading, setIsLoading] = useState(false);

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
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        gender: "",
        address: "",
        homePhoneNumber: "",
        mobilePhoneNumber: "",
        emailAddress: "",
        familyPhysicianName: "",
        familyPhysicianPhone: "",
        emergencyContactFullName: "",
        emergencyContactRelationship: "",
        emergencyContactPhoneNumber: "",
        hasDentalInsurance: false,
        primaryInsuranceProvider: "",
        primaryPolicyHolderName: "",
        primaryPolicyNumber: "",
        primaryGroupID: "",
        primaryInsurancePhoneNumber: "",
        hasSecondaryInsurance: false,
        secondaryInsuranceProvider: "",
        secondaryPolicyHolderName: "",
        secondaryPolicyNumber: "",
        secondaryGroupID: "",
        secondaryInsurancePhoneNumber: "",
        printName: "",
        signature: "",
    });

    const [address, setAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        zipCode: "",
        country: "Canada",
        provinceState: "",
    });

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
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

    useEffect(() => {
        setData("address", address);
    }, [address]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const signatureRef = useRef();

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleClear = () => {
        signatureRef.current.clear();
    };

    const handleSignatureEnd = () => {
        const signatureData = signatureRef.current.toDataURL() || null;
        console.log("signatureData", signatureData);
        setData("signature", signatureData);
    };

    const handleBlur = async (event) => {
        const { name, value } = event.target;
        try {
            await validationSchema.validateAt(name, { [name]: value });
            setError(name, undefined);
        } catch (error) {
            setError(name, error.message);
        }
    };

    const handleSubmit = async (event) => {
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
            const response = await post(route("form.submitDPPIForm"), data);
            console.log("response:", response);
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
        <FormsLayout>
            <div className="p-8">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h2>Personal Information:</h2>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                label="First Name"
                                value={data.firstName}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                onBlur={handleBlur}
                                error={!!errors.firstName}
                                helperText={errors.firstName || ""}
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                label="Last Name"
                                value={data.lastName}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                // required
                            />
                        </Grid>
                        {/* Add other personal information fields similarly */}
                        {/* Date of Birth */}
                        <Grid item xs={12} sm={6}>
                            <DateField
                                label="Date of Birth"
                                name="dateOfBirth"
                                value={data.dateOfBirth}
                                onChange={(date) =>
                                    handleChange({
                                        target: {
                                            value: date,
                                            name: "dateOfBirth",
                                        },
                                    })
                                }
                                fullWidth
                                variant="outlined"
                                // required
                            />
                        </Grid>
                        {/* Gender (Select) */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={data.gender}
                                    onChange={handleChange}
                                    label="Gender"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Contact Information:</h2>
                        </Grid>
                        {/* Address */}
                        <Grid item xs={12}>
                            <AddressForm
                                address={address}
                                setAddress={setAddress}
                                errors={errors}
                            />
                        </Grid>
                        {/* Phone Numbers */}
                        <Grid item xs={12} sm={6}>
                            <PhoneInput
                                name="homePhoneNumber"
                                value={data.homePhoneNumber}
                                onChange={handleChange}
                                label="Home Phone Number"
                                placeholder="999-999-9999"
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PhoneInput
                                name="mobilePhoneNumber"
                                value={data.mobilePhoneNumber}
                                onChange={handleChange}
                                label="Mobile Phone Number"
                                placeholder="999-999-9999"
                                fullWidth
                                // required
                            />
                        </Grid>
                        {/* Email Address */}
                        <Grid item xs={12}>
                            <TextField
                                name="emailAddress"
                                label="Email Address"
                                value={data.emailAddress}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                // required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <h2>Emergency Contact:</h2>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="emergencyContactFullName"
                                label="Full Name"
                                value={data.emergencyContactFullName}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="emergencyContactRelationship"
                                label="Relationship to Patient"
                                value={data.emergencyContactRelationship}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PhoneInput
                                name="emergencyContactPhoneNumber"
                                value={data.emergencyContactPhoneNumber}
                                onChange={handleChange}
                                label="Phone Number"
                                placeholder="999-999-9999"
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Family Physician Information:</h2>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="familyPhysicianName"
                                label="Name"
                                value={data.familyPhysicianName}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PhoneInput
                                name="familyPhysicianPhone"
                                value={data.familyPhysicianPhone}
                                onChange={handleChange}
                                label="Phone Number"
                                placeholder="999-999-9999"
                                fullWidth
                                // required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <h2>
                                Dental Insurance Information (if applicable):
                            </h2>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="hasDentalInsurance"
                                            checked={data.hasDentalInsurance}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Do you have Dental Insurance?"
                                />
                            </FormGroup>
                        </Grid>
                        {data.hasDentalInsurance && (
                            <>
                                <Grid item xs={12}>
                                    <h3>Primary Insurance information</h3>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="primaryInsuranceProvider"
                                        label="Insurance Provider's Name"
                                        value={data.primaryInsuranceProvider}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="primaryPolicyHolderName"
                                        label="Policy Holder's Name (if different from patient)"
                                        value={data.primaryPolicyHolderName}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="primaryPolicyNumber"
                                        label="Policy Number"
                                        value={data.primaryPolicyNumber}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="primaryGroupID"
                                        label="Group ID"
                                        value={data.primaryGroupID}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <PhoneInput
                                        name="primaryInsurancePhoneNumber"
                                        value={data.primaryInsurancePhoneNumber}
                                        onChange={handleChange}
                                        label="Insurance Phone Number"
                                        placeholder="999-999-9999"
                                        fullWidth
                                        // required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <h3>Secondary Insurance information</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="hasSecondaryInsurance"
                                                    checked={
                                                        data.hasSecondaryInsurance
                                                    }
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                />
                                            }
                                            label="Do you have Secondary Insurance?"
                                        />
                                    </FormGroup>
                                </Grid>
                                {data.hasSecondaryInsurance && (
                                    <>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="secondaryInsuranceProvider"
                                                label="Insurance Provider's Name"
                                                value={
                                                    data.secondaryInsuranceProvider
                                                }
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="secondaryPolicyHolderName"
                                                label="Policy Holder's Name (if different from patient)"
                                                value={
                                                    data.secondaryPolicyHolderName
                                                }
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="secondaryPolicyNumber"
                                                label="Policy Number"
                                                value={
                                                    data.secondaryPolicyNumber
                                                }
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="secondaryGroupID"
                                                label="Group ID"
                                                value={data.secondaryGroupID}
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <PhoneInput
                                                name="secondaryInsurancePhoneNumber"
                                                value={
                                                    data.secondaryInsurancePhoneNumber
                                                }
                                                onChange={handleChange}
                                                label="Insurance Phone Number"
                                                placeholder="999-999-9999"
                                                fullWidth
                                                // required
                                            />
                                        </Grid>
                                    </>
                                )}
                            </>
                        )}

                        <Grid item xs={12}>
                            <h2>Signature Section:</h2>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="printName"
                                label="Print Name"
                                value={data.printName}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                // required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    display: "inline-block",
                                }}
                            >
                                <SignatureCanvas
                                    ref={signatureRef}
                                    onEnd={handleSignatureEnd}
                                    penColor="#4477bb"
                                    canvasProps={{
                                        width: 500,
                                        height: 200,
                                        className: "sigCanvas",
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleClear}
                                >
                                    Clear Signature
                                </Button>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading || processing} // Disable the button during loading or form processing
                            >
                                {isLoading ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </FormsLayout>
    );
};

export default PatientIntake;
