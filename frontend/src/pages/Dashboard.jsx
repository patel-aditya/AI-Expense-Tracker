import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";

function Dashboard() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const expenseRes = await api.get("/analytics/total-expense");
        const budgetRes = await api.get("/analytics/total-budget");
        const categoryRes = await api.get("/analytics/category-summary");
        const monthlyRes = await api.get("/analytics/monthly-summary");

        setTotalExpense(expenseRes.data.total_expense);
        setTotalBudget(budgetRes.data.total_budget);
        if (Array.isArray(categoryRes.data)) {
          setCategoryData(categoryRes.data);
        }

        const formattedMonthly = monthlyRes.data.map((item) => ({
          month: new Date(item.year, item.month - 1).toLocaleString("default", {
            month: "short",
          }),
          total: item.total,
        }));

        setMonthlyData(formattedMonthly);
      } catch (error) {
        console.log("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Expense Tracker</p>

      <h2>Total Expense: {totalExpense}</h2>
      <h2>Total Budget: {totalBudget}</h2>
      <h2>Remaining: {totalBudget - totalExpense}</h2>
      <Link to="/expenses">Go to Expenses</Link>
      <br />
      <h3>Monthly Expenses</h3>
      <MonthlyBarChart data={monthlyData.date} />
      <br />
      <Link to="/budgets">Go to Budgets</Link>
      <h3>Category Breakdown</h3>
      {/* <CategoryPieChart data={categoryData} /> */}
    </div>
  );
}

export default Dashboard;
