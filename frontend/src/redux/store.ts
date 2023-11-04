import { configureStore } from "@reduxjs/toolkit";
import checkAuthReducer from "./slices/checkAuthSlice";
import themeReducer from "./slices/themeSlices";
import userReducer from "./slices/userSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./api/userApi";

export const store = configureStore({
   reducer: {
      isAuth: checkAuthReducer,
      darkMode: themeReducer,
      userData: userReducer,
      [userApi.reducerPath]: userApi.reducer,
   },

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
