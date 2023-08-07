import React, { useRef, useEffect, useState } from "react";
import FormsLayout from "@/Layouts/FormsLayout";

import { Switch, TextField, Box } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import Button from "@mui/material/Button";
import { useForm } from "@inertiajs/react";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import {
    ContentPasteSearchOutlined,
    TrendingUpTwoTone,
} from "@mui/icons-material";

import PhoneInput from "@/Components/Fields/PhoneInput";
import DateField from "@/Components/Fields/DateField";

const TestForm = () => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            isInside: false,
            signature: null,
            files: [],
        });

    const signatureRef = useRef();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileIds, setFileIds] = useState([]);
    const [trimmedDataURL, setTrimmedDataURL] = useState(null);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setData("files", fileIds);
    }, [fileIds]);

    const handleClear = () => {
        signatureRef.current.clear();
    };

    const handleSignatureEnd = () => {
        const signatureData = signatureRef.current.toDataURL() || null;
        console.log("signatureData", signatureData);
        setData("signature", signatureData);
    };

    useEffect(() => {
        setData(
            "signature",
            signatureRef.current ? signatureRef.current.toDataURL() : null
        );
    }, [signatureRef]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log("Data Ready to Submit:", data.signature);

        // Post the form data to the server using Inertia.js post method
        try {
            const response = await post(route("form.submitForm"), data);
            // console.log(response);
            // Log the response data to the console
        } catch (error) {
            console.error("Error:", error);
        }
    };

    registerPlugin(FilePondPluginFileValidateType);

    return (
        <FormsLayout>
            <div className="p-8">
                <form onSubmit={handleFormSubmit}>
                    <Box mb={2}>
                        <TextField
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </Box>
                    <Box mb={2}>
                        <PhoneInput
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            label="Phone Number"
                            placeholder="999-999-9999"
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <DateField
                            label="Date of Birth"
                            value={selectedDate}
                            onChange={setSelectedDate}
                            fullWidth
                            variant="outlined"
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <div>
                            <label>I'm Inside: </label>
                            <Switch
                                checked={data.isInside}
                                onChange={(e) =>
                                    setData("isInside", e.target.checked)
                                }
                            />
                        </div>
                    </Box>
                    <Box mb={2}>
                        {/* FilePond input for file uploading */}
                        <FilePond
                            files={uploadedFiles}
                            onupdatefiles={setUploadedFiles}
                            onprocessfile={(error, response) => {
                                if (!error) {
                                    console.log(response);
                                    setFileIds((prevFileIds) => [
                                        ...prevFileIds,
                                        {
                                            id: response.id,
                                            serverId: response.serverId,
                                        },
                                    ]);
                                }
                            }}
                            onremovefile={(error, response) => {
                                setFileIds((prevFileIds) =>
                                    prevFileIds.filter(
                                        (item) => item.id !== response.id
                                    )
                                );
                            }}
                            allowMultiple={true}
                            maxFiles={3}
                            server={{
                                url: "/api/file-uploader",
                                process: {
                                    url: "/tmp-upload",
                                    method: "POST",
                                    headers: {
                                        "X-CSRF-TOKEN": "{{ csrf_token() }}",
                                    },
                                },
                                revert: {
                                    url: "/tmp-revert",
                                    method: "DELETE",
                                    headers: {
                                        "X-CSRF-TOKEN": "{{ csrf_token() }}",
                                    },
                                },
                            }}
                            name="files"
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </Box>
                    <Box mb={2}>
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
                                variant="contained"
                                color="primary"
                                onClick={handleClear}
                            >
                                Clear
                            </Button>
                        </div>
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </div>
        </FormsLayout>
    );
};

export default TestForm;
