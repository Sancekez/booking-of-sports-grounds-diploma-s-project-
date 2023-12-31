import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const TestItem: FC<IQuiz> = ({ questions, title, createdAt, _id }: IQuiz) => {
   const date = new Date(createdAt);

   // Получить день, месяц и год
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяц начинается с 0, поэтому добавляем 1 и форматируем
   const day = String(date.getDate()).padStart(2, "0");

   // Получить часы, минуты и секунды
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");

   const formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`;

   return (
      <Link to={`/quiz:${_id}`}>
         <Box
            sx={{
               border: "1px solid",
               borderColor: "primary.main",
               borderRadius: "20px",
               p: "20px",
               mb: "30px",
               transition: "all .3s",
               "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "primary.main",
                  transition: "all .3s",
                  color: "#fff",
               },
            }}
         >
            <Typography sx={{ mb: "20px" }}>{title}</Typography>

            <Box>Count of questions in quiz: {questions.length}</Box>
            <Box>Created: {formattedDate}</Box>
         </Box>
      </Link>
   );
};

export default TestItem;
