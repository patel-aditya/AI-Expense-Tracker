import { useState, useEffect } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "../services/expenseService";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    const loadExpenses = async () => {
      await fetchExpenses();
    };
    loadExpenses();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!amount) {
      alert("please fill this fields");
      return;
    }
    await addExpense({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    });

    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold text-gray-700">Expenses</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4">
          <input
            type="number"
            className="border border-gray-300 p-2 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            className="border border-gray-300 p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>

      <div className="w-full max-w-3xl">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-t">
                <td className="p-3">₹{expense.amount}</td>

                <td className="p-3">{expense.category}</td>

                <td className="p-3">{expense.description}</td>

                <td className="p-3">
                  {new Date(expense.date).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
