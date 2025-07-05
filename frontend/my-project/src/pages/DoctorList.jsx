import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        api.get("/doctors/all-doctors")
            .then((res) => setDoctors(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold mb-6">All Available Doctors</h1>
            {doctors.length === 0 && <p>No doctors found.</p>}
            {doctors.map((doc) => (
                <div key={doc._id} className="p-4 border rounded shadow-sm">
                    <Link to={`/doctors/${doc._id}`} className="text-lg font-semibold text-blue-600 underline">
                        {doc.user?.name}
                    </Link>
                    <h3 className="text-xl font-semibold">{doc.user?.name}</h3>
                    <p><strong>Speciality:</strong> {doc.speciality}</p>
                    <p><strong>Fees:</strong> ₹{doc.fees}</p>
                    <p><strong>Email:</strong> {doc.user?.email}</p>
                </div>
            ))}
        </div>
    );
};

export default DoctorList;
