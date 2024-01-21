const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FieldSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   area: {
      height: {
         type: String,
         required: false,
      },
      width: {
         type: String,
         required: false,
      },
      areaLength: {
         type: String,
         required: false,
      },
   },
   typeField: {
      type: String,
      required: true,
   },
   typeField: {
      type: String,
      required: true,
      default: 'indoor field',
   },
   coveringField: {
      type: String,
      required: true,
   },
   typesSports: [
      {
         name: {
            type: String,
            required: true,
         },
         isIndoor: {
            type: Boolean,
            default: true,
            required: false,
         }
      }
   ],
   additionalAtributes: [
      {
         name: {
            type: String,
            required: true,
         },
         value: {
            type: String,
            required: false,
         },
      },
   ],
   workTime: {
      dayOfWeek: {
         type: Array,
         default: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
         ],
         required: true,
      },
      start: {
         type: String,
         required: true,
      },
      end: {
         type: String,
         required: true,
      },
      lunch: {
         type: String,
         required: false,
      },
      break: {
         type: String,
         required: false,
      },
   },
   address: {
      type: String,
      required: true,
   },
   rating: {
      type: Number,
      required: false,
      default: 0, // Начальное значение рейтинга
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ссылка на модель "User"
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const FieldModel = mongoose.model("Quizes", FieldSchema);
module.exports.FieldModel = FieldModel;
