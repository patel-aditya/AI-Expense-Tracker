import {Routes, Route, Navigate} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login';
import Dashboard  from './pages/Dashboard'
import Expenses from "./pages/Expenses";
import Budgets from './pages/Budgets'


function App(){
    const token = localStorage.getItem("token");

    return (
        <Routes>
            <Route path = "/" element={<Login />} />
            <Route path = "/register" element = {<Register />} />

            <Route 
                 path = "/dashboard" 
                 element= {token ? <Dashboard /> : <Navigate to= "/" />}
            />

            <Route
                path="/expenses"
                element = {token ? <Expenses /> :<Navigate to = "/" />}
            />

            <Route
                path= "/budgets"
                element = {token ? <Budgets />:<Navigate to = "/" />}
            />
        </Routes>
    );
}

export default App;