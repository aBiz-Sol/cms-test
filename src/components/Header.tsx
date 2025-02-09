import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  Avatar,
  Box,
  Container,
  Divider,
  ListItemIcon,
  ListItemText,
  Switch,
  Grid,
  Card,
  CardActionArea,
  useTheme,
  CardMedia,
  MenuItem,
  Link,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  ExitToApp as LogoutIcon,
  Code as CodeIcon,
  Web as WebIcon,
  PhoneAndroid as MobileIcon,
  DataUsage as DataIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  ExitToApp,
} from "@mui/icons-material";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [getStartedAnchorEl, setGetStartedAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const [bloggingMode, setBloggingMode] = useState(false);
  const [user, setUser] = useState({ firstName: "Zain", lastName: "Shoukat" });

  // Dummy data for logo and links (simulating backend data)
  const logoUrl =
    "https://img.freepik.com/premium-vector/free-vector-beautiful-flying-hummingbird-design-element-banners-posters-leaflets-brochur_1009653-1.jpg"; // Replace with your logo URL

  // Dummy data for dropdown sections
  const dropdownSections = [
    {
      title: "Our Services",
      icon: <CodeIcon />,
      items: [
        {
          name: "Software Development",
          icon: <CodeIcon />,
          description: "Build scalable and robust software solutions.",
          link: "/software-development",
        },
        {
          name: "Web Development",
          icon: <WebIcon />,
          description: "Create stunning and responsive websites.",
          link: "/web-development",
        },
        {
          name: "Mobile Development",
          icon: <MobileIcon />,
          description: "Develop high-performance mobile apps.",
          link: "/mobile-development",
        },
        {
          name: "Data Science and AI",
          icon: <DataIcon />,
          description: "Leverage data to drive intelligent decisions.",
          link: "/data-science-ai",
        },
      ],
    },
    {
      title: "Resources",
      icon: <SettingsIcon />,
      items: [
        {
          name: "Documentation",
          icon: <HelpIcon />,
          description: "Explore our comprehensive documentation.",
          link: "/docs",
        },
        {
          name: "Changelog",
          icon: <HelpIcon />,
          description: "Stay updated with the latest changes.",
          link: "/changelog",
        },
        {
          name: "Community",
          icon: <HelpIcon />,
          description: "Join our vibrant community of developers.",
          link: "/community",
        },
        {
          name: "Blog",
          icon: <HelpIcon />,
          description: "Read insightful articles from our team.",
          link: "/blog",
        },
      ],
    },
  ];

  // Handle dropdown menu open/close on hover
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleGetStartedMenuOpen = (event: any) => {
    setGetStartedAnchorEl(event.currentTarget);
  };

  const handleGetStartedMenuClose = () => {
    setGetStartedAnchorEl(null);
  };
  // Toggle login/logout state
  const toggleLogin = () => {
    setUserMenuAnchorEl(null); // Close user menu
    setGetStartedAnchorEl(null); // Close get started dropdown
    setLoggedIn(!loggedIn);
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // User has scrolled
      } else {
        setIsScrolled(false); // User is at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <AppBar
      position="sticky"
      sx={{
        background: isScrolled
          ? "rgba(30, 60, 114, 0.8)" // Semi-transparent when scrolled
          : "linear-gradient(to right, #1e3c72, #2a5298)", // Gradient at top
        boxShadow: isScrolled ? theme.shadows[3] : "none",
        padding: "10px 0",
        transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          {/* Logo from backend */}
          <Link
            href="/preview/home"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={logoUrl}
              alt="Logo"
              style={{ height: "40px", marginRight: "20px", cursor: "pointer" }}
            />
          </Link>

          {/* Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {/* Services Button (No Dropdown Icon) */}
            <Box onMouseEnter={handleMenuOpen} sx={{ position: "relative" }}>
              <Button
                color="inherit"
                sx={{ textTransform: "none" }}
                href="/preview/services"
              >
                Services
              </Button>
              <Menu
                onMouseLeave={handleMenuClose}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    width: "90%", // Almost full width
                    maxWidth: "1200px", // Maximum width
                    padding: "20px",
                    marginTop: "10px",
                    borderRadius: "8px",
                  },
                }}
                sx={{
                  pointerEvents: "none", // Prevent closing when hovering over the menu
                }}
                MenuListProps={{
                  onMouseEnter: () => setAnchorEl(anchorEl), // Keep menu open when hovering over it
                  onMouseLeave: handleMenuClose, // Close menu when mouse leaves
                  sx: { pointerEvents: "auto" }, // Enable pointer events for the menu content
                }}
              >
                <Grid container spacing={4}>
                  {/* Image on the Left Side */}
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        marginBottom: "20px",
                        "&:hover": { boxShadow: theme.shadows[6] },
                      }}
                    >
                      <CardActionArea
                        href="/promotion"
                        sx={{ padding: "10px" }}
                      >
                        <CardMedia
                          component="img"
                          height="294"
                          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH1y9MCT__cbtZM7khFPN6th-sOr2BIlb6og&s"
                          alt="Promotion"
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>

                  {/* Services Section */}
                  <Grid item xs={12} md={4}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CodeIcon />{" "}
                      <span style={{ marginLeft: "10px" }}>Our Services</span>
                    </Typography>
                    <Divider sx={{ marginBottom: "10px" }} />
                    {dropdownSections[0].items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        sx={{
                          marginBottom: "10px",
                          "&:hover": { boxShadow: theme.shadows[6] },
                        }}
                      >
                        <CardActionArea
                          href={item.link}
                          sx={{ padding: "10px" }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Box>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Grid>

                  {/* Resources Section */}
                  <Grid item xs={12} md={4}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SettingsIcon />{" "}
                      <span style={{ marginLeft: "10px" }}>Resources</span>
                    </Typography>
                    <Divider sx={{ marginBottom: "10px" }} />
                    {dropdownSections[1].items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        sx={{
                          marginBottom: "10px",
                          "&:hover": { boxShadow: theme.shadows[6] },
                        }}
                      >
                        <CardActionArea
                          href={item.link}
                          sx={{ padding: "10px" }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Box>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Grid>
                </Grid>
              </Menu>
            </Box>

            {/* Pricing Button (No Dropdown) */}
            <Button
              color="inherit"
              sx={{ textTransform: "none" }}
              href="/preview/pricing"
            >
              Pricing
            </Button>
            <Button
              color="inherit"
              sx={{ textTransform: "none" }}
              href="/preview/contact"
            >
              Contact
            </Button>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Blogging Mode Toggle */}
            {bloggingMode ? (
              <>
                <Typography variant="body1" sx={{ marginRight: "10px" }}>
                  Get Started
                </Typography>
              </>
            ) : (
              // Get Started Dropdown when blogging mode is OFF
              <>
                {!loggedIn && (
                  <>
                    <Button
                      color="inherit"
                      onClick={handleGetStartedMenuOpen}
                      sx={{ textTransform: "none" }}
                    >
                      Get Started
                    </Button>
                    <Menu
                      anchorEl={getStartedAnchorEl}
                      open={Boolean(getStartedAnchorEl)}
                      onClose={handleGetStartedMenuClose}
                    >
                      <MenuItem onClick={toggleLogin}>
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>Sign In</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => (window.location.href = "/signup")}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>Sign Up</ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </>
            )}

            {/* User Profile */}
            {loggedIn ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* Avatar with dropdown */}
                  <Avatar
                    sx={{
                      bgcolor: "orange",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={(event) => {
                      if (loggedIn) {
                        setUserMenuAnchorEl(event.currentTarget);
                      }
                    }}
                  >
                    {`${user.firstName[0]}${user.lastName[0]}`}
                  </Avatar>

                  {/* Avatar Dropdown Menu */}
                  <Menu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={() => setUserMenuAnchorEl(null)}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setUserMenuAnchorEl(null);
                        toggleLogin(); // Logout action
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
