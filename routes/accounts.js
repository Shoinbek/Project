const passport = require('passport');
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/login', function(req, res) {
  res.render('../views/accounts/login', {message: req.flash('loginMessage')});
});

router.get('/signup', function(req, res) {
  res.render('../views/accounts/signup',
      {message: req.flash('signupMessage')});
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure home page
  failureRedirect: '/accounts/signup',
  failureFlash: true, // allow flash messages
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/', // redirect to the home page
  failureRedirect: '/accounts/login',
  failureFlash: true, // allow flash messages
}));

// makes sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
