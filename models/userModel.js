const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
     {
          email: {
               type: String,
               required: [true, "Please enter a email"],
               unique: true,
          },
          password: {
               type: String,
               required: [true, "Please enter a password"],
          },
     },
     {
          timestamps: true,
     }
);

const User = mongoose.model("User", userSchema);
contactSchema.plugin(uniqueValidator);

module.exports = User;
