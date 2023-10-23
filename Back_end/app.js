const express = require("express");
const PORT = 8087;
const app = express();
const appRoutes = require("./routes");
const bodyParser = require("body-parser");

// Welcome page
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Welcome to Human Capital Management App",
  });
});

app.use(bodyParser.json());
app.use("/", appRoutes);

app.listen(PORT, () => {
  console.log("Application started");
});
