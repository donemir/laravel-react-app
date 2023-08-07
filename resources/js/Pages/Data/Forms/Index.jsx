import React, { useEffect, useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function Dashboard({ auth }) {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false); // Add this state to track loading

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const fetchData = async (page) => {
        setLoading(true); // Set loading state to true when starting fetch
        try {
            const response = await axios.get("/api/forms", {
                params: {
                    page: page,
                    per_page: rowsPerPage,
                },
            });

            setData(response.data);
            if (Array.isArray(response.data.data)) {
                setItems(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false); // Set loading state to false when done fetching
    };

    useEffect(() => {
        fetchData(page);
    }, [page, rowsPerPage]);

    return (
        <DashboardLayout user={auth.user}>
            <div>
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h1>Form Data List</h1>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Form ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email Address</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                align="center"
                                            >
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        items.map((form) => {
                                            const formDataObj = JSON.parse(
                                                form.form_data
                                            );
                                            return (
                                                <TableRow key={form.id}>
                                                    <TableCell>
                                                        {form.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formDataObj.firstName ||
                                                            "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formDataObj.lastName ||
                                                            "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formDataObj.emailAddress ||
                                                            "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            component={Link}
                                                            href={`/forms/${form.id}`}
                                                        >
                                                            Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={data?.total || 0}
                            page={data?.current_page - 1 || 0}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[10, 25, 50]}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
