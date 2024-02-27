const mongoose=require('mongoose')
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  availability: {
    type: [{
      type: Date,
      required: true
    }],
    required: true
  }
});
// Define the model
const Doctor = mongoose.model('doctors', doctorSchema);

// Export the model
module.exports = Doctor;