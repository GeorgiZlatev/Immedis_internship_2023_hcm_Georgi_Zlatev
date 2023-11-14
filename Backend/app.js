const express = require("express");
const bodyParser = require("body-parser");
const port = 8001;
const app = express();
const dashboardRoutes = require("./routes/dashboard");
const signRoutes = require("./routes/auth");
const cors = require("cors");

app.use(bodyParser.json());
// Обработване на предварителните заявки (OPTIONS заявки)
app.use(cors());
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use("/", dashboardRoutes);
app.use("/", signRoutes);

// Welcome page
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to Home page",
  });
});

app.listen(port, () => {
  console.log("Application run on port " + port);
});
