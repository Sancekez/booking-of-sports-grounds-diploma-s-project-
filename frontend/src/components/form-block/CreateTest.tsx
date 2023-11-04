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
} from "@mui/material";
import { Delete, Edit, Close, AddCircle } from "@mui/icons-material";

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

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await createQuiz({questions, quizTitle});
      handleOpen(response.data);

      setQuizTitle('')
      setQuestions([]);
      setCurrentQuestion("");
      setCurrentAnswers([]);
      setCorrectAnswerIndex(-1);
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

   const handleCorrectAnswerChange = (index: number, questionIndex: number) => {
      if (questionIndex === editingQuestionIndex) {
         setCorrectAnswerIndex(index);
      }
      const newAnswers = currentAnswers.map((answer, i) => ({
         ...answer,
         correct: i === index,
      }));
      setCurrentAnswers(newAnswers);
   };

   const handleDeleteAnswer = (index: number) => {
      const newAnswers = currentAnswers.filter((_, i) => i !== index);
      setCurrentAnswers(newAnswers);
   };

   const hide = (index: number) => {
      return currentAnswers.filter((_, i) => i === index).length > 0;
   };

   return (
      <>
         <Snackbar
            handleClose={handleClose}
            message={message}
            variant="success"
         />
         <Container sx={{ m: "40px 0 60px" }}>
            <Paper sx={{ p: "40px 30px", borderRadius: "20px" }} elevation={8}>
               <form action="" onSubmit={onSubmit}>
                  <Typography
                     variant="h4"
                     sx={{ mb: "30px" }}
                     textAlign={"center"}
                  >
                     Quiz Creator
                  </Typography>
                  <TextField
                     type="text"
                     label="Enter quiz title"
                     fullWidth
                     variant="outlined"
                     value={quizTitle}
                     onChange={handleQuizTitleChange}
                     color="secondary"
                     sx={{ mb: 2 }}
                  />
                  <TextField
                     type="text"
                     label="Enter question"
                     fullWidth
                     variant="outlined"
                     value={currentQuestion}
                     onChange={handleQuestionChange}
                     color="secondary"
                     sx={{ mb: 2 }}
                  />
                  <RadioGroup>
                     {currentAnswers.map((answer, index) => (
                        <CSSTransition
                           key={index}
                           in={hide(index)}
                           timeout={300}
                           classNames="slide"
                           unmountOnExit
                           mountOnEnter
                        >
                           <Slide direction="right" in={true}>
                              <FormControlLabel
                                 sx={{ mb: "20px" }}
                                 key={index}
                                 value={answer.answer}
                                 control={<Radio />}
                                 checked={answer.correct}
                                 onChange={() =>
                                    handleCorrectAnswerChange(index, -1)
                                 }
                                 label={
                                    <Box display="flex" alignItems="center">
                                       <TextField
                                          value={answer.answer}
                                          onChange={(
                                             event: ChangeEvent<HTMLInputElement>
                                          ) => handleAnswerChange(index, event)}
                                          placeholder={`Enter Answer ${
                                             index + 1
                                          }`}
                                          required
                                       />
                                       <IconButton
                                          onClick={() =>
                                             handleDeleteAnswer(index)
                                          }
                                       >
                                          <Close />
                                       </IconButton>
                                    </Box>
                                 }
                              />
                           </Slide>
                        </CSSTransition>
                     ))}
                  </RadioGroup>

                  <Box
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                     }}
                  >
                     <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleAddAnswer}
                        endIcon={<AddCircle />}
                     >
                        Add answer
                     </Button>

                     {editingQuestionIndex !== -1 &&
                        tempCorrectAnswerIndex !== -1 && (
                           <Button
                              variant="contained"
                              color="warning"
                              onClick={handleSaveEditedQuestion}
                           >
                              Save changes
                           </Button>
                        )}

                     <Button variant="contained" onClick={handleAddQuestion}>
                        Add Question
                     </Button>

                     <Button variant="contained" color="success" type="submit">
                        Create quiz
                     </Button>
                  </Box>
                  <List>
                     <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable" direction="vertical">
                           {(provided) => (
                              <div
                                 {...provided.droppableProps}
                                 ref={provided.innerRef}
                              >
                                 {questions.map((question, index) => (
                                    <Draggable
                                       key={index}
                                       draggableId={index.toString()}
                                       index={index}
                                    >
                                       {(provided) => (
                                          <ListItem
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             ref={provided.innerRef}
                                          >
                                             <Paper
                                                sx={{
                                                   p: 2,
                                                   my: 2,
                                                   borderRadius: "10px",
                                                   borderColor: "primary.main",
                                                   width: "100%",
                                                   textAlign: "center",
                                                   position: "relative",
                                                }}
                                                variant="outlined"
                                             >
                                                <Typography variant="h6">
                                                   Question {index + 1}
                                                </Typography>
                                                <Box
                                                   sx={{
                                                      position: "absolute",
                                                      right: "10px",
                                                      top: "10px",
                                                   }}
                                                >
                                                   <IconButton
                                                      onClick={() =>
                                                         handleEditQuestion(
                                                            index
                                                         )
                                                      }
                                                   >
                                                      <Edit />
                                                   </IconButton>
                                                   <IconButton
                                                      onClick={() =>
                                                         handleDeleteQuestion(
                                                            index
                                                         )
                                                      }
                                                   >
                                                      <Delete />
                                                   </IconButton>
                                                </Box>

                                                <Typography
                                                   variant="body1"
                                                   fontWeight={700}
                                                   textAlign={"start"}
                                                >
                                                   {question.question}
                                                </Typography>
                                                <RadioGroup sx={{ mt: "30px" }}>
                                                   <Typography
                                                      variant="body1"
                                                      fontWeight={400}
                                                      textAlign={"start"}
                                                   >
                                                      Variants of answer:
                                                   </Typography>
                                                   {question.answers.map(
                                                      (answer, answerIndex) => (
                                                         <FormControlLabel
                                                            key={answerIndex}
                                                            value={
                                                               answer.answer
                                                            }
                                                            control={<Radio />}
                                                            checked={
                                                               answer.correct
                                                            }
                                                            label={
                                                               answer.answer
                                                            }
                                                            onChange={() =>
                                                               handleCorrectAnswerChange(
                                                                  answerIndex,
                                                                  index
                                                               )
                                                            }
                                                         />
                                                      )
                                                   )}
                                                </RadioGroup>
                                             </Paper>
                                          </ListItem>
                                       )}
                                    </Draggable>
                                 ))}
                                 {provided.placeholder}
                              </div>
                           )}
                        </Droppable>
                     </DragDropContext>
                  </List>
               </form>
            </Paper>
         </Container>
      </>
   );
};
