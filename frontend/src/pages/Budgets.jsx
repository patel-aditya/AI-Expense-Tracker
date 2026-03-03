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

    if(!monthly_limit || !category){
        alert("all fields required");
        return;
    }
    await addBudget({ 
        category,
        monthly_limit: parseFloat(monthly_limit)
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
    <div>
      <h2>Budgets</h2>

      <form onSubmit={handleAdd}>
        <input
          type="number"
          placeholder="Budget Amount"
          value={monthly_limit}
          onChange={(e) => setMonthlyLimit(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            Rs {budget.monthly_limit} - {budget.category}
            <button onClick={() => handleDelete(budget.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Budgets;
