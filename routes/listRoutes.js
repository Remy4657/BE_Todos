const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

// Lấy tất cả todo items
router.get("/", listController.getTodos);

// Thêm một todo item
router.post("/", listController.createTodo);

// Cập nhật một todo item
router.put("/:id", listController.updateTodo);

// Xóa một todo item
router.delete("/:id", listController.deleteTodo);

module.exports = router;
