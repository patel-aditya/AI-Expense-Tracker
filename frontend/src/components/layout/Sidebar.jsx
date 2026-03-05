import { Link } from "react-router-dom";

function Sidebar({isOpen}) {
  return (
    <div className={`bg-white shadow-md transition-all duration-300 overflow-hidden ${isOpen ? "w-40 p-5 ":"w-0"}`}>


      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/expenses" className="text-gray-700 hover:text-blue-600">
          Expenses
        </Link>

        <Link to="/budgets" className="text-gray-700 hover:text-blue-600">
          Budgets
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
