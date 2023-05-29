const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
     {
          email: {
               type: String,
               required: [true, "Please enter a email"],
               unique: true,
               validate: {
                    isAsync: true,
                    validator: function (value, isValid) {
                         const self = this;
                         return self.constructor.findOne({ email: value }).exec(function (err, user) {
                              if (err) {
                                   throw err;
                              } else if (user) {
                                   if (self.id === user.id) {
                                        // if finding and saving then it's valid even for existing email
                                        return isValid(true);
                                   }
                                   return isValid(false);
                              } else {
                                   return isValid(true);
                              }
                         });
                    },
                    message: "The email address is already taken!",
               },
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
