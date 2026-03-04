import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        email,
        password,
      });

      setSuccess(true);
      setError("");
      // navigate("/");// go to login after successful registration
    } catch (error) {
      setError("Registration failed!", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h2 className="text-2xl animate- bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            class="border p-2 outline-none focus:outline-none rounded-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <input
            type="password"
            class="border p-2 outline-none focus:outline-none rounded-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
            
        <button type="submit" className="border-1 p-2 mt-4 bg-blue-400 text-white rounded hover:bg-blue-600 transition-colors duration-300 cursor-pointer">Register</button>
        </div>
      </form>

      {error && (
        <p className="text-red-500">
          {error}
          <br />
          <Link to="/" className="text-blue-500">Go to login</Link>
        </p>
      )}

      {success && (
        <div className="text-green-400">
          Successfully Registered!
          <br />
          <Link to="/" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">Click here to Login</Link>
        </div>
      )}
    </div>
  );
}

export default Register;
