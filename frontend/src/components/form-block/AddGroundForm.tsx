import React from 'react'
import { Snackbar } from "../Snackbar/Snackbar";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Paper, Typography, TextField, Button, Alert, FormGroup , FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { useSetSnackbar } from "../../hooks/useSetSnackbar";
import { Link } from "react-router-dom";
import { IAddGroundInputs } from "../../interfaces/IAddGroundInputs";

export default function AddGroundForm() {

    const { handleClose, message, handleOpen } = useSetSnackbar();
    const {
       handleClose: handleCloseError,
       message: messageError,
       handleOpen: handleOpenError,
    } = useSetSnackbar();

    const {
        add,
        handleSubmit,
        reset,
        control,
        formState: { errors },
     } = useForm<IAddGroundInputs>();

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

       <form>
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
                Заявка на добавление вашей площадки
             </Typography>
             <Controller
                name="number"
                control={control}
                rules={""}
                defaultValue=""
                render={({ field }) => (
                   <TextField
                      id="f-1"
                      type="text"
                      autoFocus={true}
                      sx={{ width: "100%", mb: "30px" }}
                      variant="standard"
                      label={"Телефон"}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      color="secondary"
                      error={!!errors.name?.message}
                      helperText={errors.name?.message}
                   />
                )}
             />
             <Controller
                name="email"
                control={control}
                rules={""}
                defaultValue=""
                render={({ field }) => (
                   <TextField
                      id="f-2"
                      type="email"
                      sx={{ width: "100%", mb: "30px" }}
                      variant="standard"
                      label={"Эл. почта"}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      color="secondary"
                      error={!!errors.surname?.message}
                      helperText={errors.surname?.message}
                   />
                )}
             />

             <Controller
                name="fullname"
                control={control}
                rules={""}
                defaultValue=""
                render={({ field }) => (
                   <TextField
                      id="f-3"
                      type="text"
                      sx={{ width: "100%", mb: "30px" }}
                      variant="standard"
                      label={"ФИО"}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      color="secondary"
                      error={!!errors.password?.message}
                      helperText={errors.password?.message}
                   />
                )}
             />

             <Controller
                name="name"
                control={control}
                rules={""}
                defaultValue=""
                render={({ field }) => (
                   <TextField
                      id="f-3"
                      type="text"
                      sx={{ width: "100%", mb: "30px" }}
                      variant="standard"
                      label={"Название площадки"}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      color="secondary"
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                   />
                )}
             />
             <Controller
                name="address"
                control={control}
                rules={""}
                defaultValue=""
                render={({ field }) => (
                   <TextField
                      id="f-3"
                      type="text"
                      sx={{ width: "100%", mb: "30px" }}
                      variant="standard"
                      label={"Адрес площадки"}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      color="secondary"
                      error={!!errors.password?.message}
                      helperText={errors.password?.message}
                   />
                )}
             />


                <FormLabel component="legend">Виды спорта на вашей площадке</FormLabel>
                <FormGroup>
                    <FormControlLabel control={<Checkbox/>} label="Футбол" />
                    <FormControlLabel control={<Checkbox/>} label="Волейбол" />
                    <FormControlLabel control={<Checkbox/>} label="Пляжный волейбол" />
                    <FormControlLabel control={<Checkbox/>} label="Баскетбол" />
                    <FormControlLabel control={<Checkbox/>} label="Теннис" />
                    <FormControlLabel control={<Checkbox/>} label="Настольный теннис" />
                    <FormControlLabel control={<Checkbox/>} label="Бадминтон" />
                    <FormControlLabel control={<Checkbox/>} label="Сквош" />
                    <FormControlLabel control={<Checkbox/>} label="Хоккей" />
                </FormGroup>



            

             <Typography
                sx={{
                   fontWeight: "500",
                   margin: "10px 0 40px",
                }}
             >
                Нажимая кнопку «Отправить» вы соглашаетесь с{" "}
                <Link to={"*"}>
                   <Typography
                      sx={{
                         fontWeight: "700",
                         textDecoration: "underline",
                         display: "inline-block",
                      }}
                   >
                      политикой конфиденциальности
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
                Отправить
             </Button>
          </Paper>
       </form>
    </>
 );
}
