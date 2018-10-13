var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

let Load = new Schema({
    owner:{
      type:String
    },
    name:{
      type:String
    },
    caliber:{
      type:String
    },
    bulletWeight:{
      type:Number
    },
    bulletType:{
      type:String
    },
    powderWeight:{
      type:Number
    },
    powderType:{
      type:String
    },
    oal:{
      type:Number
    },
    primer:{
      type:String
    },
    notes: [{
      type: String
    }]
});

Load.plugin(passportLocalMongoose);

module.exports = mongoose.model('Load', Load);
