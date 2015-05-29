var express = require('express');
var passport = require('passport')
, TwitterStrategy = require('passport-twitter').Strategy
, ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var router = express.Router();


/* GET home page. */
router.get('/',
	ensureLoggedIn('/login'),
	function(req, res) {
		res.render('index', { username: req.user.username });
	});

module.exports = router;

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at /auth/twitter/callback
router.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));
							 
router.get('/account',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
  });	

router.get('/login',
  function(req, res) {
    res.render('login');
  });  

router.get('/keypress',
  function(req, res) {
    console.log("performing keyboard stuff");
    robot.keyTap("enter");
  });