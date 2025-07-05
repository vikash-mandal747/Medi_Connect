const Appointment   = require('../models/appointment.model');
const DoctorProfileModel = require('../models/doctor.model');

// ‑‑‑  Create or update doctor profile  ‑‑‑
const upsertProfile = async (req, res) => {
  try {
    const data = { ...req.body, user: req.userId };
    const profile = await DoctorProfileModel.findOneAndUpdate(
      { user: req.userId },
      data,
      { runValidators: true, upsert: true, new: true }
    );
    res.status(200).json({ msg: 'Profile saved', profile });
  } catch (err) {
    res.status(500).json({ msg: 'Internal error', error: err.message });
  }
};

// ‑‑‑  Public: list all doctors or filter by speciality  ‑‑‑
const getAllDoctors = async (req, res) => {
  try {
    const filter = req.query.speciality ? { speciality: req.query.speciality } : {};
    const docs = await DoctorProfileModel.find(filter).populate('user', 'name email');
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ msg: 'Internal error', error: err.message });
  }
};

// ‑‑‑  Public: get one doctor by id  ‑‑‑
const getDoctorById = async (req, res) => {
  try {
    const doc = await DoctorProfileModel.findById(req.params.id).populate('user', 'name email');
    if (!doc) return res.status(404).json({ msg: 'Doctor not found' });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ msg: 'Internal error', error: err.message });
  }
};



// ‑‑‑  Doctor: add new slots  ‑‑‑
const addSlots = async (req, res) => {
  /* body = [{start, end}, ...] */
  try {
    const profile = await DoctorProfileModel.findOne({ user: req.userId });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    profile.availableSlots.push(...req.body);
    await profile.save();

    res.status(200).json({ msg: 'Slots added', slots: profile.availableSlots });
  } catch (err) {
    res.status(500).json({ msg: 'Internal error', error: err.message });
  }
};

// ‑‑‑  User: book a slot  ‑‑‑
const bookSlot = async (req, res) => {
  /*
    route: POST /doctors/:docId/book
    body:  { slotId }
  */
  try {
    const profile = await DoctorProfileModel.findById(req.params.docId);
    if (!profile) return res.status(404).json({ msg: 'Doctor not found' });

    const slot = profile.availableSlots.id(req.body.slotId);
    if (!slot || slot.isBooked) return res.status(400).json({ msg: 'Slot unavailable' });

    // mark slot
    slot.isBooked = true;
    await profile.save();

    // create appointment
    const appointment = await Appointment.create({
      doctor: profile._id,
      user:   req.userId,
      slot: { start: slot.start, end: slot.end }
    });

    res.status(201).json({ msg: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ msg: 'Internal error', error: err.message });
  }
};

module.exports = {
  upsertProfile,
  getAllDoctors,
  getDoctorById,
  addSlots,
  bookSlot
};
