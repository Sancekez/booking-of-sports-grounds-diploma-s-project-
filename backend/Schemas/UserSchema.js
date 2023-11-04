const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true,
   },
   isActivated: {
      type: Boolean,
      default: false,
   },
   activationLink: {
      type: String,
   },
   password: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   rule: {
      type: String,
      required: true,
   },
   surname: {
      type: String,
      required: true,
   },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports.UserModel = UserModel;
