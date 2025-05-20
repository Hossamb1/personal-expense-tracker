import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/authContext";
import getExpenses, {
  deleteExpense,
  addExpense,
  updateExpense,
} from "../api/expenses";
import MonthlyReport from "../components/MonthlyReport";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editingValues, setEditingValues] = useState({});

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (filterCategory) filters.category = filterCategory;
    const data = await getExpenses(filters);
    setExpenses(data);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !description) return;
    await addExpense({
      amount,
      description,
      category,
      date: new Date().toISOString().split("T")[0],
    });
    setAmount("");
    setDescription("");
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const handleFilter = async () => {
    fetchExpenses();
  };

  const startEditing = (exp) => {
    setEditingExpenseId(exp.id);
    setEditingValues({
      description: exp.description,
      amount: exp.amount,
      category: exp.category,
    });
  };

  const cancelEdit = () => {
    setEditingExpenseId(null);
    setEditingValues({});
  };

  const saveEdit = async (id) => {
    await updateExpense(id, editingValues);
    cancelEdit();
    fetchExpenses();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Welcome, {user?.name || "User"}!
        </h1>
        <button
          onClick={logout}
          className="text-md font-semibold text-red-500  px-4 py-2 rounded "
        >
          Logout
        </button>
      </div>
      {/* Add Expense Form */}
      <form
        onSubmit={handleAddExpense}
        className="mb-3 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>
      {/* Filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="mb-1 text-sm text-gray-700">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
            placeholder="Start Date"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="mb-1 text-sm text-gray-700">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="End Date"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded h-fit"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 h-fit"
        >
          Filter
        </button>
      </div>
      {/* Expenses */}
      <div className="flex gap-4 max-sm:flex-col">
        <div className="grow space-y-4">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              {editingExpenseId === exp.id ? (
                <div className="w-full flex flex-col gap-2">
                  <input
                    type="text"
                    value={editingValues.description}
                    onChange={(e) =>
                      setEditingValues((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={editingValues.amount}
                    onChange={(e) =>
                      setEditingValues((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    className="p-2 border rounded"
                  />
                  <select
                    value={editingValues.category}
                    onChange={(e) =>
                      setEditingValues((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="p-2 border rounded"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => saveEdit(exp.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-300 px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-lg font-semibold">{exp.description}</h2>
                    <p className="text-sm text-gray-600">
                      ${exp.amount} - {exp.category} -{" "}
                      {new Date(exp.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <button
                      onClick={() => startEditing(exp)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <MonthlyReport expenseTrack={expenses} />
      </div>
    </div>
  );
}
