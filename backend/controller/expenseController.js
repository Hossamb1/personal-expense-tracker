const { Expense } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

exports.getMonthlyReports = async (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay
    .toString()
    .padStart(2, "0")}`;

  try {
    const report = await Expense.findAll({
      where: {
        userId: req.userId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ["category", [fn("SUM", col("amount")), "totalAmount"]],
      group: ["category"],
      order: [["category", "ASC"]],
    });

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not generate report" });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    if (!amount || !category || !description || !date)
      return res.status(400).json({ message: "Please include all fields" });

    const userId = req.userId;

    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
      userId,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

exports.getExpenses = async (req, res) => {
  const { category, startDate, endDate } = req.query;

  const where = { userId: req.userId };
  if (category) where.category = category;
  if (startDate && endDate) {
    where.date = {
      [Op.gte]: new Date(startDate),
      [Op.lte]: new Date(endDate),
    };
  }

  try {
    const expenses = await Expense.findAll({ where });
    res.json(expenses);
  } catch (err) {
    console.error("Failed to fetch expenses:", err);
    res.status(500).json({ error: "Failed to get expenses" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, category, description } = req.body;

    const expense = await Expense.findOne({
      where: { id, userId: req.userId },
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    expense.amount = amount;
    expense.category = category;

    expense.description = description;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;

    const expense = await Expense.findOne({
      where: { id, userId: req.userId },
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    await expense.destroy();
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
