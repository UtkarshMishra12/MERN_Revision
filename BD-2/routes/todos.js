const express = require('express');
const router = express.Router();

const {createTodo} = require("../controllers/CreateTodo");
const {getTodo, getTodoById} = require("../controllers/getTodo");

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodo);
router.get("/getTodos/:id", getTodoById);

module.exports = router;