import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
   Button,
   MenuItem,
   Tooltip,
   Avatar,
   Container,
   Menu,
   Typography,
   IconButton,
   Toolbar,
   Box,
   AppBar,
} from "@mui/material";

import AdbIcon from "@mui/icons-material/Description";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setTheme } from "../../redux/slices/themeSlices";
import { useLogoutMutation } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import {} from "react-redux";
import { setCheckAuth } from "../../redux/slices/checkAuthSlice";
import { useThemeContext } from "../../context/themeContextProvider";
import { IUserData } from "../../interfaces/IUserData";

const pages = [
   { title: "Home", link: "/" },
   { title: "Create quiz", link: "/create-test" },
   { title: "All quizes", link: "/tests" },
];

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
   const isAuth = useSelector((state: RootState) => state.userData.userData);
   const userData = localStorage.getItem("userData");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   // const userData: IUserData = useSelector(
   //    (state: RootState) => state.userData.userData
   // );
   // console.log("userData", userData);

   const [logout, { isLoading }] = useLogoutMutation();

   const { mode, toggleColorMode } = useThemeContext();

   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
      null
   );
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
   );

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleLogout = async () => {
      await logout();
      dispatch(setCheckAuth({ isAuth: false }));
      localStorage.removeItem("userData");
      navigate("/login");
      handleCloseNavMenu();
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
               <Link to={"/"}>
                  <Typography
                     variant="h6"
                     noWrap
                     sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                     }}
                  >
                     rent-gym
                  </Typography>
               </Link>

               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" },
                     }}
                  >
                     {pages.map((page, index) => {
                        return (
                           <Link
                              key={index}
                              to={page.link}
                              onClick={handleCloseNavMenu}
                           >
                              <MenuItem>
                                 <Typography textAlign="center">
                                    {page.title}
                                 </Typography>
                              </MenuItem>
                           </Link>
                        );
                     })}
                     {userData ? (
                        <Link to={"/logout"} onClick={handleLogout}>
                           <MenuItem>
                              <Typography textAlign="center">Logout</Typography>
                           </MenuItem>
                        </Link>
                     ) : (
                        <>
                           <Link to={"/register"} onClick={handleCloseNavMenu}>
                              <MenuItem>
                                 <Typography textAlign="center">
                                    Registration
                                 </Typography>
                              </MenuItem>
                           </Link>
                           <Link to={"/login"} onClick={handleCloseNavMenu}>
                              <MenuItem>
                                 <Typography textAlign="center">
                                    Login
                                 </Typography>
                              </MenuItem>
                           </Link>
                        </>
                     )}
                  </Menu>
               </Box>
               <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  LOGO
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page, index) => {
                     return (
                        <Link
                           key={index}
                           to={page.link}
                           onClick={handleCloseNavMenu}
                        >
                           <MenuItem>
                              <Typography textAlign="center">
                                 {page.title}
                              </Typography>
                           </MenuItem>
                        </Link>
                     );
                  })}
                  {userData ? (
                     <Link to={"/logout"} onClick={handleLogout}>
                        <MenuItem>
                           <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                     </Link>
                  ) : (
                     <>
                        <Link to={"/register"} onClick={handleCloseNavMenu}>
                           <MenuItem>
                              <Typography textAlign="center">
                                 Registration
                              </Typography>
                           </MenuItem>
                        </Link>
                        <Link to={"/login"} onClick={handleCloseNavMenu}>
                           <MenuItem>
                              <Typography textAlign="center">Login</Typography>
                           </MenuItem>
                        </Link>
                     </>
                  )}
               </Box>

               {userData ? (
                  <Typography sx={{ mr: "40px" }}>{userData}</Typography>
               ) : null}

               <Box sx={{ flexGrow: 0, mr: "20px" }}>
                  <IconButton onClick={toggleColorMode}>
                     {mode === "dark" ? (
                        <Brightness7Icon color="divider" />
                     ) : (
                        <Brightness4Icon color="divider"/>
                     )}
                  </IconButton>
               </Box>

               {/* <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                           alt="Remy Sharp"
                           src="/static/images/avatar/2.jpg"
                        />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: "45px" }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box> */}
            </Toolbar>
         </Container>
      </AppBar>
   );
}
export default Header;
