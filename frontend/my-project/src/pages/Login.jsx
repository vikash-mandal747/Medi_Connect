import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/action";

const Login = () => {
  const [form, setForm] = useState({ email:"", password:"" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(form));    // thunk returns a Promise
      navigate("/");                  // home or dashboard
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="w-full bg-green-600 text-white py-2 rounded">Log in</button>
      </form>
    </div>
  );
};

export default Login;
