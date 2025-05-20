const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please include all fields" });

    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res.status(400).json({ error: "Email might already be taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res
      .status(201)
      .json({ message: "User registered", user, token: generateToken(user) });
  } catch (err) {
    console.error("Error logging user:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ error: "Invalid Email or Password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid Email or Password" });

    res.json({ message: "Login successful", user, token: generateToken(user) });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "name", "email"],
    });

    if (user === null) return res.status(404).json({ error: "Invalid User" });

    res.json(user.dataValues);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

function generateToken(user) {
  return jwt.sign({ id: user.id }, SECRET_KEY, {
    expiresIn: "1h",
  });
}
