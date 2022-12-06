const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const taskController = require("../Controller/task-controller");

router.get("/", taskController.getAllTasks);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("reminder").isBoolean(),
  ],
  taskController.createTask
);
router.patch(
  "/:id",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  taskController.updateTask
);
router.delete("/:id", [], taskController.deleteTask);

module.exports = router;
