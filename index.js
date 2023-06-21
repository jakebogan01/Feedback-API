const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const ngrok = require("ngrok");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Suggestion = require("./models/suggestionModel");
const User = require("./models/userModel");
const app = express();
dotenv.config();

const cors = require("cors");
app.use(
     cors({
          origin: "*",
     })
);

//
// types of middleware
// json
app.use(express.json());
// form data
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/message", (req, res) => {
     console.log(req.body);
     let msgFrom = req.body.From;
     let msgBody = req.body.Body;

     res.send(`
          <Response>
               <Message>
                    Hello ${msgFrom}. You said: ${msgBody}
               </Message>
          </Response>
     `);
});

// twilio sms
function sendSMS() {
     const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
     return client.messages
          .create({
               body: "Hello from Twilio",
               from: process.env.TWILIO_NUMBER,
               to: "+17578183089",
          })
          .then((message) => console.log(message, "Message sent"))
          .catch((error) => console.log(error, "Message not sent"));
}

// twilio receive sms
app.post("/welcome/sms/reply/", (req, res) => {
     const twiml = new twilio.twiml.MessagingResponse();
     twiml.message("The Robots are coming! Head for the hills!");
     res.writeHead(200, { "Content-Type": "text/xml" });
     res.end(twiml.toString());
});

// sendSMS();

//routes
// create a user
app.post("/users", async (req, res) => {
     try {
          const user = await User.create(req.body);
          res.status(200).json(user);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// fetch all users
app.get("/users", async (req, res) => {
     try {
          const user = await User.find({});
          res.status(200).json(user);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// fetch a user
app.get("/users/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const user = await User.findById(id);
          res.status(200).json(user);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// update a user
app.put("/users/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const user = await User.findByIdAndUpdate(id, req.body);
          // we cannot find the matching user in database
          if (!user) {
               return res.status(404).json({ message: `cannot find any user with ID of ${id}` });
          }
          const updatedUser = await User.findById(id);
          res.status(200).json(updatedUser);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// delete a user
app.delete("/users/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const user = await User.findByIdAndDelete(id);
          // we cannot find the matching user in database
          if (!user) {
               return res.status(404).json({ message: `cannot find any user with ID of ${id}` });
          }
          res.status(200).json(user);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// create a suggestion
app.post("/suggestions", async (req, res) => {
     try {
          const suggestion = await Suggestion.create(req.body);
          res.status(200).json(suggestion);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// fetch all suggestion
app.get("/suggestions", async (req, res) => {
     try {
          const suggestion = await Suggestion.find({});
          res.status(200).json(suggestion);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// fetch a suggestion
app.get("/suggestions/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const suggestion = await Suggestion.findById(id);
          res.status(200).json(suggestion);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// update a suggestion
app.put("/suggestions/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const suggestion = await Suggestion.findByIdAndUpdate(id, req.body);
          // we cannot find the matching suggestion in database
          if (!suggestion) {
               return res.status(404).json({ message: `cannot find any suggestion with ID of ${id}` });
          }
          const updatedSuggestion = await Suggestion.findById(id);
          res.status(200).json(updatedSuggestion);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// delete a suggestion
app.delete("/suggestions/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const suggestion = await Suggestion.findByIdAndDelete(id);
          // we cannot find the matching suggestion in database
          if (!suggestion) {
               return res.status(404).json({ message: `cannot find any suggestion with ID of ${id}` });
          }
          res.status(200).json(suggestion);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// removes strictQuery from console
mongoose.set("strictQuery", false);

// connect to mongodb database
mongoose
     .connect(`mongodb+srv://admin:${process.env.API_PASSWORD}@tomapi.eup9dn8.mongodb.net/Node-API?retryWrites=true&w=majority`)
     .then(() => {
          console.log("connected to MongoDB");
          app.listen(3000, () => {
               console.log(`Node API app is running on port 3000`);
          });
     })
     .catch((error) => {
          console.log(error);
     });
