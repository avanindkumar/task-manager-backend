const HttpError = require("../util/HttpError");
const { validationResult } = require("express-validator");

const Task = require("../Models/Task");

const getAllTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find({});
  } catch (error) {
    return next(new HttpError("Unable to fetch Data form database", 500));
  }
  res.json(tasks.map((task) => task.toObject({ getters: true }))).status(200);
};
const createTask = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid Data Found PLz check the sent Data", 400)
    );
  }
  const { title, description, time, date, reminder } = req.body;
  const task = new Task({
    title,
    description,
    time,
    date,
    reminder,
  });
  try {
    await task.save();
  } catch (error) {
    return next(new HttpError("Unable to save data to database", 500));
  }
  res.json({ message: "Task added successfully.", id: task.id });
};
const deleteTask = async (req, res, next) => {
  const taskId = req.params.id;
  let task;
  try {
    task = await Task.findById(taskId);
    if (!task) {
      return next(new HttpError("Cannot find task for the provided id", 403));
    }
    await task.remove();
  } catch (error) {
    return next(new HttpError("Cannot connect with the database", 500));
  }
  res.json({ message: "Task deleted successfully" });
};
const updateTask = async (req, res, next) => {
  const taskId = req.params.id;
  const { title, description, time, date, reminder } = req.body;
  let task;
  try {
    task = await Task.findById(taskId);
    task.title = title;
    task.description = description;
    task.time = time;
    task.date = date;
    task.reminder = reminder;

    await task.save();
    if (!task) {
      return next(new HttpError("Cannot find task for the provided id", 403));
    }
  } catch (error) {
    return next(new HttpError("Cannot connect with the database", 500));
  }
  res.json({ message: "Task deleted successfully" });
};

exports.getAllTasks = getAllTasks;
exports.createTask = createTask;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
