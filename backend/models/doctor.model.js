const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    isBooked: { type: Boolean, default: false }
})

const doctorProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    speciality: { type: String, required: true },
    fees: { type: Number, required: true },
    availableSlots: [SlotSchema],
    clinicAddress: { type: String, required: true },
    emergencyContact: { type: Number, required: true },
    gender: { type: String }
}, { timestamps: true });


const DoctorProfileModel = mongoose.model('DoctorProfile', doctorProfileSchema)
module.exports = DoctorProfileModel;

