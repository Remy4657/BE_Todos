const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("List", ListSchema);
