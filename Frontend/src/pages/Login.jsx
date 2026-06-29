import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import chatbotImg from "../assets/ChatBot.jpg";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login({
                email: formData.identifier,
                username: formData.identifier,
                password: formData.password,
            });

            navigate("/chat");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed, please try again");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-zinc-800">

                {/* Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={chatbotImg}
                        alt="Chatbot"
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md"
                    />
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-white text-center mb-2">
                    Welcome Back
                </h2>
                <p className="text-zinc-400 text-center text-sm mb-6">
                    Login to continue your AI conversation
                </p>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="identifier"
                            className="block text-sm text-zinc-300 mb-2"
                        >
                            Email or Username
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            placeholder="Enter email or username"
                            required
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm text-zinc-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex justify-center pt-2">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white py-2 px-8 rounded-xl font-semibold shadow-lg shadow-purple-500/20 transition-all duration-300"
                        >
                            Login
                        </button>
                    </div>

                    <p className="text-zinc-400 text-center mt-4 text-sm">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-400 hover:text-blue-300">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;