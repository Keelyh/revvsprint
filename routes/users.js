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


exports.newuser = function(req, res){
  res.render('newUser', {title: "Login or Create a New User"});
};

exports.create = function(req, res){
  var user = models.User.find({name: req.body.username }, function(err, docs){
    if (err) return console.log("error finding user by that name");
    if (!docs.length){
      var new_user = new models.User({name: req.body.username});
      new_user.save(function(err){
        if (err) return console.log("error while saving new user" + req.body.username, err);
      });
      req.session.user = new_user;
      res.redirect('/');
    } else if (docs.length == 1){
      console.log(docs);
      req.session.user = docs[0];
      res.redirect('/');
    } else{
      console.log("ERROR: more than one user with the same name!");
    };



  });
}

exports.allusers = function(req, res){
  User.find().exec(function (err, users){
    res.render('layout', {title:'All Users'});
  });
};