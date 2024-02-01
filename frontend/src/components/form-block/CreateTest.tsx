import React, { ChangeEvent, useState } from "react";
import {
   Box,
   Button,
   Container,
   FormControlLabel,
   List,
   ListItem,
   Paper,
   Radio,
   RadioGroup,
   TextField,
   Typography,
   IconButton,
   Slide,
   Grid,
} from "@mui/material";
import { Delete, Edit, Close, AddCircle } from "@mui/icons-material";

import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@mui/icons-material";


import {
   DragDropContext,
   Draggable,
   DropResult,
   Droppable,
   resetServerContext,
} from "react-beautiful-dnd";
import { CSSTransition } from "react-transition-group";
import { useCreateQuizMutation } from "../../redux/api/userApi";
import { Snackbar } from "../Snackbar/Snackbar";
import { useSetSnackbar } from "../../hooks/useSetSnackbar";

interface Answer {
   answer: string;
   correct: boolean;
}

interface Question {
   question: string;
   answers: Answer[];
}

interface Playground {
   id: number;
   name: string;
   price: string;
   address: string;
   sport: string;
   coverage: string;
   city: string;
   rating: string;
   area: string;
   shower: string;
   light: string;
 }
 

export const CreateTest: React.FC = () => {
   const [questions, setQuestions] = useState<Question[]>([]);
   const [currentQuestion, setCurrentQuestion] = useState<string>("");
   const [quizTitle, setQuizTitle] = useState<string>("");
   const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
   const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(-1);
   const [editingQuestionIndex, setEditingQuestionIndex] = useState<number>(-1);
   const { handleClose, message, handleOpen } = useSetSnackbar();
   resetServerContext();

   const [createQuiz] = useCreateQuizMutation();

   const handleQuestionChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setCurrentQuestion(event.target.value);
   };

   const handleQuizTitleChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setQuizTitle(event.target.value);
   };

   const handleAnswerChange = (
      index: number,
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const newAnswers = [...currentAnswers];
      newAnswers[index] = { answer: event.target.value, correct: false };
      setCurrentAnswers(newAnswers);
   };

   const handleAddAnswer = () => {
      setCurrentAnswers([...currentAnswers, { answer: "", correct: false }]);
   };

   const handleAddQuestion = () => {
      const isEmptyAnswer = currentAnswers.filter((item) => {
         return !item.answer.length ? item : null;
      });

      if (
         currentQuestion &&
         currentAnswers.length >= 2 &&
         correctAnswerIndex !== -1 &&
         !isEmptyAnswer.length
      ) {
         const newQuestion: Question = {
            question: currentQuestion,
            answers: currentAnswers,
         };

         setQuestions([...questions, newQuestion]);
         setCurrentQuestion("");
         setCurrentAnswers([]);
         setCorrectAnswerIndex(-1);
      }
   };

   const handleDeleteQuestion = (index: number) => {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
   };

   const handleDragEnd = (result: DropResult) => {
      if (!result.destination) return;

      const reorderedQuestions = Array.from(questions);
      const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1);
      reorderedQuestions.splice(result.destination.index, 0, movedQuestion);

      setQuestions(reorderedQuestions);
   };


   const [tempCorrectAnswerIndex, setTempCorrectAnswerIndex] =
      useState<number>(-1);

   const handleEditQuestion = (index: number) => {
      setEditingQuestionIndex(index);
      const editedQuestion = questions[index];
      setCurrentQuestion(editedQuestion.question);
      setCurrentAnswers(editedQuestion.answers);
      setTempCorrectAnswerIndex(
         editedQuestion.answers.findIndex((answer) => answer.correct)
      );
   };

      

   const handleSaveEditedQuestion = () => {
      if (
         currentQuestion &&
         currentAnswers.length >= 2 &&
         tempCorrectAnswerIndex !== -1 &&
         editingQuestionIndex !== -1
      ) {
         const editedQuestion: Question = {
            question: currentQuestion,
            answers: currentAnswers,
         };

         const updatedQuestions = [...questions];
         updatedQuestions[editingQuestionIndex] = editedQuestion;

         setQuestions(updatedQuestions);
         setCurrentQuestion("");
         setCurrentAnswers([]);
         setCorrectAnswerIndex(-1);
         setEditingQuestionIndex(-1);
         setTempCorrectAnswerIndex(-1);

         // Обновляем correctAnswerIndex только если tempCorrectAnswerIndex не равен -1
         setCorrectAnswerIndex(tempCorrectAnswerIndex);
      }
   };

   const playground = [
      {
        id: 1,
        name: "Площадка 1",
        price: "8000 тенге",
        address: "Алтынасарина 67",
        sport: "Футбол",
        coverage: "Газон",
        city: "Алматы",
        rating: " 4.5",
        area: " 100 x 68",
        shower: " Есть",
        light: " Есть ",
        monday: "круглосуточно",
        tuesday: "круглосуточно",
        wednesday: "круглосуточно",
        thursday: "круглосуточно",
        friday: "круглосуточно",
        saturday: "круглосуточно",
        sunday: "круглосуточно",
        intro: "Добро пожаловать в нашу сеть спортивных залов! Мы стремимся создать для вас максимально комфортные условия для занятий спортом, независимо от ваших предпочтений и уровня подготовки. Наша сеть предлагает широкий спектр залов для проведения тренировок по различным видам спорта, включая баскетбол, волейбол, теннис, футбол и многое другое. Мы гордимся высоким качеством наших спортивных площадок, обеспечивая безопасное и эффективное занятие спортом."
      },

    ];

   const [currentSlide, setCurrentSlide] = useState(0);

   const images = [
      "https://via.placeholder.com/1200x800/FF5733",
      "https://via.placeholder.com/1200x800/33FF57",
      "https://via.placeholder.com/1200x800/5733FF"
    ];

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
  


   return (
      <>
<Container>

  <Grid container spacing={3} >
      
      {playground.map((item) => (
        <Grid item xs={14} md={13} key={item.id}>
           
          <Box display="flex"  flexDirection={{ xs: "column", md: "row" }}>
            {/* Слайдер */}
            <Box
              flex={2}
              mr={{ xs: 0, md: 2 }}
              mb={{ xs: 2, md: 0 }}
              style={{ width: 1200, height: 600, position: "relative" }}
            >
              <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                {/* Отображение текущего изображения */}
                <img
                  src={images[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "5px" }}
                />
              </div>         
              {/* Кнопки для переключения слайдов */}
              <Box position="absolute" top="50%" left={0} right={0} textAlign="center">
                <IconButton onClick={prevSlide}
                style={{ position: "absolute", top: "50%", left: "0", transform: "translateY(-50%)", zIndex: 1 }}>
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={nextSlide}
                style={{ position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)", zIndex: 1 }}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>
         
            {/* Данные о площадке */}

            <Paper 
            sx={{
            maxWidth:"250px",
            maxHeight:"250px"
            }}>
               <Box 
               flex={1}
               padding={2}
               >
                     <Typography variant="h6">{item.name}</Typography>
                     <Typography>Адрес: {item.address}</Typography>
                     <Typography>Вид спорта: {item.sport}</Typography>
                     <Typography>Покрытие: {item.coverage}</Typography>
                     <Typography>Площадь: {item.area}</Typography>
                     <Typography>Рейтинг: {item.rating}</Typography>
                     <Typography>Душевые: {item.shower}</Typography>
                     <Typography>Освещение: {item.light}</Typography>
               </Box>
            </Paper>

          </Box>

          <Paper sx={{
               maxWidth: "80%"
          }}>
            <Box flex={1} padding={2} margin={2} >
            <Typography variant="h5" > Информация о площадке: </Typography> 
            <Typography mb={2} mt={2} fontSize={15}>{item.intro}</Typography> 

            <Typography variant="h5" mb={2}>Время работы: </Typography>
                  <Typography>Понедельник: {item.monday}</Typography>
                  <Typography>Вторник:     {item.tuesday}</Typography>
                  <Typography>Среда:       {item.wednesday}</Typography>
                  <Typography>Четверг:     {item.thursday}</Typography>
                  <Typography>Пятница:     {item.friday}</Typography>
                  <Typography>Суббота:     {item.saturday}</Typography>
                  <Typography>Воскресенье: {item.sunday}</Typography>
            </Box>
      
          </Paper>


        </Grid>
      ))}
    </Grid>
</Container>


      </>
   );
};
