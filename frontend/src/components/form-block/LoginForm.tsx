import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { useAuthUserMutation } from "../../redux/api/userApi";
import { setCheckAuth } from "../../redux/slices/checkAuthSlice";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "../LoadingSpiner";

import { ILoginInputs } from "../../interfaces/ILoginInputs";

import { useDispatch } from "react-redux";

import { Paper, TextField, Button, Typography, Alert } from "@mui/material";

import { loginValidation } from "../../assets/validation/validation";
import { setUser } from "../../redux/slices/userSlice";
import { useSetSnackbar } from "../../hooks/useSetSnackbar";
import { Snackbar } from "../Snackbar/Snackbar";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

interface IRes {
   error: FetchBaseQueryError | SerializedError | any;
}

export function FormBlockLogin() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [
      authUser, // This is the mutation trigger
      { isLoading }, // This is the destructured mutation result
   ] = useAuthUserMutation();
   const { handleOpen, message, handleClose } = useSetSnackbar();

   const onSubmit: SubmitHandler<ILoginInputs> = async (formData) => {
      try {
         const res: IRes = await authUser(formData);
         if (res?.error) {
            handleOpen(res.error.data.message);
         }

         if (res.data) {
            localStorage.setItem("token", res.data.accessToken);
            dispatch(setCheckAuth({ isAuth: true }));
            dispatch(setUser(res.data.user));
            navigate("/");
         }
      } catch (error) {
         console.log(error);
      }
   };

   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<ILoginInputs>();

   return (
      <>
         <Snackbar
            handleClose={handleClose}
            message={message}
            variant={"error"}
         />

         <form onSubmit={handleSubmit(onSubmit)}>
            <Paper
               sx={{
                  width: "100%",
                  maxWidth: "600px",
                  p: "30px",
                  margin: "0 auto",
                  borderRadius: "20px",
               }}
               elevation={7}
            >
               <Typography
                  variant="h5"
                  sx={{ textAlign: "center", mb: "40px", fontWeight: "700" }}
               >
                  Log In
               </Typography>
               <Controller
                  name="email"
                  control={control}
                  rules={loginValidation}
                  defaultValue=""
                  render={({ field }) => (
                     <TextField
                        id="f-1"
                        type="email"
                        autoFocus={true}
                        sx={{ width: "100%", mb: "30px" }}
                        variant="standard"
                        label={"Email"}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        color="secondary"
                        error={!!errors.email?.message}
                        helperText={errors.email?.message}
                        // {...register("email", {
                        //    pattern:
                        //       /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                        // })}
                     />
                  )}
               />

               {/* {errors.email?.message && "Last name is required"} */}
               <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Required to fill" }}
                  defaultValue=""
                  render={({ field }) => (
                     <TextField
                        id="f-2"
                        type="password"
                        autoFocus={true}
                        sx={{ width: "100%", mb: "30px" }}
                        variant="standard"
                        label={"Password"}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        color="secondary"
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                     />
                  )}
               />

               <Typography>
                  Don't have an accaunt? Go to the{" "}
                  <Link to={"/register"}>
                     <Typography
                        sx={{
                           fontWeight: "700",
                           display: "inline-block",
                           mb: "40px",
                           textDecoration: "underline",
                        }}
                     >
                        Registration
                     </Typography>
                  </Link>
               </Typography>

               <Button
                  variant="contained"
                  type="submit"
                  sx={{
                     display: "block",
                     margin: "0 auto",
                     paddingLeft: "40px",
                     paddingRight: "40px",
                  }}
                  disableElevation
               >
                  Log In
               </Button>
            </Paper>
         </form>
      </>
   );
}
