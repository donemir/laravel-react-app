import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

import { Box, Paper, Typography, Button } from "@mui/material";
import { Card, CardActions, CardContent } from "@mui/material";
import { Icon } from "@iconify/react";

export default function Dashboard({ auth }) {
    const bull = (
        <Box
            component="span"
            sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
        >
            •
        </Box>
    );
    return (
        <DashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Box m={3}>
                <Card
                    elevation={0}
                    sx={{
                        minWidth: 275,
                        backgroundColor: "rgb(209, 233, 252)",
                        color: "rgb(6, 27, 100)",
                    }}
                >
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                            <Icon
                                icon="solar:home-line-duotone"
                                color="#2299bb"
                                width={40}
                            />
                            <Icon
                                icon="solar:home-bold-duotone"
                                color="#2299bb"
                                width={40}
                            />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
            <Box m={3}>
                <Card
                    variant="outlined"
                    sx={{
                        minWidth: 275,
                        backgroundColor: "rgb(255, 247, 205)",
                        color: "rgb(122, 79, 1)",
                    }}
                >
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>

            <Box m={3}>
                <h1 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Here is the spot
                </h1>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        m: 3,
                        width: 250,
                        height: 250,
                    },
                }}
            >
                <Paper elevation={2} />
                <Paper elevation={3} />
                <Paper elevation={5} />
                <Paper elevation={2} />
                <Paper elevation={4} />
                <Paper elevation={1} />
                <Paper />
                <Paper elevation={3} />
            </Box>
        </DashboardLayout>
    );
}
