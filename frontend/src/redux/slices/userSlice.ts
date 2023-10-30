import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces/IUserData";

export interface AuthState {
   userData: IUserData;
}

const initialState: AuthState = {
   userData: {
      id: null,
      email: null,
      isActive: false,
   },
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<object>) => {
         localStorage.setItem("userData", action.payload.email);

         // state.userData.id = localStorage.getItem("userData").id;
         // state.userData.email = localStorage.getItem("userData").email;
         // state.userData.isActive = localStorage.getItem("userData").isActive;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
