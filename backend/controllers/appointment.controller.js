const Appointment = require('../models/appointment.model');

// user ==> own appointments
const getUserAppointments = async (req, res) => {
  try {
    const list = await Appointment.find({ user: req.userId })
      .populate('doctor', 'speciality fees')
      .sort('-createdAt');
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ msg: 'Internal error', error: err.message });
  }
};

// doctor ==> appointments for that doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const list = await Appointment.find({ doctor: req.params.docId })
      .populate('user', 'name email')
      .sort('-createdAt');
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ msg: 'Internal error', error: err.message });
  }
};

module.exports = { getUserAppointments, getDoctorAppointments };
