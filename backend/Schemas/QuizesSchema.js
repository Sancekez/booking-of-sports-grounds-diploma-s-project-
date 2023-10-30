const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizesSchema = new Schema({
   title: {
      type: String,
   },
   questions: [
      {
         question: {
            type: String,
            required: true,
         },
         answers: [
            {
               answer: {
                  type: String,
                  required: true,
               },
               correct: {
                  type: Boolean,
                  required: true,
               },
            },
         ],
      },
   ],
   Class: {
      type: String,
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ссылка на модель "User"
   },
   accessCode: {
      type: Number,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const QuizesModel = mongoose.model("Quizes", QuizesSchema);
module.exports.QuizesModel = QuizesModel;
