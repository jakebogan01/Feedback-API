const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
     {
          email: {
               type: String,
               required: [true, "Please enter a email"],
               unique: true,
          },
          username: {
               type: String,
               required: [true, "Please enter a username"],
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

module.exports = User;
