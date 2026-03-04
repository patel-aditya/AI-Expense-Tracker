import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const expenseRes = await api.get("/analytics/total-expense");
        const budgetRes = await api.get("/analytics/total-budget");

        setTotalExpense(expenseRes.data.total_expense);
        setTotalBudget(budgetRes.data.total_budget);
       
  
      } catch (error) {
        console.log("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="bg-green-500 text-white text-3xl p-10">
      <h1>Dashboard</h1>
      <p>Welcome to Expense Tracker</p>

      <h2>Total Expense: {totalExpense}</h2>
      <h2>Total Budget: {totalBudget}</h2>
      <h2>Remaining: {totalBudget - totalExpense}</h2>
      <Link to="/expenses">Go to Expenses</Link>
      <br />
      <br />
      <Link to="/budgets">Go to Budgets</Link>
    </div>
  );
}

export default Dashboard;
