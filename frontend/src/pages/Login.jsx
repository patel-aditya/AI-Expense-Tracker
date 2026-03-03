import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { loginUser } from "../services/authService";

function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const data = await loginUser(email, password);
            // store token
            localStorage.setItem("token", data.access_token);

            // redirect to dashboard
            navigate("/dashboard");
        }catch (err){
            setError("Invalid credentials")
        }
    };
    return(
        <div>
            <h2>Login</h2>

            {error && <p style = {{color: "red"}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                </div>

                <div>
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default Login;