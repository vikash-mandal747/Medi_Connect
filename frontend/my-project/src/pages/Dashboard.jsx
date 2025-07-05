// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/me");
      setAppointments(res.data);
    } catch (err) {
      alert("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>You have no appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt._id} className="border p-4 rounded shadow">
              <p>
                <strong>Doctor:</strong> {appt.doctor?.speciality} <br />
                <strong>Fees:</strong> ₹{appt.doctor?.fees}
              </p>
              <p>
                <strong>Start:</strong> {new Date(appt.slot.start).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(appt.slot.end).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
