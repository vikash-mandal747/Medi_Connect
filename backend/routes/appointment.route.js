const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
  getUserAppointments,
  getDoctorAppointments
} = require('../controllers/appointment.controller');

const ApptRouter = express.Router();

// Logged‑in user’s own list
ApptRouter.get('/me', authMiddleware(['user', 'doctor']), getUserAppointments);

// Doctor views their appointments (must match :docId with doctor’s own profile id)
ApptRouter.get('/:docId', authMiddleware(['doctor']), getDoctorAppointments);

module.exports = ApptRouter;
