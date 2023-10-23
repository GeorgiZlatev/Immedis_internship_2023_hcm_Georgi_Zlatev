const express = require("express");
const router = express.Router(); //създаве ме обект за извикване на метод

// Register API
router.post("/register", (req, res) => {
  res.json({
    status: true,
    message: "Register API",
  });
});

// Login API
router.post("/login", (req, res) => {
  res.json({
    status: true,
    message: "Login API",
  });
});

// Profile API
router.get("/profile", (req, res) => {
  res.json({
    status: true,
    message: "Profile API",
  });
});

module.exports = router;
