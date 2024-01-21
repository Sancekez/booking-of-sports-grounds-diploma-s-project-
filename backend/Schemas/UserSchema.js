const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//    email: {
//       type: String,
//       required: true,
//       unique: true,
//    },
//    isActivated: {
//       type: Boolean,
//       default: false,
//    },
//    activationLink: {
//       type: String,
//    },
//    password: {
//       type: String,
//       required: true,
//    },
//    name: {
//       type: String,
//       required: true,
//    },
//    rule: {
//       type: String,
//       required: true,
//    },
//    surname: {
//       type: String,
//       required: true,
//    },
// });

const UserSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true,
   },
   fullName: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   playFieldName: {
      type: String,
      required: true,
   },
   typeOfSports: {
      type: Array,
      required: true,
   },
   countFields: {
      type: String,
      required: false,
      default: '1',
   },
   rule: {
      type: String,
      required: false,
      default: 'user',
   },
   isActivated: {
      type: Boolean,
      default: false,
   },
   activationLink: {
      type: String,
   },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports.UserModel = UserModel;
