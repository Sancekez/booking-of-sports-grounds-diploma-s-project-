import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
   useRegisterUserMutation,
   useAuthUserMutation,
} from "../../redux/api/userApi";
import { CustomSelect } from "../select/CustomSelect";
import { Link } from "react-router-dom";
import { Paper, Typography, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { IRegisterInputs } from "../../interfaces/IRegisterInputs";
import { loginValidation } from "../../assets/validation/validation";
import { Snackbar } from "../Snackbar/Snackbar";
import { useSetSnackbar } from "../../hooks/useSetSnackbar";

export function FormBlockRegister() {
   const { handleClose, message, handleOpen } = useSetSnackbar();
   const {
      handleClose: handleCloseError,
      message: messageError,
      handleOpen: handleOpenError,
   } = useSetSnackbar();

   const {
      register,
      handleSubmit,
      reset,
      control,
      formState: { errors },
   } = useForm<IRegisterInputs>();

   const [
      registerUser, // This is the mutation trigger
      { isLoading }, // This is the destructured mutation result
   ] = useRegisterUserMutation();

   const onSubmit: SubmitHandler<IRegisterInputs> = async (formData) => {
      try {
         const { data } = await registerUser(formData);
         handleOpen(data.message);
         reset();
      } catch (error) {
         handleOpenError('Unforeseen problem. Please try again in a few seconds.');
      }
   };

   return (
      <>
         <Snackbar
            handleClose={handleClose}
            message={message}
            variant="success"
         />

         <Snackbar
            handleClose={handleCloseError}
            message={messageError}
            variant="error"
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
                  Регистрация
               </Typography>
               <Controller
                  name="fullname"
                  control={control}
                  rules={loginValidation}
                  defaultValue=""
                  render={({ field }) => (
                     <TextField
                        id="f-1"
                        type="text"
                        autoFocus={true}
                        sx={{ width: "100%", mb: "30px" }}
                        variant="standard"
                        label={"Имя пользователя"}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        color="secondary"
                        error={!!errors.name?.message}
                        helperText={errors.name?.message}
                     />
                  )}
               />
               <Controller
                  name="phone"
                  control={control}
                  rules={loginValidation}
                  defaultValue=""
                  render={({ field }) => (
                     <TextField
                        id="f-2"
                        type="text"
                        sx={{ width: "100%", mb: "30px" }}
                        variant="standard"
                        label={"Телефон"}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        color="secondary"
                        error={!!errors.surname?.message}
                        helperText={errors.surname?.message}
                     />
                  )}
               />

               <Controller
                  name="email"
                  control={control}
                  rules={loginValidation}
                  defaultValue=""
                  render={({ field }) => (
                     <TextField
                        id="f-3"
                        type="email"
                        sx={{ width: "100%", mb: "30px" }}
                        variant="standard"
                        label={"Эл. почта"}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        color="secondary"
                        error={!!errors.email?.message}
                        helperText={errors.email?.message}
                     />
                  )}
               />
               <Controller
                  name="password"
                  control={control}
                  rules={loginValidation}
                  defaultValue=""
                  render={({ field }) => (
                     <TextField
                        id="f-3"
                        type="password"
                        sx={{ width: "100%", mb: "30px" }}
                        variant="standard"
                        label={"Пароль"}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        color="secondary"
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                     />
                  )}
               />
               {/* <Controller
                  name="rule"
                  control={control}
                  rules={loginValidation}
                  defaultValue=""
                  render={({ field }) => (
                     <CustomSelect
                        sx={{ mb: "30px" }}
                        field={field}
                        errors={!!errors.rule?.message}
                        data={{
                           options: ["Student", "Teacher"],
                           inputLabel: "Student or Teacher?",
                           labelId: "rule",
                        }}
                     />
                  )}
               /> */}

               <Typography
                  sx={{
                     fontWeight: "500",
                     margin: "10px 0 40px",
                  }}
               >
                  Уже зарегестрированы?{" "}
                  <Link to={"/login"}>
                     <Typography
                        sx={{
                           fontWeight: "700",
                           textDecoration: "underline",
                           display: "inline-block",
                        }}
                     >
                        Войти
                     </Typography>
                  </Link>
                  .
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
                  Зарегестрироваться
               </Button>
            </Paper>
         </form>
      </>
   );
}
