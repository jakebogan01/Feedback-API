const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
     {
          email: {
               type: String,
               required: [true, "Please enter a email"],
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
