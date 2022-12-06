require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./Routes/task-routes");
const { default: mongoose } = require("mongoose");
const HttpError = require("./util/HttpError");
const app = express();

app.use(bodyParser.json());

// CORS Allowence Here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// Taks Api here
app.use("/api/tasks", taskRoutes);

// Wrong URL req handled here
app.use((req, res, next) => {
  return next(new HttpError("Location not found", 404));
});

// Custom Express error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  console.log(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error has occured" });
});

// Mongoose Server Connection and starting express server
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ikmwvvw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server started listening");
    });
  })
  .catch(() => {
    console.log("Unable to connect to database ");
  });
