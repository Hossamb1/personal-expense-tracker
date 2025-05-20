const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getExpenses);
router.get("/report", expenseController.getMonthlyReports);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
