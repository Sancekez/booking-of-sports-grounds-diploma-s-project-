import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITheme {
   dark: boolean;
}

const initialState: ITheme = {
   dark: false,
};

export const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      setTheme: (state, action: PayloadAction<boolean>) => {
         state.dark = action.payload ? !state.dark : state.dark;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
