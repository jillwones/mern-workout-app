const express = require("express");
const UserController = require("../controllers/user")
const router = express.Router();

// login
router.post("/login", UserController.Login)
// signup route
router.post("/signup", UserController.SignUp)

module.exports = router;
