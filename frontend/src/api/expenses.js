// src/api/expenses.js
import axios from "./axios";

// GET: Fetch expenses with optional filters
export default async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`/expenses?${params}`);
  return res.data;
};

// GET: Fetch monthly report
export const getMonthlyReport = async () => {
  const res = await axios.get(`/expenses/report`);
  return res.data;
};

// POST: Add a new expense
export const addExpense = async (expense) => {
  const res = await axios.post("/expenses", expense);
  return res.data;
};

// PUT: Update an existing expense
export const updateExpense = async (id, updatedData) => {
  const res = await axios.put(`/expenses/${id}`, updatedData);
  return res.data;
};

// DELETE: Delete an expense
export const deleteExpense = async (id) => {
  const res = await axios.delete(`/expenses/${id}`);
  return res.data;
};
