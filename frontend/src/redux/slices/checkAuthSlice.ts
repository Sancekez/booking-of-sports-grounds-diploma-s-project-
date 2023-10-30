import { store } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useCheckAuthMutation } from "../api/userApi";
import { IUser } from "../../interfaces/IUser";

export interface isAuthState {
   isAuth: boolean;
   userData: IUser | null | void;
}

const initialState: isAuthState = {
   isAuth: false,
   userData: null,
};

export const checkAuthSlice = createSlice({
   name: "checkAuth",
   initialState,
   reducers: {
      setCheckAuth: (state, action: PayloadAction<isAuthState>) => {
         // console.log(action.payload);

         state.isAuth = action.payload.isAuth;
         state.userData = action.payload.user;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setCheckAuth } = checkAuthSlice.actions;

export default checkAuthSlice.reducer;
