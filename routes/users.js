const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');

router.get('/', async function(req, res, next) {
  const users = await User.find();

  res.render('users/index', {userData: users});
});

router.get('/create', function(req, res, next) {
  res.render('users/create');
});

router.post('/create', async function(req, res, next) {
  const newUser = new User(
      {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
      },
  );

  newUser.password = newUser.generateHash(req.body.password);

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect('/users');
});

router.get('/update', async function(req, res, next) {
  const id = req.query._id;

  const user = await User.findById(id);

  res.render('users/edit', {userData: user});
});

router.post('/update', async function(req, res, next) {
  const id = req.body._id;

  const tempUser = new User();

  if (req.body.password) {
    const newHashedPassword = tempUser.generateHash(req.body.password);

    await User.findOneAndUpdate({_id: id}, {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: newHashedPassword,
      role: req.body.role,
    });
  } else {
    await User.findOneAndUpdate({_id: id}, {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
    });
  }


  res.redirect('/users');
});

router.get('/delete', async function(req, res, next) {
  const id = req.query._id;

  await User.findByIdAndDelete(id);

  res.redirect('/users');
});

module.exports = router;
