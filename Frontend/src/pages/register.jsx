import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import chatbotImg from "../assets/ChatBot.jpg";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await register(formData);
            setSuccess("Registered Successfully! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed, please try again"
            );
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg shadow-blue-500/10">

                {/* Chatbot Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={chatbotImg}
                        alt="Chatbot"
                        className="w-25 h-25 rounded-full object-cover"
                    />
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Create Account
                </h2>
                <p className="text-zinc-400 text-center text-sm mb-6">
                    Register to start chatting with AI
                </p>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="bg-green-500/20 text-green-300 p-3 rounded-lg mb-4 text-sm text-center">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-zinc-400 text-sm mb-1 block">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-zinc-400 text-sm mb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-zinc-400 text-sm mb-1 block">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white py-2 px-6 rounded-xl font-semibold shadow-lg shadow-purple-500/20 transition-all duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Login Link */}
                <p className="text-zinc-400 text-center mt-6 text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;