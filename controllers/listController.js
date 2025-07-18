const List = require("../models/list");

// Lấy tất cả todo items
exports.getTodos = async (req, res) => {
  try {
    const todos = await List.find();
    res.json(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Thêm một todo item
exports.createTodo = async (req, res) => {
  const { name, isChecked } = req.body;
  const newTodo = new List({ name, isChecked });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Sửa một todo item
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { name, isChecked } = req.body;

  try {
    const todo = await List.findByIdAndUpdate(
      id,
      { name, isChecked },
      { new: true }
    );
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.json(todo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Xóa một todo item
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await List.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};
