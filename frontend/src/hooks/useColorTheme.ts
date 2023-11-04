import { createTheme, PaletteMode } from "@mui/material";
import React, { useEffect } from "react";
import theme, { getDesignTokens } from "../assets/darkTheme";

export const useColorTheme = () => {

   if (!localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", "light");
   }
   const [mode, setMode] = React.useState<PaletteMode | string |null>(
      localStorage.getItem("darkMode")
   );

   const toggleColorMode = () => {
      if (localStorage.getItem("darkMode") === "light") {
         localStorage.setItem("darkMode", "dark");
         setMode("dark");
      } else if (localStorage.getItem("darkMode") === "dark") {
         localStorage.setItem("darkMode", "light");
         setMode("light");
      }
   };

   // const modifiedTheme = React.useMemo(
   //   () =>
   //     createTheme({
   //       ...theme,
   //       palette: {
   //         ...theme.palette,
   //         mode,
   //       },
   //     }),
   //   [mode]
   // );

   const modifiedTheme = React.useMemo(
      () => createTheme(getDesignTokens(mode)),
      [mode]
   );

   return {
      theme: modifiedTheme,
      mode,
      toggleColorMode,
   };
};
