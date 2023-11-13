const express = require('express');
const router = express.Router();
const Bird = require('../models/bird');
const authMiddleware = require('../middleware/auth');

/* GET home page. */
router.get('/', authMiddleware.ensureAuthenticated, async function(req, res, next) {
  res.render('index');
});

module.exports = router;
