import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../redux/action";

const Signup = () => {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"user" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);  // no dispatch needed; just POST
      alert("Signup success – please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="doctor">Doctor</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Create account</button>
      </form>
    </div>
  );
};

export default Signup;
