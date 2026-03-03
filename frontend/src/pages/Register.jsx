import { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            await registerUser({
                email, password
            });

            setSuccess(true);
            setError("")
            // navigate("/");// go to login after successful registration
        } catch(err){
            setError("Registration failed");
        }
    };

    return(
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                 />

                 <input 
                    type="password"
                    placeholder="Password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                 />

                 <button type="submit">Register</button>
            </form>

            {error && <p style ={{color: "red"}}>
                {error}
                <br />
                <Link to ="/">go to login</Link>
                </p>}

             {success && (
                <div>
                    Successfully Registered!
                    <br />
                    <Link to="/">Click here to Login</Link>
                </div>
            )}
        </div>
        
    );
}

export default Register;