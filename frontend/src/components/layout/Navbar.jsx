import { Link } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 font-bold"
        >
          ☰
        </button>

        <h2 className="text-xl font-semibold text-gray-800">Expense Tracker</h2>
      </div>

      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
