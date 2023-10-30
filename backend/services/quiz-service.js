const { QuizesModel } = require("../Schemas/QuizesSchema");
const { validateRefreshToken } = require("../services/token-service");

const createQuiz = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken;
      const user = await validateRefreshToken(refreshToken);

      const questions = req.body.questions.map((questionItem) => {
         return questionItem;
      });

      const quiz = new QuizesModel({
         title: req.body.quizTitle,
         questions: questions,
         user: user._id,
         accessCode: Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999,
      });

      await quiz.save().catch((err) => res.status(400).send("Error: " + err));

      res.json("quiz added");
   } catch (error) {
      res.status(400).json(error);
      console.log(error);
   }
};

module.exports.createQuiz = createQuiz;