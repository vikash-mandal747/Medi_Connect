const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
    upsertProfile,
    getAllDoctors,
    getDoctorById,
    addSlots,
    bookSlot,
    doctorProfile
} = require('../controllers/doctor.controller');
const DoctorProfileModel = require('../models/doctor.model');

const DoctorRouter = express.Router();

/*  PUBLIC  */
DoctorRouter.get('/all-doctors', getAllDoctors);
DoctorRouter.get('/:id', getDoctorById);

/*  DOCTOR  */
DoctorRouter.post('/profile', authMiddleware(['doctor']), upsertProfile);   // create
DoctorRouter.patch('/profile', authMiddleware(['doctor']), upsertProfile);  // update
DoctorRouter.post('/slots', authMiddleware(['doctor']), addSlots);

/*  USER  */
DoctorRouter.post('/:docId/book', authMiddleware(['user']), bookSlot);

module.exports = DoctorRouter;
  