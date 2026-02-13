import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const success = await login(email, password);
        if (success) {
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Welcome back! Please enter your details.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-between mb-6 text-sm">
                        <label className="flex items-center gap-2 text-slate-500">
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 no-underline">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                    <div className="mt-6 text-center text-slate-500">
                        Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 no-underline font-semibold">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}