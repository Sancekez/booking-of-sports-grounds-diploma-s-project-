import { useEffect, useState } from "react";
import TestItem from "../components/test-item/TestItem";
import { Box, Paper, Typography } from "@mui/material";
import { useGetQuizesQuery } from "../redux/api/userApi";
import LoadingSpiner from "../components/LoadingSpiner";

function Tests() {
   const { data, error, isLoading, refetch } = useGetQuizesQuery({});

   useEffect(() => {
      refetch();
      console.log(data);
   }, []);

   return (
      <Box sx={{ m: "40px 20px" }}>
         <Paper sx={{ borderRadius: "20px", p: "30px 20px" }} elevation={6}>
            <Typography variant="h6" textAlign={"center"} sx={{ mb: "50px" }}>
               All your created Quizes
            </Typography>
            {isLoading ? (
               <LoadingSpiner />
            ) : (
               data.map((quiz: IQuiz, index: number) => {
                  return <TestItem {...quiz} key={index} />;
               })
            )}
         </Paper>
      </Box>
   );
}

export default Tests;
