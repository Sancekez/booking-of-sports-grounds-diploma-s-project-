import { PaletteMode } from "@mui/material";
import { amber, grey, blue, green } from "@mui/material/colors";

const theme = {
   palette: {
      primary: amber,
   },
};


export const getDesignTokens = (mode: PaletteMode) => ({
   palette: {
      mode,
      ...(mode === "light"
         ? {
              // palette values for light mode
              primary: {
                 main: blue[500],
              },
              divider: "#000",
              secondary: {
                 main: blue[500],
              },
              darkTheme: {
                 main: blue[500],
              },
              text: {
                 primary: "#000",
                 //  secondary: grey[800],
              },
              background: {
                 // paper: "#888",
              },
              success: {
                 main: "#54ac68",
                 contrastText: "#fff",
              },
           }
         : {
              // palette values for dark mode
              primary: {
                 main: "#000",
              },
              secondary: {
                 main: "#fff",
              },
              divider: "#444",
              darkTheme: {
                 main: "#fff",
              },
              background: {
                 default: "rgba(0, 0, 0, 0.7)",
                 //  paper: "#111",
              },
              text: {
                 primary: "#fff",
                 secondary: grey[500],
              },
              success: {
                 main: "#4fc172",
                 contrastText: "#000",
              },
           }),
   },
});

export default theme;
