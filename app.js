/** ---------- REQUIRE NODE MODULES ---------- **/
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
var passport = require('./auth/passport');
var configs = require('./config/auth');
var index = require('./routes/index');
var auth = require('./routes/auth');
var isLoggedIn = require('./utils/auth');
var private = require('./routes/private/index');
var database = require('./utils/database');
var Destination = require('./models/destination');

/** ---------- EXPRESS APP CONFIG ---------- **/
var app = express();
app.use('/public', express.static('public')); // serve files from public

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
/** ---------- DATABASE CONNECTION HANDLING ---------- **/
database();
/** ---------- SESSION CREATION AND STORAGE ---------- **/
/**
 * Creates session that will be stored in memory.
 * @todo Before deploying to production,
 * configure session store to save to DB instead of memory (default).
 * @see {@link https://www.npmjs.com/package/express-session}
 */
app.use(session({
    secret: configs.sessionVars.secret,
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {
        maxage: 60000,
        secure: false
    },
}));
/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());
/** ---------- ROUTES ---------- **/
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/login', index);
app.use('/', isLoggedIn, index);

app.get('/loginStatus', function(req, res) {
    res.send(req.isAuthenticated());
});

app.post('/destination', function(req, res) {
    var user = req.user;
    var destName = req.body.destinationName;
    destName = destName.toString();
    var destination = new Destination({
        googleId: req.user._id,
        destinationName: destName
    });
    destination.save(function(err) {
        if (err) {
            console.log('Error saving', err);
            res.sendStatus(500);
            return;
        } else {
          res.sendStatus(200);
        }
    });
});

app.get('/dest', function(req, res) {
    Destination.find({}, function(err, destination) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.send(destination);
    });
}); //for getting list of destinations from DB



app.get('/destination/:destinationName', function(req, res) {
  console.log('This is working', req.params);
  var query = {
      destinationName: req.params.destinationName
  };

    Destination.find(query, {}, function(err, destination) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.send(destination);
    });
}); // for getting info for specific destination from DB to fill form fields



app.put('/destination', function(req, res) {
    console.log(req.body);
    var query = {
        destinationName: req.body.destinationName
    };

    Destination.update(query, {
        destinationName: req.body.destinationName,
        lodgingName: req.body.lodgingName,
        lodgingAddress: req.body.lodgingAddress,
        lodgingFrom: req.body.lodgingFrom,
        lodgingTo: req.body.lodgingTo,
        lodgingResNum: req.body.lodgingResNum,
        lodgingNote: req.body.lodgingNote,
        arrivalHow: req.body.arrivalHow,
        arrivalWhere: req.body.arrivalWhere,
        arrivalTime: req.body.arrivalTime,
        arrivalResNum: req.body.arrivalResNum,
        departureHow: req.body.departureHow,
        departureWhere: req.body.departureWhere,
        departureTime: req.body.departureTime,
        departureResNum: req.body.departureResNum,
        toDos: req.body.toDos
    }, function(err, response) {
        if (err) {
            console.log('Error saving', err);
            res.sendStatus(500);
            return;
        };
    });
}); // for updating based on changes to form fields




app.use('/*', isLoggedIn, index);


/** ---------- SERVER START ---------- **/
app.listen(3000, function() {
    console.log('Now running on port ', 3000);
});
