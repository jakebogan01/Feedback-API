const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
// const User = require("./models/userModel");
const app = express();

// types of middleware
// json
app.use(express.json());
// form data
app.use(express.urlencoded({ extended: false }));

//routes
// create a user
// app.post("/users", async (req, res) => {
//      try {
//           const user = await User.create(req.body);
//           res.status(200).json(user);
//      } catch (error) {
//           console.log(error.message);
//           res.status(500).json({ message: error.message });
//      }
// });

// fetch all users
// app.get("/users", async (req, res) => {
//      try {
//           const user = await User.find({});
//           res.status(200).json(user);
//      } catch (error) {
//           console.log(error.message);
//           res.status(500).json({ message: error.message });
//      }
// });

// fetch all products
app.get("/products", async (req, res) => {
     try {
          const products = await Product.find({});
          res.status(200).json(products);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// fetch a product
app.get("/products/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const product = await Product.findById(id);
          res.status(200).json(product);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// create a product
app.post("/products", async (req, res) => {
     try {
          const product = await Product.create(req.body);
          res.status(200).json(product);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// update a product
app.put("/products/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const product = await Product.findByIdAndUpdate(id, req.body);
          // we cannot find the matching product in database
          if (!product) {
               return res.status(404).json({ message: `cannot find any product with ID ${id}` });
          }
          const updatedProduct = await Product.findById(id);
          res.status(200).json(updatedProduct);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// delete a product
app.delete("/products/:id", async (req, res) => {
     try {
          const { id } = req.params;
          const product = await Product.findByIdAndDelete(id);
          // we cannot find the matching product in database
          if (!product) {
               return res.status(404).json({ message: `cannot find any product with ID ${id}` });
          }
          res.status(200).json(product);
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
     }
});

// removes strictQuery from console
mongoose.set("strictQuery", false);

// connect to mongodb database
mongoose
     .connect("mongodb+srv://admin:Lordtbr1!@tomapi.eup9dn8.mongodb.net/Node-API?retryWrites=true&w=majority")
     .then(() => {
          console.log("connected to MongoDB");
          app.listen(3000, () => {
               console.log(`Node API app is running on port 3000`);
          });
     })
     .catch((error) => {
          console.log(error);
     });
