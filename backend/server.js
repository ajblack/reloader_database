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
var splunkjs = require('splunk-sdk');

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
//austin

/*enter splunk service data here*/
var service = new splunkjs.Service({
  username: "*",
  password: "*",
  scheme:"*",
  host:"*",
  port:"*"
});


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

router.route('/uniquedatafeeds').get((req, res)=>{
  console.log("in backend")
  res.json("unique data feeds called from front end");
})



let getUniqueDataFeeds = function(){
  service.login(function(err, success) {
    if (err) {
        throw err;
    }
    var searchName = "unique_data_feeds"
    // Retrieve the saved search collection
    var mySavedSearches = service.savedSearches();
    mySavedSearches.fetch(function(err, mySavedSearches) {
      // Retrieve the saved search that was created earlier
      var mySavedSearch = mySavedSearches.item(searchName);
      // Run the saved search and poll for completion
      mySavedSearch.dispatch(function(err, job) {
        // Display the job's search ID
        console.log("Job SID: ", job.sid);

        // Poll the status of the search job
        job.track({
          period: 200
        }, {
          done: function(job) {
            console.log("Done!");

            // Print out the statics
            console.log("Job statistics:");
            console.log("  Event count:  " + job.properties().eventCount);
            console.log("  Result count: " + job.properties().resultCount);
            console.log("  Disk usage:   " + job.properties().diskUsage + " bytes");
            console.log("  Priority:     " + job.properties().priority);

            job.results(function(err, results, job) {
              console.log(results);
              return results;
            });
          },
          failed: function(job) {
            console.log("Job failed")
          },
          error: function(err) {
            done(err);
          }
        });
      });
    });
  });
}
// Print installed apps to the console to verify login

  /*
  var latestDate = new Date(Date.now());
  let one_day_in_milliseconds = 1000*60*60*24
  var earliestDate = new Date(latestDate - one_day_in_milliseconds);
  var searchQuery = "search * | head 10";
  var searchParams = {
    earliest_time: earliestDate.toISOString(),
    //latest_time: "2019-06-25T12:00:00.000-07:00"
    latest_time: latestDate.toISOString()
  };
  console.log("search params are: ");
  console.log(searchParams)
  // Run a oneshot search that returns the job's results
  service.oneshotSearch(
    searchQuery,
    searchParams,
    function(err, results) {
      // Display the results
      var fields = results.fields;
      var rows = results.rows;

      for(var i = 0; i < rows.length; i++) {
        var values = rows[i];
        console.log("Row " + i + ": ");

        for(var j = 0; j < values.length; j++) {
          var field = fields[j];
          var value = values[j];
          console.log("  " + field + ": " + value);
        }
      }
    }
  );*/

  /*
  // List all saved searches for the current username
  var mySavedSearches = service.savedSearches();
  mySavedSearches.fetch(function(err, mySavedSearches) {

      console.log("There are " + mySavedSearches.list().length + " saved searches");

      var savedSearchColl = mySavedSearches.list();

      for(var i = 0; i < savedSearchColl.length; i++) {
          var search = savedSearchColl[i];
          console.log(i + ": " + search.name);
          console.log("    Query: " + search.properties().search + "\n");
      }
  });*/

  // The saved search created earlier
  //var searchName = "Status of all data devices";




app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
