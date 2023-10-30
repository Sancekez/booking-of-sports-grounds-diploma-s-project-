import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useThemeContext } from "../context/themeContextProvider";
import { SxProps } from "@mui/material";

interface IStyle {
   sx?: SxProps;
}

export default function CircularIndeterminate({ sx }: IStyle) {
   const { theme } = useThemeContext();

   return (
      <ThemeProvider theme={theme}>
         <Box
            color="background"
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               ...sx,
            }}
         >
            <CircularProgress
               color="darkTheme"
               sx={{ height: "100px", width: "100px" }}
            />
         </Box>
      </ThemeProvider>
   );
}
