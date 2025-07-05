import React, { useEffect, useState } from "react";
import api from "../api";

const DoctorProfileForm = () => {
  const [form, setForm] = useState({
    speciality: "",
    fees: "",
    clinicAddress: "",
    emergencyContact: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/doctors/me");
      setForm(res.data); // Fill form with existing data
    } catch (err) {
      // If 404, it means no profile exists — ignore
      if (err.response?.status !== 404) {
        alert("Error loading profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/doctors/profile", form); // same endpoint handles create/update
      alert("Profile saved successfully!");
    } catch (err) {
      alert(err.response?.data?.msg || "Save failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" name="speciality" placeholder="Speciality" value={form.speciality} onChange={handleChange} required />
        <input className="input" name="fees" type="number" placeholder="Consultation Fees" value={form.fees} onChange={handleChange} required />
        <input className="input" name="clinicAddress" placeholder="Clinic Address" value={form.clinicAddress} onChange={handleChange} required />
        <input className="input" name="emergencyContact" type="number" placeholder="Emergency Contact" value={form.emergencyContact} onChange={handleChange} required />
        <select className="input" name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Save Profile</button>
      </form>
    </div>
  );
};

export default DoctorProfileForm;
