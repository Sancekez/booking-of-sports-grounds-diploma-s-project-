const { FieldModel } = require("../Schemas/FieldSchema");
const { validateRefreshToken } = require("./token-service");

const createField = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken;
      const user = await validateRefreshToken(refreshToken);

      // const questions = req.body.questions.map((questionItem) => {
      //    return questionItem;
      // });

      const field = new FieldModel({
         name: req.body?.name,
         area: {
            height: req.body?.area?.height,
            width: req.body?.area?.width,
            areaLength: req.body?.area?.areaLength,
         },
         typeField: req.body?.typeField,
         price: req.body?.price,
         coveringField:  req.body?.coveringField,
         typesSports: req.body?.typesSports,
         additionalAtributes: req.body?.additionalAtributes,
         selectedCheckboxes: req.body?.selectedCheckboxes,
         selectedSports: req.body?.selectedSports,
         selectedWorkingDays: req.body?.selectedWorkingDays,
         workTime: {
            dayOfWeek: req.body?.workTime?.dayOfWeek,
            start: req.body?.workTime?.start,
            end: req.body?.workTime?.end,
            lunch: req.body?.workTime?.lunch,
            break: req.body?.workTime?.break,
         },
         address: req.body?.address,
         rating: req.body?.rating,
         user: user._id,
         accessCode: Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999,
      });

      await field.save().catch((err) => res.status(400).send("Error: " + err));

      res.json({message: "Ваша площадка успешно добавлено!"});
   } catch (error) {
      res.status(400).json(error);
      console.log(error);
   }
};

// const getAllFields = async(req,res)=> {
//    try {
      
//    } catch (error) {
//       res.status(400).json(error);
//       console.error(error)
//    }
// }

module.exports.createField = createField;
// module.exports.getAllFields = getAllFields;