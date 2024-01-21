const {
   userRegister,
   userActivate,
   userLogin,
   userRefresh,
} = require("../services/user-service");

const {
   tokenRemove,
   validateRefreshToken,
} = require("../services/token-service");
const { FieldModel } = require("../Schemas/FieldSchema");

const registration = async (req, res, next) => {
   try {
      const userData = await userRegister(req, res);
      res.cookie("refreshtoken", userData.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
      });
      return res.status(200).json({
         userData,
         message: `To complete registration, follow the link that was sent to your email.`,
      });
   } catch (error) {
      console.log(error);
      return res.status(400).json({
         message: `Unforeseen problem. Please try again in a few seconds.`,
      });
   }
};

const activate = async (req, res) => {
   try {
      const activationLink = req.params.link;
      await userActivate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
   } catch (error) {
      console.log(error);
   }
};

const login = async (req, res, next) => {
   try {
      const userData = await userLogin(req, res);

      if (userData) {
         res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
         return res.json(userData);
      } else {
         res.status(401).json({
            message: "Email or password is incorrect!",
         });
      }
   } catch (error) {
      console.log(error);
   }
};

const logout = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken;

      const token = await tokenRemove(refreshToken);
      return res.json(token);
   } catch (error) {
      console.log(error);
   }
};

const refresh = async (req, res) => {
   try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
         return res.status(403).json({
            message: "Пользователь не авторизован",
         });
      }
      const userData = await userRefresh(refreshToken);

      if (userData) {
         res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
         return res.json(userData);
      } else {
         return res.status(403).json({
            message: "Пользователь не авторизован",
         });
      }
   } catch (error) {
      console.log(error);
   }
};

const getAllFields = async (req, res) => {
   try {
      const { refreshToken } = req.cookies;
      const user = validateRefreshToken(refreshToken);
      console.log(user);
      const quizes = await FieldModel.find({ user: user._id });

      res.status(200).json(quizes);
   } catch (error) {
      console.log(error);
   }
};

const getQuizById = async (req, res) => {
   try {
      const { refreshToken } = req.cookies;
      const user = validateRefreshToken(refreshToken);
      if (!user) {
         return res.status(403).json({
            message: "Пользователь не авторизован",
         });
      }
      const quiz = await FieldModel.findById(req?.body?._id);

      res.status(200).json(quiz);
   } catch (error) {
      console.log(error);
   }
};

module.exports.getAllFields = getAllFields;
module.exports.registration = registration;
module.exports.activate = activate;
module.exports.login = login;
module.exports.logout = logout;
module.exports.refresh = refresh;
module.exports.getQuizById = getQuizById;
