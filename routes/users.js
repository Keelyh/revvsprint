var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Routine = mongoose.model('Routine')
  , models = require('../models')
  , Activity = mongoose.model('Activity');



exports.signin = function(req,res){
  res.render('sign_in', {title:'Tempo'});
}

exports.signup = function(req,res){
  res.render('sign_up', {title:'Tempo'});
}