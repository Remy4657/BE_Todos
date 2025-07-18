const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const listRoutes = require("./routes/listRoutes");

const app = express();
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.json());

// Kết nối với MongoDB
mongoose
  .connect(
    "mongodb+srv://trongdatga:Ur0wql8iBKV29CYp@cluster0.o0lhfev.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Sử dụng các route
app.use("/api/todos", listRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
