const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorProfile', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        slot: {                 // snapshot of the booked slot
            start: Date,
            end: Date
        },
        status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
        notes: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
