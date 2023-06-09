const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema(
     {
          title: {
               type: String,
               required: [true, "Please enter a title"],
               unique: true,
          },
          slug: {
               type: String,
               required: true,
               unique: true,
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
          users_liked: {
               type: [],
          },
          tag: {
               type: String,
               required: [true, "Please enter a category"],
          },
          status: {
               type: String,
               required: [true, "Please enter a status"],
               default: "Pending",
          },
          user_id: {
               type: String,
               required: true,
          },
          comment: {
               type: [],
          },
     },
     {
          timestamps: true,
     }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
