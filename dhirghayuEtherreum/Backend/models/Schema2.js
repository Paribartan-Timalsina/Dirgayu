const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctname: {
    type: String,
    required: true,
  },
  patientname: {
    type: String,
    required: true,
  },
  appointmentday: {
    type: Date,
    required: true,
  },
});

// Define the model
const Appointment = mongoose.model('bookingtime', bookingSchema);

// Export the model
module.exports = Appointment;
