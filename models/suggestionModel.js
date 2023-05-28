const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema(
     {
          title: {
               type: String,
               required: [true, "Please enter a title"],
          },
          description: {
               type: String,
               required: [true, "Please enter a description"],
          },
          likes: {
               type: Number,
               required: false,
               default: 0,
          },
          price: {
               type: Number,
               required: true,
          },
          image: {
               type: String,
               required: false,
          },
     },
     {
          timestamps: true,
     }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
