const mongoose = require("mongoose");
const List = require("../models/list");

// Lấy tất cả todo items
exports.getTodos = async (req, res) => {
  try {
    const todos = await List.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Thêm một todo item
exports.createTodo = async (req, res) => {
  const { id_temp, title, isDone } = req.body;
  const newTodo = new List({ id_temp, title, isDone });

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
  console.log("id: ", id);
  const { title, isDone } = req.body;

  try {
    let todo;
    if (id.startsWith("temp")) {
      todo = await List.findOne({ id_temp: id });
    } else {
      todo = await List.findById(id);
    }
    console.log("todo: ", todo);
    if (!todo) {
      return res.status(404).send("Not found");
    }

    todo.title = title;
    todo.isDone = isDone;
    await todo.save();

    res.json(todo);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send(error);
  }
};
// exports.updateTodo = async (req, res) => {
//   const { id } = req.params;

//   // Kiểm tra ObjectId hợp lệ
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid ID format" });
//   }

//   try {
//     const todo = await List.findByIdAndUpdate(
//       id,
//       { $set: req.body }, // Sử dụng $set để chỉ cập nhật các trường được gửi lên
//       {
//         new: true, // Trả về document sau khi update
//         runValidators: true, // Kích hoạt validation
//       }
//     );

//     if (!todo) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json(todo);
//   } catch (error) {
//     // Trả về lỗi chi tiết từ Mongoose
//     res.status(400).json({
//       error: error.message,
//       details: error.errors,
//     });
//   }
// };

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
