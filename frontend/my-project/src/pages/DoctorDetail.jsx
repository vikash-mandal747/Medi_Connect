// src/pages/DoctorDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSlotId, setSelectedSlotId] = useState("");

    const fetchDoctor = async () => {
        try {
            const res = await api.get(`/doctors/${id}`);
            setDoctor(res.data);
        } catch (err) {
            alert("Error fetching doctor.");
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!selectedSlotId) return alert("Please select a slot");

        try {
            const res = await api.post(`/doctors/${id}/book`, { slotId: selectedSlotId });
            alert("Appointment booked successfully!");
            setDoctor({ ...doctor, availableSlots: doctor.availableSlots.map(s => s._id === selectedSlotId ? { ...s, isBooked: true } : s) });
        } catch (err) {
            alert(err.response?.data?.msg || "Booking failed");
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!doctor) return <p className="text-center mt-10">Doctor not found.</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-2">{doctor.user?.name}</h2>
            <p><strong>Speciality:</strong> {doctor.speciality}</p>
            <p><strong>Fees:</strong> ₹{doctor.fees}</p>
            <p><strong>Email:</strong> {doctor.user?.email}</p>
            <p><strong>Clinic:</strong> {doctor.clinicAddress}</p>
            <p><strong>Emergency Contact:</strong> {doctor.emergencyContact}</p>

            <h3 className="text-xl font-semibold mt-6">Available Slots</h3>
            {doctor.availableSlots.length === 0 && <p>No slots available</p>}
            <div className="space-y-2 mt-2">
                {doctor.availableSlots.map((slot) => (
                    <label key={slot._id} className="border p-2 rounded flex justify-between items-center">
                        <input
                            type="radio"
                            name="slot"
                            value={slot._id}
                            disabled={slot.isBooked}
                            onChange={(e) => setSelectedSlotId(e.target.value)}
                        />
                        <span>
                            {new Date(slot.start).toLocaleString()} → {new Date(slot.end).toLocaleTimeString()}
                        </span>
                        {slot.isBooked && <span className="text-red-500 text-sm">Booked</span>}
                    </label>
                ))}
            </div>

            <button
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
                disabled={!selectedSlotId}
                onClick={handleBooking}
            >
                Book Selected Slot
            </button>
        </div>
    );
};

export default DoctorDetail;
