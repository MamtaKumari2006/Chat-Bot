import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Register(){
    const navigate = useNavigate();
    const {register}= useAuth();
    const [formData, setFormData] = useState({
        username : "",
        email : "",
        password : "",

    });
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try{
            await register(formData);
            setSuccess("Register Successfully! please login to continue");
            setTimeout(()=> navigate("/login") ,1500)
        }catch(err){
            setError(err.response?.data?.message || "Register failed please try again");

        }
    }
    return(
        <>
        <div className="container bg-amber-400">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}

export default Register;  