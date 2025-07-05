// src/pages/DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

// helper to get payload from JWT
const getTokenPayload = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
};

const DoctorDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [appointments, setAppts] = useState([]);
    const [slots, setSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({ start: "", end: "" });
    const [loading, setLoading] = useState(true);

    const payload = getTokenPayload();          // { userId, role, iat, ... }

    /* -------- fetch own profile once -------- */
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // dedicated “my profile” endpoint is cleaner;
                // but if you don’t have one, filter client‑side as before.
                const { data } = await api.get("/doctors/all-doctors");
                const myProfile = data.find((d) => d.user._id === payload.userId);

                if (!myProfile) {
                    setLoading(false);
                    return;            // doctor hasn’t created profile yet
                }

                setProfile(myProfile);
                setSlots(myProfile.availableSlots || []);

                // fetch appointments for this doctor
                const resAppt = await api.get(`/appointments/${myProfile._id}`);
                setAppts(resAppt.data);
            } catch (err) {
                alert("Error fetching dashboard data");
            } finally {
                setLoading(false);
            }
        };

        if (payload?.userId) fetchProfile();
    }, [payload?.userId]);

    /* -------- add slot -------- */
    const onSlotChange = (e) =>
        setNewSlot({ ...newSlot, [e.target.name]: e.target.value });

    const addSlot = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/doctors/slots", [newSlot]); // returns updated slots
            setSlots(data.slots);
            setNewSlot({ start: "", end: "" });
            alert("Slot added!");
        } catch {
            alert("Error adding slot");
        }
    };

    /* -------- render -------- */
    if (loading) return <p className="text-center mt-10">Loading…</p>;

    if (!profile)
        return (
            <div className="text-center mt-20">
                <h2 className="text-xl font-semibold">
                    You haven’t created your doctor profile yet.
                </h2>
                <p className="mt-2">
                    Go to <code>/doctors/profile</code> first, then return here.
                </p>
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-8">
            <h2 className="text-2xl font-bold">Doctor Dashboard</h2>

            {/* ----- Add Slot ------ */}
            <form onSubmit={addSlot} className="border p-4 rounded space-y-3">
                <h3 className="text-lg font-semibold">Add a New Slot</h3>
                <input
                    type="datetime-local"
                    name="start"
                    value={newSlot.start}
                    onChange={onSlotChange}
                    className="input"
                    required
                />
                <input
                    type="datetime-local"
                    name="end"
                    value={newSlot.end}
                    onChange={onSlotChange}
                    className="input"
                    required
                />
                <button className="bg-blue-600 text-white py-2 px-4 rounded">
                    Add Slot
                </button>
            </form>

            {/* ----- Slot List ------ */}
            <section className="border p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Your Slots</h3>
                {slots.length === 0 ? (
                    <p>No slots yet.</p>
                ) : (
                    <ul className="list-disc pl-5 space-y-1">
                        {slots.map((s) => (
                            <li key={s._id}>
                                {new Date(s.start).toLocaleString()} →{" "}
                                {new Date(s.end).toLocaleTimeString()}{" "}
                                {s.isBooked && (
                                    <span className="text-red-500 font-medium">(Booked)</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* ----- Appointment List ------ */}
            <section className="border p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Booked Appointments</h3>
                {appointments.length === 0 ? (
                    <p>No appointments yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {appointments.map((a) => (
                            <li key={a._id} className="border p-3 rounded">
                                <p>
                                    <strong>Patient:</strong> {a.user?.name} (
                                    {a.user?.email})
                                </p>
                                <p>
                                    <strong>Start:</strong>{" "}
                                    {new Date(a.slot.start).toLocaleString()}
                                </p>
                                <p>
                                    <strong>End:</strong>{" "}
                                    {new Date(a.slot.end).toLocaleTimeString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default DoctorDashboard;
