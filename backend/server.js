import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Account from './models/Account';
import Load from './models/Load';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


mongoose.connect('mongodb://testuser:testpassword1@ds261332.mlab.com:61332/loaddata');

const connection = mongoose.connection;

const RSA_PRIVATE_KEY = fs.readFileSync('private.key');



connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/login').post((req, res) =>{
  passport.authenticate('local')(req, res, function(){

    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: req.user.username
    });
    res.json({
      idToken: jwtBearerToken,
      expiresIn: 120,
      username:req.user.username
    });
  });
});

router.route('/makeload').post((req, res) =>{
  let load = new Load(req.body);
  load.save()
      .then(issue => {
          res.status(200).json({'load': 'modified successfully'});
      })
      .catch(err => {
        console.log(err);
          res.status(400).send('Failed to create new record');
      });
});

router.route('/editload').put((req, res) =>{
  console.log('hit route');

  Load.findByIdAndUpdate(req.body._id, req.body,{ new: true }, function(err, post){
    if(err){
      console.log("Error in update load");
      return next(err);
    }
    console.log("load modified successfully");
    console.log(post);
    res.json(post);
  });
});



router.route('/userloads/:username').get((req, res) =>{
  Load.find({owner: req.params.username}, function(err, loads){
    if (err)
        console.log(err);
    else
        res.json(loads);
  })
});

router.route('/reg').post((req, res) =>{
  Account.findOne({username: req.body.username}, function(err, user){
    if(err){console.log('error in findOne')}
    if(!user){
      console.log('user does not exist');
      Account.register(new Account({ username : req.body.username}), req.body.password, function(err, account) {
          if (err) {
            console.log("errors....")
            console.log(err);
            res.json(err)
          }

          res.json(req.body.username);
      });
    }
    else{
      console.log('user exists');
      res.json("user exists");
      //return done(null, fals, {message: "User already exists"});
    }
  })

});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
