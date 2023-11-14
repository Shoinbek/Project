const mongoose = require('mongoose');

// Create Schema
const patientSchema = new mongoose.Schema(
    {
      creatorId: {
        type: String,
        required: true,
      },
      creatorName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      birthdate: {
        type: Date,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      createDate: {
        type: Date,
        default: Date.now,
      },
      insuranceType: {
        type: String,
        required: true,
      },
      testType: {
        type: String,
        required: true,
      },
      doctorService: {
        type: String,
        required: true,
      },
      labName: {
        type: String,
        required: true,
      },
      sampleStatus: {
        type: String,
        required: true,
      },
    },
    {strict: false},
);


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
