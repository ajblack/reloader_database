import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Account from './models/Account';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
/*
import Issue from './models/Issue';

import User from './models/User';
*/
import crypto from 'crypto';
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
    //console.log(""+jwtBearerToken);
    res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
    console.log("successfully authenticated with user: "+req.user.username);


    res.json({
      user:req.user.username
    });
  });
  /*
  const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 120,
      subject: "testuser"
  });
  console.log(""+jwtBearerToken);*/
})

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

/*

router.route('/users').get((req,res) =>{
  User.find((err, users)=>{
    if (err){
      console.log(err);
    }
    else{
      res.json(users);
    }
  })
})

router.route('/users/add').post((req,res)=>{
  let user = new User(req.body);
  user.save()
    .then(user =>{
      res.status(200).json({'user': 'Added successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new user');
    })
})

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load Document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

*/

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
