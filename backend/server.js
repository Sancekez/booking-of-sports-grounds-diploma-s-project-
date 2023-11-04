const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { authMiddleware } = require("./middlewares/auth-middlewares");

const {
   registration,
   activate,
   login,
   logout,
   refresh,
   getAllquizes,
   getQuizById,
} = require("./controllers/UserController");
const createQuiz = require("./services/quiz-service").createQuiz;

const app = express();
const db = mongoose.connection;

mongoose.connect(process.env.DB_URL);
app.use(
   cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type",
      credentials: true,
      optionsSuccessStatus: 200,
   })
);
app.use(cookieParser());
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);
app.use(bodyParser.json());

db.on("error", function (err) {
   console.log("connection error:", err.message);
});
db.once("open", function callback() {
   console.log("DB is connected!");
});

app.listen(4444, function () {
   console.log("Express server listening on port 4444");
});

app.post("/register", registration);
app.get("/activate/:link", activate);

app.post("/auth", login);
app.post("/logout", logout);
app.get("/refresh", refresh);
app.get("/quizes", getAllquizes);
app.get("/quiz/:id", getQuizById)

app.post("/quiz", createQuiz);
