var express = require('express');
var session = require('express-session');
var keyboard = require('node_keyboard');
var cookieParser = require('cookie-parser');
var path = require('path');
var index = require('./routes/index');
var tweets = require('./routes/tweets');


var app = express();
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;



//twitter login  
passport.use(new TwitterStrategy({
    consumerKey: 'WMYkLAwkdkvbl2LkqfaBINZqV',
    consumerSecret: 'UG24gdCVpDUcOWSNah2pwQvNnGM5Yv2CGdQlejwxrbFFj9P5P8',
    callbackURL: "http://localhost:5000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    var user = profile;
    return done(null, user);
  }
));

//enable session cookies
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// look for view html in the views directory
app.set('views', path.join(__dirname, 'views'));

// use ejs to render 
//app.set('view engine', 'ejs');
//app.engine('.html', require('ejs').__express);
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// setup routes
app.use('/', index);
app.use('/tweets', tweets);


module.exports = app;

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
