const express = require ("express")
const app= express()
const taskRoutes=require("./routes/task")
const bookRoutes=require("./routes/book")
const userRoutes=require("./routes/user")
const authorRoutes=require("./routes/author")
const categoryRoutes=require("./routes/category")
const eventRoutes = require('./routes/eventRoutes');
const mongoose = require('mongoose')

mongoose
.connect("mongodb://127.0.0.1:27017/database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

  app.use(express.json())


app.use("/api/tasks",taskRoutes)
app.use("/api/books",bookRoutes)
app.use("/api/auth",userRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/authors",authorRoutes)
app.use('/api/events', eventRoutes);
module.exports=app