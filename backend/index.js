const express = require("express");
const app = express();
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_, res) => {
  res.send("Hello! This is the expense tracker API.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log("Database connected and models synced successfully");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
