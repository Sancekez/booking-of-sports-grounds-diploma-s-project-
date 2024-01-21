const { FieldModel } = require("../Schemas/FieldSchema");
const { validateRefreshToken } = require("./token-service");

const createField = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken;
      const user = await validateRefreshToken(refreshToken);

      // const questions = req.body.questions.map((questionItem) => {
      //    return questionItem;
      // });

      const quiz = new FieldModel({
         name: req.body.name,
         area: {
            height: req.body.area.height,
            width: req.body.area.width,
            areaLength: req.body.area.areaLength,
         },
         typeField: req.body.typeField,
         typeField: req.body.typeField,
         coveringField:  req.body.coveringField,
         typesSports: req.body.typesSports,
         additionalAtributes: req.body.additionalAtributes,
         workTime: {
            dayOfWeek: req.body.workTime.dayOfWeek,
            start: req.body.workTime.start,
            end: req.body.workTime.end,
            lunch: req.body.workTime.lunch,
            break: req.body.workTime.break,
         },
         address: req.body.address,
         rating: req.body.rating,
         user: user._id,
         accessCode: Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999,
      });

      await quiz.save().catch((err) => res.status(400).send("Error: " + err));

      res.json("field added");
   } catch (error) {
      res.status(400).json(error);
      console.log(error);
   }
};

module.exports.createField = createField;