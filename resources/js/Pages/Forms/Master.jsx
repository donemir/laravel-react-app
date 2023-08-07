import React, { useState } from "react";

import {
    Autocomplete,
    Button,
    ButtonGroup,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    FormControl,
    Radio,
    RadioGroup,
    Rating,
    Select,
    MenuItem,
    Slider,
    Switch,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { Box, Stack } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

import SignatureCanvas from "react-signature-canvas";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
];

export default function MasterForm() {
    const [age, setAge] = React.useState("");
    const [files, setFiles] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        // Form submission logic
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="p-8">
            <form onSubmit={handleSubmit}>
                {/* Autocomplete */}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Movie" />
                    )}
                />
                <h3 className="my-4 border-b-2">Buttons</h3>
                {/* Button */}
                <Stack spacing={2} direction="row">
                    <Button variant="text">Text</Button>
                    <Button variant="contained">Contained</Button>
                    <Button variant="outlined">Outlined</Button>
                </Stack>
                <h3 className="my-4 border-b-2">Buttons</h3>
                {/* Button Group */}
                <Stack direction="row" spacing={2}>
                    <Button color="secondary">Secondary</Button>
                    <Button variant="contained" color="success">
                        Success
                    </Button>
                    <Button variant="outlined" color="error">
                        Error
                    </Button>
                </Stack>
                <h3 className="my-4 border-b-2">Checkbox</h3>
                {/* Checkbox */}
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Label"
                    />
                    <FormControlLabel
                        required
                        control={<Checkbox />}
                        label="Required"
                    />
                    <FormControlLabel
                        disabled
                        control={<Checkbox />}
                        label="Disabled"
                    />
                </FormGroup>
                <Checkbox defaultChecked />
                <Checkbox />
                <Checkbox disabled />
                <Checkbox disabled checked />
                <Checkbox defaultChecked color="secondary" />
                <Checkbox defaultChecked color="success" />
                <Checkbox defaultChecked color="default" />
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                />
                <h3 className="my-4 border-b-2">Radio Group</h3>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                        Gender
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                        />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                        />
                        <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="other"
                        />
                    </RadioGroup>
                </FormControl>
                <h3 className="my-4 border-b-2">Rating</h3>
                <Rating />
                <h3 className="my-4 border-b-2">Select</h3>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <h3 className="my-4 border-b-2">Slider</h3>
                <Box>
                    <Slider
                        size="small"
                        defaultValue={70}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                    />
                    <Slider
                        defaultValue={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />
                </Box>
                <h3 className="my-4 border-b-2">File Uploader</h3>

                <FilePond
                    files={files}
                    onupdatefiles={setFiles}
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

                <h3 className="my-4 border-b-2">Switch</h3>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Label"
                    />
                    <FormControlLabel
                        required
                        control={<Switch />}
                        label="Required"
                    />
                    <FormControlLabel
                        disabled
                        control={<Switch />}
                        label="Disabled"
                    />
                </FormGroup>
                <h3 className="my-4 border-b-2">Text Field</h3>
                <Box m={2}>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        className="w-full block my-8"
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        className="w-full block my-8"
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        id="standard-basic"
                        label="Standard"
                        variant="standard"
                        className="w-full block my-8"
                    />
                </Box>
                <h3 className="my-4 border-b-2">Text Area</h3>
                <Box m={2}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        className="w-full"
                    />
                </Box>
                <Box m={2}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                    />
                </Box>
                <h3 className="my-4 border-b-2">ToggleButtonGroup</h3>
                <ToggleButtonGroup exclusive>
                    <ToggleButton value="toggle1">Toggle 1</ToggleButton>
                    <ToggleButton value="toggle2">Toggle 2</ToggleButton>
                    <ToggleButton value="toggle3">Toggle 3</ToggleButton>
                </ToggleButtonGroup>
                <h3 className="my-4 border-b-2">Signature</h3>
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        borderRadius: "4px",
                        display: "inline-block",
                    }}
                >
                    <SignatureCanvas
                        penColor="blue"
                        canvasProps={{
                            width: 500,
                            height: 200,
                            className: "sigCanvas",
                        }}
                    />
                </div>

                <h3 className="my-4 border-b-2">Submission</h3>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    );
}
