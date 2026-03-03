import { useEffect, useState  } from "react";
import api from '../services/api';
import { Link } from "react-router-dom";

function Dashboard() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() =>{
    const fetchExpense = async () =>{
      const response = await api.get("/analytics/total-expense");
      console.log(response.data)
      setTotalExpense(response.data.total_expense);
    };
    fetchExpense();
  }, []);

  useEffect(() =>{
    const fetchBudget = async() =>{
      const response = await api.get("/analytics/total-budget");
      console.log(response.data)
      setTotalBudget(response.data.total_budget);
    };
    fetchBudget();
  },[]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Expense Tracker</p>

      <h2>Total Expense: {totalExpense}</h2>
      <h2>Total Budget: {totalBudget}</h2>
      <Link to = "/expenses">Go to Expenses</Link><br />
      <Link to = "/budgets">Go to Budgets</Link>
    </div>
  );
}

export default Dashboard;