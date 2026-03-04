import { useState, useEffect } from "react";
import { getBudgets, addBudget, deleteBudget } from "../services/budgetService";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [monthly_limit, setMonthlyLimit] = useState("");
  const [category, setCategory] = useState("");

  const fetchBudgets = async () => {
    const data = await getBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    const loadBudgets = async () => {
      await fetchBudgets();
    };
    loadBudgets();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!monthly_limit || !category) {
      alert("all fields required");
      return;
    }
    await addBudget({
      category,
      monthly_limit: parseFloat(monthly_limit),
    });

    setCategory("");
    setMonthlyLimit("");
    fetchBudgets();
  };

  const handleDelete = async (id) => {
    await deleteBudget(id);
    fetchBudgets();
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold text-gray-700">Budgets</h2>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4">
          <input
            type="number"
            className="border border-gray-300 p-2 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Budget Amount"
            value={monthly_limit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
          />

          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600  text-white px-6 py-2 rounded-lg shadow transition duration-200"
          >
            Add
          </button>
        </form>
      </div>

{/* table */}
      <div className="w-full max-w-3xl">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Budget Amount</th>
              <th className="p-3 text-left" >Category</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {budgets.map((budget) =>(
              <tr key={budget.id} className="border-t text-center">
                <td className="p-3">₹ {budget.monthly_limit}</td>
                <td className="p-3">{budget.category}</td>

                <td className="p-3 text-center">
                  <button onClick={() =>handleDelete(budget.id)}className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Budgets;
