const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FieldSchema = new Schema({
   name: {
      type: String,
      required: false,
   },
   price: {
      type: String,
      required: false,
   },
   selectedCheckboxes: {
      type: Array,
      required: false,
   },
   selectedSports: {
      type: Array,
      required: false,
   },
   selectedWorkingDays: {
      type: Array,
      required: false,
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
      required: false,
   },
   typeField: {
      type: String,
      required: false,
      default: 'indoor field',
   },
   coveringField: {
      type: String,
      required: false,
   },
   typesSports: [
      {
         name: {
            type: String,
            required: false,
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
            required: false,
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
         required: false,
      },
      start: {
         type: String,
         required: false,
      },
      end: {
         type: String,
         required: false,
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
      required: false,
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

const FieldModel = mongoose.model("Field", FieldSchema);
module.exports.FieldModel = FieldModel;
