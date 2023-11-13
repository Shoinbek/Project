const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');


router.get('/create', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('patients/create');
});

router.get('/details', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('patients/details');
});

module.exports = router;
