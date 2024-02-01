import React, { useEffect } from "react";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
// import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useGetFieldsQuery } from "../redux/api/userApi";

import {
   Container,
   Grid,
   Paper,
   Typography,
   TextField,
   Button,
   MenuItem,
   FormControl,
   Divider,
   InputLabel,
   Checkbox,
   FormControlLabel,
   FormGroup,
} from "@mui/material";

const PlaygroundList = [
   {
      id: 1,
      name: "Площадка 1",
      price: "3500 тенге",
      address: "Улица 1",
      sport: "Футбол",
      coverage: "Газон",
      city: "Алматы",
   },
   {
      id: 2,
      name: "Площадка 2",
      price: "4000 тенге",
      address: "Улица 2",
      sport: "Теннис",
      coverage: "Асфальт",
      city: "Талдыкорган",
   },
];

const Filters = [
   { label: "Цена", value: "price" },
   { label: "Адрес", value: "address" },
   { label: "Вид спорта", value: "sport" },
   { label: "Покрытие", value: "coverage" },
];

const AdditionalFilters = [
   "Раздевалки",
   "Трибуны",
   "Душевые",
   "Парковка",
   "Инвентарь",
   "Поле с подогревом",
   "Освещение",
];

const cities = ["Алматы", "Талдыкорган", "Шымкент"];
const sports = ["Футбол", "Теннис", "Хоккей"];

function AllFieldsPage() {
   const {
      data = [],
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetFieldsQuery();

   useEffect(() => {
      refetch();
      const fetchData = async () => {
         console.log("data", data);
      };
      fetchData();
   }, []);

   const [sortBy, setSortBy] = React.useState("price");
   const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
   const [selectedCity, setSelectedCity] = React.useState("");
   const [selectedSport, setSelectedSport] = React.useState("");

   const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSortBy(event.target.value as string);
   };

   const handleFilterChange = (filter: string) => {
      const isFilterSelected = selectedFilters.includes(filter);

      if (isFilterSelected) {
         const updatedFilters = selectedFilters.filter(
            (selectedFilter) => selectedFilter !== filter
         );
         setSelectedFilters(updatedFilters);
      } else {
         setSelectedFilters([...selectedFilters, filter]);
      }
   };

   const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedCity(event.target.value as string);
   };

   const handleSportChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedSport(event.target.value as string);
   };

   return (
      <Container>
         <Grid container spacing={3} mt={3} mb={3}>
            <Grid item xs={12} md={8}>
               <Typography variant="h5" gutterBottom>
                  Список Площадок
               </Typography>

               {data ? (
                  data.map((playground) => (
                     <Paper
                        key={playground?.createdAt}
                        style={{
                           display: "flex",
                           marginBottom: "10px",
                           position: "relative",
                        }}
                     >
                        <img
                           src={`https://via.placeholder.com/300`}
                           alt={playground?.name}
                           style={{ maxWidth: "300px", marginRight: "10px" }}
                        />
                        <div style={{ flex: 1 }}>
                           {playground?.name && (
                              <Typography variant="h6">
                                 {playground?.name}
                              </Typography>
                           )}
                           {playground?.address && (
                              <Typography>
                                 Адрес: {playground?.address}
                              </Typography>
                           )}
                           {playground?.coverage && (
                              <Typography>
                                 Покрытие: {playground?.coverage}
                              </Typography>
                           )}
                           {playground?.city && (
                              <Typography>
                                 {" "}
                                 Город: {playground?.city}
                              </Typography>
                           )}

                           <Divider style={{ margin: "10px 5px 10px 0" }} />

                           <div style={{ margin: "5px" }}>
                              <strong> Имеется:</strong>
                              {playground?.selectedCheckboxes?.length &&
                                 playground.selectedCheckboxes.map(
                                    (item, index) => (
                                       <span>
                                          {item}
                                          {playground.selectedCheckboxes
                                             .length -
                                             1 ==
                                          index
                                             ? ""
                                             : ", "}
                                       </span>
                                    )
                                 )}
                           </div>
                           <div style={{ margin: "5px" }}>
                              <strong> Виды спорта:</strong>
                              {playground?.selectedSports?.length &&
                                 playground.selectedSports.map(
                                    (item, index) => (
                                       <span>
                                          {item}
                                          {playground.selectedSports.length -
                                             1 ==
                                          index
                                             ? ""
                                             : ", "}
                                       </span>
                                    )
                                 )}
                           </div>
                           <div style={{ margin: "5px" }}>
                              <strong> Дни работы:</strong>
                              {playground?.selectedWorkingDays?.length &&
                                 playground.selectedWorkingDays.map(
                                    (item, index) => (
                                       <span>
                                          {item}
                                          {playground.selectedWorkingDays
                                             .length -
                                             1 ==
                                          index
                                             ? ""
                                             : ", "}
                                       </span>
                                    )
                                 )}
                           </div>
                        </div>
                        {playground?.price && (
                           <div
                              style={{
                                 position: "absolute",
                                 bottom: "0px",
                                 left: "0px",
                                 background: "rgba(255, 255, 255, 0.8)",
                                 padding: "5px",
                              }}
                           >
                              <Typography>
                                 Цена: {playground?.price} ТГ
                              </Typography>
                           </div>
                        )}
                     </Paper>
                  ))
               ) : (
                  <span>Нет данных </span>
               )}
            </Grid>
            <Grid item xs={12} md={4}>
               {" "}
               <Typography variant="h5" gutterBottom>
                  Фильтрация
               </Typography>
               <TextField
                  select
                  label="Город"
                  value={selectedCity}
                  onChange={handleCityChange}
                  fullWidth
                  style={{ marginBottom: "10px" }}
               >
                  {cities.map((city) => (
                     <MenuItem key={city} value={city}>
                        {city}
                     </MenuItem>
                  ))}
               </TextField>
               <TextField
                  select
                  label="Вид спорта"
                  value={selectedSport}
                  onChange={handleSportChange}
                  fullWidth
                  style={{ marginBottom: "10px" }}
               >
                  {sports.map((sport) => (
                     <MenuItem key={sport} value={sport}>
                        {sport}
                     </MenuItem>
                  ))}
               </TextField>
               {/* <TextField
            label="Сортировка"
            value={sortBy}
            onChange={handleSortChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          >
            {Filters.map((filter) => (
              <MenuItem key={filter.value} value={filter.value}>
                {filter.label}
              </MenuItem>
            ))}
          </TextField> */}
               <Grid container spacing={2} style={{ marginBottom: "10px" }}>
                  <Grid item xs={6}>
                     <TextField label="Цена от" type="number" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                     <TextField label="Цена до" type="number" fullWidth />
                  </Grid>
               </Grid>
               <FormGroup>
                  <Grid container spacing={2}>
                     {AdditionalFilters.map((filter, index) => (
                        <Grid item xs={6} key={index}>
                           <FormControlLabel
                              control={
                                 <Checkbox
                                    checked={selectedFilters.includes(filter)}
                                    onChange={() => handleFilterChange(filter)}
                                    color="success"
                                 />
                              }
                              label={filter}
                           />
                        </Grid>
                     ))}
                  </Grid>
               </FormGroup>
               <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
               >
                  Применить фильтры
               </Button>
            </Grid>
         </Grid>
      </Container>
   );
}

export default AllFieldsPage;
