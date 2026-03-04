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
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col gap-8">
      {/* header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-700">Dashboard</h1>
        <p className="text-gray600 text-lg mt-2">Welcome to Expense Tracker</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Expense */}
        <div className="bg-white shadow rounded-xl  p-6 flex flex-col items-center hover:shadow-2xl transition font-bold ">
          <h2 className="text-gray-500 text-sm">
            Total Expense:{" "}
            <p className="text-3xl font-bold text-red-500 mt-2">
              ₹{totalExpense}
            </p>
          </h2>
        </div>

        {/* Total Budget */}
        <div className="bg-white shadow rounded-xl  p-6 flex flex-col items-center hover:shadow-2xl transition font-bold">
          <h2 className="text-gray-500 text-sm">
            {" "}
            Total Budget:{" "}
            <p className="text-3xl text-red-500 mt-2">₹ {totalBudget}</p>
          </h2>
        </div>

        {/* Remaining  */}
        <div className="font-bold bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition">
          <h2 className="text-sm text-gray-500">
            Remaining:{" "}
            <p className="text-3xl text-red-500 mt-2">
              ₹ {totalBudget - totalExpense}
            </p>
          </h2>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 mt-4">
        <Link
          to="/expenses"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition"
        >
          Manage Expenses
        </Link>
        <br />
        <br />
        <Link
          to="/budgets"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition"
        >
          Manage Budgets
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
