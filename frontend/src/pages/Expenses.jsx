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
    <div>
      <h2>Expenses</h2>

      <form onSubmit={handleAdd}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            Rs {expense.amount} - {expense.category} - {expense.description} - {new Date(expense.date).toLocaleDateString()}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
