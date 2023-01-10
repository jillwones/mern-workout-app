const User = require("../models/user");

const UserController = {
  Login: async (req, res) => {
    res.json({ message: "Login User" });
  },
  SignUp: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);

      res.status(200).json({ email, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = UserController;
