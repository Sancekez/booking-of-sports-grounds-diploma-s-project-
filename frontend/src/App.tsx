import Header from "./components/header/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import TestsPage from "./pages/TestsPage";
import CreateTestPage from "./pages/CreateTestPage";
import { Box } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useCheckAuthMutation } from "./redux/api/userApi";
import { setCheckAuth } from "./redux/slices/checkAuthSlice";
import { setUser } from "./redux/slices/userSlice";

import PriveteRoutes from "./utils/router/PriveteRoutes";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useThemeContext } from "./context/themeContextProvider";
import LoadingSpiner from "./components/LoadingSpiner";
import ReviewQuizPage from "./pages/ReviewQuizPage";

function App() {
   const [mutationsCompleted, setMutationsCompleted] = useState(false);
   const { theme } = useThemeContext();

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [checkAuth] = useCheckAuthMutation();

   useEffect(() => {
      if (localStorage.getItem("token")) {
         const fetchAuth = async () => {
            try {
               const response = await checkAuth();
               // Теперь обновляем состояние через Redux
               if (response.data) {
                  localStorage.setItem("token", response.data.accessToken);
                  dispatch(setCheckAuth({ ...response.data, isAuth: true }));
                  navigate("/");
               } else {
                  // console.log('error')
                  dispatch(setCheckAuth({ isAuth: false }));
                  localStorage.removeItem("userData");
               }
            } catch (error) {
               // Обработка ошибок
               console.log(error);
            } finally {
               setMutationsCompleted(true);
            }
         };

         fetchAuth();

         if (!localStorage.getItem("darkMode")) {
            localStorage.setItem("darkMode", "light");
         }
      } else {
         dispatch(setCheckAuth({ isAuth: false }));
         localStorage.removeItem("userData");
         setMutationsCompleted(true);
      }
   }, []);

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Header />
         <Box position={"static"} sx={{ position: "relative" }}>
            {!mutationsCompleted ? (
               <LoadingSpiner
                  sx={{
                     position: "fixed",
                     bottom: "0",
                     left: "0",
                     right: "0",
                     height: "100vh",
                     width: "100vw",
                  }}
               />
            ) : (
               <Routes>
                  {/* {private pages} */}
                  <Route element={<PriveteRoutes />}>
                     <Route path="/" element={<MainPage />} index />
                     <Route path="/create-test" element={<CreateTestPage />} />
                     <Route path="/tests" element={<TestsPage />} />
                     <Route path="/logout" element={<LoadingSpiner />} />
                     <Route path="/quiz/:id" element={<ReviewQuizPage />} />
                  </Route>

                  {/* {free pages} */}
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                     path="/login"
                     element={
                        <LoginPage
                           sx={{
                              position: "fixed",
                              bottom: "0",
                              left: "0",
                              right: "0",
                              height: "100vh",
                              width: "100vw",
                           }}
                        />
                     }
                  />
               </Routes>
            )}
         </Box>
      </ThemeProvider>
   );
}

export default App;
