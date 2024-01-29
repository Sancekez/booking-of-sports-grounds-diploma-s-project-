import React from 'react'
import { Snackbar } from "../Snackbar/Snackbar";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Paper, Typography, TextField, Button, Alert, FormGroup , FormControlLabel, Checkbox, FormLabel, Grid, MenuItem, Stack} from "@mui/material";
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

         <div className="container">
               <Grid container spacing={3}>
               {/* Левая колонка с текстом "Условия аренды" */}
               <Grid item xs={6}>
                  <Typography variant="h5" sx={{ml: "100px"}}>Условия:</Typography>
                  <Typography variant="body1" sx={{ml: "100px"}}>1. Берем 10% с каждого бронирования вашей площадки.</Typography>
                  <Typography variant="body1" sx={{ml: "100px"}}>2. Не несем ответственность за нанесенный урон или ущерб вашей площадке.</Typography>
                  <Typography variant="body1" sx={{ml: "100px"}}>3. Не несем ответственность за поведение пользователей.</Typography>
                  <Typography variant="body1" sx={{ml: "100px"}}>4. Гарантируем безопасность платежей.</Typography>
                  <Typography variant="body1" sx={{ml: "100px"}}>5. Вы управляете стоимостью аренды ваших площадок.</Typography>
                  <Typography variant="body1" sx={{ml: "100px"}}>6. Модерация ложных отзывов и наготы.</Typography>
                  
               </Grid>

               {/* Правая колонка с вводом данных */}
               <Grid item xs={6}>
               <form>
                  <Paper
                     sx={{
                        width: "100%",
                        maxWidth: "600px",
                        p: "30px",
                        margin: "0 auto",
                        borderRadius: "20px",
                     }}
                     elevation={3}
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

                        <Grid container spacing={2}>
                        <Grid item xs={4}>
                           <Controller
                              name="area"
                              control={control}
                              rules={{ required: 'Площадь поля обязательна' }}
                              defaultValue=""
                              render={({ field }) => (
                              <TextField
                                 fullWidth
                                 id="area"
                                 type="number"
                                 label="Площадь поля (м²)"
                                 variant="standard"
                                 onChange={(e) => field.onChange(e)}
                                 value={field.value}
                                 color="secondary"
                                 error={!!errors.area?.message}
                                 helperText={errors.area?.message}
                                 sx={{ mb: '30px' }}
                              />
                              )}
                           />
                        </Grid>
                        <Grid item xs={4}>
                           <Controller
                              name="length"
                              control={control}
                              rules={{ required: 'Длина поля обязательна' }}
                              defaultValue=""
                              render={({ field }) => (
                              <TextField
                                 fullWidth
                                 id="length"
                                 type="number"
                                 label="Длина поля (м)"
                                 variant="standard"
                                 onChange={(e) => field.onChange(e)}
                                 value={field.value}
                                 color="secondary"
                                 error={!!errors.length?.message}
                                 helperText={errors.length?.message}
                                 sx={{ mb: '30px' }}
                              />
                              )}
                           />
                        </Grid>
                        <Grid item xs={4}>
                           <Controller
                              name="width"
                              control={control}
                              rules={{ required: 'Ширина поля обязательна' }}
                              defaultValue=""
                              render={({ field }) => (
                              <TextField
                                 fullWidth
                                 id="width"
                                 type="number"
                                 label="Ширина поля (м)"
                                 variant="standard"
                                 onChange={(e) => field.onChange(e)}
                                 value={field.value}
                                 color="secondary"
                                 error={!!errors.width?.message}
                                 helperText={errors.width?.message}
                                 sx={{ mb: '30px' }}
                              />
                              )}
                           />
                        </Grid>
                        </Grid>

                        <Controller
                           name="playgroundCover"
                           control={control}
                           defaultValue=""
                           render={({ field }) => (
                           <TextField
                              id="playground-cover"
                              select
                              label="Тип покрытия площадки"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              variant="standard"
                              sx={{ width: '100%', mb: '30px' }}
                           >
                              <MenuItem value="grass">Травяной покров</MenuItem>
                              <MenuItem value="artificialGrass">Искусственный газон</MenuItem>
                              <MenuItem value="asphalt">Асфальт</MenuItem>
                              <MenuItem value="concrete">Бетон</MenuItem>
                              <MenuItem value="rubberTiles">Плиты из резинового покрытия</MenuItem>
                              <MenuItem value="syntheticMaterial">Искусственный материал (пластик, резина)</MenuItem>
                              <MenuItem value="wood">Деревянное покрытие</MenuItem>
                           </TextField>
                           )}
                        />

                        <Controller
                           name="playgroundType"
                           control={control}
                           defaultValue=""
                           render={({ field }) => (
                           <div style={{ marginBottom: '30px' }}>
                              <FormLabel component="legend">Тип площадки</FormLabel>
                              <FormControlLabel
                                 control={
                                 <Checkbox
                                    checked={field.value.includes('indoor')}
                                    onChange={() => {
                                       const updatedTypes = field.value.includes('indoor')
                                       ? field.value.filter((type) => type !== 'indoor')
                                       : [...field.value, 'indoor'];
                                       field.onChange(updatedTypes);
                                    }}
                                 />
                                 }
                                 label="Крытая"
                              />
                              <FormControlLabel
                                 control={
                                 <Checkbox
                                    checked={field.value.includes('outdoor')}
                                    onChange={() => {
                                       const updatedTypes = field.value.includes('outdoor')
                                       ? field.value.filter((type) => type !== 'outdoor')
                                       : [...field.value, 'outdoor'];
                                       field.onChange(updatedTypes);
                                    }}
                                 />
                                 }
                                 label="Открытая"
                              />
                           </div>
                           )}
                        />

                        <FormLabel component="legend">Дополнительные атрибуты</FormLabel>
                        <FormGroup sx={{ mb: '30px' }}>
                           <FormControlLabel control={<Checkbox/>} label="Раздевалки" />
                           <FormControlLabel control={<Checkbox/>} label="Душевые" />
                           <FormControlLabel control={<Checkbox/>} label="Трибуны" />
                           <FormControlLabel control={<Checkbox/>} label="Освещение" />
                           <FormControlLabel control={<Checkbox/>} label="Парковка" />
                           <FormControlLabel control={<Checkbox/>} label="Инвентарь" />
                           <FormControlLabel control={<Checkbox/>} label="Поле с подогревом" />
                        </FormGroup>

                        <FormLabel component="legend">Виды спорта на вашей площадке</FormLabel>
                        <FormGroup sx={{ mb: '30px' }}>
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

                        <FormLabel component="legend">График работы</FormLabel>
                        <FormGroup sx={{ mb: '10px' }}>
                           <FormControlLabel control={<Checkbox/>} label="Понедельник" />
                           <FormControlLabel control={<Checkbox/>} label="Вторник" />
                           <FormControlLabel control={<Checkbox/>} label="Среда" />
                           <FormControlLabel control={<Checkbox/>} label="Четверг" />
                           <FormControlLabel control={<Checkbox/>} label="Пятница" />
                           <FormControlLabel control={<Checkbox/>} label="Суббота" />
                           <FormControlLabel control={<Checkbox/>} label="Воскресенье" />
                        </FormGroup>
                        
                        <Stack direction="row" spacing={2} sx={{ mb: '30px' }}>
                           <TextField
                           id="startOfWork"
                           type="time"
                           label="Начало"
                           defaultValue=""
                           InputLabelProps={{
                              shrink: true,
                           }}
                           inputProps={{
                              step: 300, // 5 minutes
                           }}
                           onChange={(e) => {
                              // Обновите значение в вашем state или контексте для начала рабочего дня
                           }}
                           />
                           <TextField
                           id="endOfWork"
                           type="time"
                           label="Конец"
                           defaultValue=""
                           InputLabelProps={{
                              shrink: true,
                           }}
                           inputProps={{
                              step: 300, // 5 minutes
                           }}
                           onChange={(e) => {
                              // Обновите значение в вашем state или контексте для конца рабочего дня
                           }}
                           />
                        </Stack>

                     

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
               </Grid>
               </Grid>
            </div>

       
    </>
 );
}
