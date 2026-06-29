import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Login(){
    const navigate = useNavigate();
    const {login}= useAuth();
    const [formData, setFormData] = useState({
        identifier: "",
        password : "",
    });
    const [error, setError] = useState('')

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })




    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            await login({
        email: formData.identifier,
        username: formData.identifier,
        password: formData.password,
      });
            navigate("/chat")
        }catch(err){
            setError(err.response?.data?.message || "Login failed please try again");
        }
    }
    return(
        <>
        <div className="bg-fuchsia-500 min-h-screen">
        <div className="container ">
            <h2 className="text-center text-3xl font-bold">Login</h2> 
        
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="identifier">Email or Username</label>
                    <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <p className="text-zinc-400 mt-4 text-sm">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-400">
                  Register
                </Link>
        </p>
            </form>
        </div>
        </div>
        </>
    )

}

export default Login;