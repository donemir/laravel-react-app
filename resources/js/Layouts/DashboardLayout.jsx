import { useState } from "react";

import {
    Home as HomeIcon,
    Inbox as InboxIcon,
    Mail as MailIcon,
    ExpandMore as ExpandMoreIcon,
    ChevronRight as ChevronRightIcon,
    NotificationsNone as NotificationsNoneIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import { Icon } from "@iconify/react";

import {
    IconButton,
    Box,
    Paper,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    useMediaQuery,
    useTheme,
    Avatar,
    Typography,
    Menu,
    Badge,
    MenuItem,
} from "@mui/material";
import { Link } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Dashboard({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [openForms, setOpenForms] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const toggleDrawer = () => {
        setShowingNavigationDropdown(!showingNavigationDropdown);
    };

    const drawerWidth = isMobile ? "70%" : 280;
    const listItemStyles = {
        borderRadius: "8px",
        px: 2,
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
    };
    const subListItemStyles = {
        ...listItemStyles,
        borderRadius: "8px",
        pl: 6,
        py: 0.5,
    };
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setShowingNavigationDropdown(!showingNavigationDropdown);
    };

    const avatarImageUrl =
        "https://www.f4football.com/img/defaults/user_avatar.png";
    const userName = user.name; // Replace with the user's name

    const handleExpandForms = () => {
        setOpenForms(!openForms);
    };

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            {!isMobile && (
                <nav
                    className="navigation"
                    style={{
                        width: drawerWidth,
                        backgroundColor: "#f9fafb", // Convert hex to rgba with alpha 1 (fully opaque)
                        borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
                    }}
                >
                    {/* Your existing navigation content here */}
                </nav>
            )}
            <Drawer
                anchor="left"
                open={!isMobile || showingNavigationDropdown}
                onClose={toggleDrawer}
                variant={isMobile ? "temporary" : "persistent"}
                PaperProps={{
                    style: {
                        width: drawerWidth,
                        backgroundColor: "#f9fafb", // Convert hex to rgba with alpha 1 (fully opaque)
                        borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
                    },
                }}
            >
                <div className="px-2 py-8">
                    <Box display="flex" alignItems="center" mx={2} mb={4}>
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        p={2}
                        mx={2}
                        mb={4}
                        spacing={4}
                        bgcolor="#f5f5f5" // Highlight background color
                        borderRadius={4} // Rounded corners
                    >
                        <Avatar alt="User Avatar" src={avatarImageUrl} />
                        <Typography variant="h7" ml={2}>
                            {userName}
                        </Typography>
                    </Box>
                    <List>
                        <ListItem disableGutters sx={listItemStyles}>
                            <ListItemIcon
                                sx={{ minWidth: "auto", marginRight: 1 }}
                            >
                                <Icon
                                    icon="solar:home-bold-duotone"
                                    color="#2299bb"
                                    width={24}
                                />
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    marginBottom: 0,
                                    fontFamily: "Public Sans, sans-serif",
                                }}
                                primary="Home"
                            />
                        </ListItem>
                        <Link
                            href="/forms"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItem button disableGutters sx={listItemStyles}>
                                <ListItemIcon
                                    sx={{ minWidth: "auto", marginRight: 1 }}
                                >
                                    <Icon
                                        icon="fluent:form-48-regular"
                                        color="#2299bb"
                                        width={24}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        marginBottom: 0,
                                        fontFamily: "Public Sans, sans-serif",
                                    }}
                                    primary="Entries"
                                />
                            </ListItem>
                        </Link>

                        <ListItem
                            button
                            disableGutters
                            sx={listItemStyles}
                            onClick={handleExpandForms}
                        >
                            <ListItemIcon
                                sx={{ minWidth: "auto", marginRight: 1 }}
                            >
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    style: {
                                        fontFamily: "Public Sans, sans-serif",
                                    },
                                }}
                                primary="Forms"
                            />
                            {openForms ? (
                                <ExpandMoreIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </ListItem>
                        <Collapse in={openForms} timeout="auto" unmountOnExit>
                            <ListItem button sx={subListItemStyles}>
                                <ListItemText>
                                    <Typography variant="body2">
                                        Form1
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem button sx={subListItemStyles}>
                                <ListItemText>
                                    <Typography variant="body2">
                                        Form2
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem button sx={subListItemStyles}>
                                <ListItemText>
                                    <Typography variant="body2">
                                        Form3
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </Collapse>
                    </List>
                </div>
            </Drawer>
            <main
                className="min-h-full main pb-16"
                style={{
                    marginLeft: isMobile ? 0 : drawerWidth,
                    backgroundColor: "#f9fafb",
                }}
            >
                <Box
                    position="sticky"
                    top={0}
                    zIndex={1}
                    p={isMobile ? 2 : 4}
                    bgcolor="rgba(249, 250, 251, 0.8);" // White with 50% transparency
                    sx={{
                        backdropFilter: "blur(1px)",
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box>
                            {isMobile && (
                                <IconButton
                                    color="primary"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1,
                                        p: 2,
                                        mr: 2,
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box mr={2}>
                                {/* Notification Icon */}
                                <Badge badgeContent={3} color="primary">
                                    <NotificationsNoneIcon fontSize="medium" />
                                </Badge>
                            </Box>
                            <Box>
                                {/* Dropdown Menu */}
                                <Avatar
                                    alt="User Avatar"
                                    src={avatarImageUrl}
                                    onClick={handleOpenMenu}
                                    sx={{ cursor: "pointer" }}
                                />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    sx={{
                                        "& .MuiMenu-paper": {
                                            minWidth: "200px", // Set the desired width here
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleCloseMenu}>
                                        Something
                                    </MenuItem>
                                    <Link
                                        href={route("profile.edit")}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <MenuItem onClick={handleCloseMenu}>
                                            Profile
                                        </MenuItem>
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                        method="post"
                                    >
                                        <MenuItem onClick={handleCloseMenu}>
                                            Logout
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* Your main content here */}
                <Box mt={8}>{children}</Box>
            </main>
        </div>
    );
}
