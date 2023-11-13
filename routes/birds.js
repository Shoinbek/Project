const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Bird = require('../models/bird');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.ensureAuthenticated, async function(req, res, next) {
  const birds = await Bird.find();
  res.render('birds/index', {birdData: birds});
});


router.post('/create', authMiddleware.ensureAuthenticated, async function(req, res, next) {
  const newBird = new Bird(
      {
        species: req.body.species,
        nickName: req.body.nickName,
        status: req.body.status,
      },
  );

  try {
    await newBird.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect('/birds');
});

router.get('/update', authMiddleware.ensureAuthenticated, async function(req, res) {
  const id = req.query._id;

  const bird = await Bird.findById(id);

  res.render('birds/edit', {birdData: bird});
});

router.post('/update', authMiddleware.ensureAuthenticated, async function(req, res) {
  const id = req.body._id;

  await Bird.findOneAndUpdate({_id: id}, {
    species: req.body.species,
    nickName: req.body.nickName,
    status: req.body.status,
  });

  res.redirect('/birds');
});


router.get('/delete', authMiddleware.ensureAuthenticated, async function(req, res) {
  const id = req.query._id;

  await Bird.findByIdAndDelete(id);

  res.redirect('/birds');
});

module.exports = router;
