const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Patient = require('../models/patients');

router.get('/', async function(req, res, next) {
  const patients = await Patient.find();
  res.render('patients/details', {patientData: patients});
});

router.get('/create', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('patients/create');
});

router.post('/create', async function(req, res, next) {
  const newPatient = new Patient(
      {
        creatorId: req.body.creatorId,
        creatorName: req.body.creatorName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthdate: req.body.birthdate,
        zipcode: req.body.zipcode,
        state: req.body.state,
        phoneNumber: req.body.phoneNumber,
        createDate: req.body.createDate,
        insuranceType: req.body.insuranceType,
        testType: req.body.testType,
        doctorService: req.body.doctorService,
        labName: req.body.labName,
        sampleStatus: req.body.sampleStatus,
      },
  );

  try {
    await newPatient.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect('/patients');
});

router.get('/update', async function(req, res, next) {
  const id = req.query._id;

  const patient = await Patient.findById(id);

  res.render('patients/edit', {patientData: patient});
});

router.post('/update', async function(req, res, next) {
  const id = req.body._id;

  await Patient.findOneAndUpdate({_id: id}, {
    creatorId: req.body.creatorId,
    creatorName: req.body.creatorName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    zipcode: req.body.zipcode,
    state: req.body.state,
    phoneNumber: req.body.phoneNumber,
    createDate: req.body.createDate,
    insuranceType: req.body.insuranceType,
    testType: req.body.testType,
    doctorService: req.body.doctorService,
    labName: req.body.labName,
    sampleStatus: req.body.sampleStatus,
  });


  res.redirect('/patients');
});

router.get('/delete', async function(req, res, next) {
  const id = req.query._id;

  await Patient.findByIdAndDelete(id);

  res.redirect('/patients');
});

module.exports = router;
