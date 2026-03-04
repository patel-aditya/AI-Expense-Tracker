import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      // store token
      localStorage.setItem("token", data.access_token);

      // redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials", error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-2xl">
        <div>

      <h2 className="text-3xl font-bold tracking-[1px] pl-3 pr-3 items-center font-medium animate-left-to-right bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Welcome
      </h2>
        <p className="text-sm text-gray-700">Please login to your account</p>
        </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            className="border p-2 outline-none focus:outline-none rounded-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <input
            type="password"
            className="border p-2 outline-none focus:outline-none rounded-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

         {error && <p className="text-red-500">{error}</p>}


        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>

      <p>
        Don't have an account? <a href="/register" className="text-blue-400">Register</a>
      </p>
    </div>
  );
}

export default Login;
