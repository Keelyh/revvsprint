var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Routine = mongoose.model('Routine')
  , models = require('../models')
  , Activity = mongoose.model('Activity')
  , bcrypt = require('bcrypt');



exports.signin = function(req,res){
  res.render('sign_in', {title:'Tempo'});
}

exports.signup = function(req,res){
  res.render('sign_up', {title:'Tempo'});
}


exports.create = function(req, res){
  console.log(req.body);
  console.log("username:", req.body.username);
  console.log("password:", req.body.uncryptpass);
  
  var hashedPassword = bcrypt.hashSync(req.body.uncryptpass, 10);
  var new_user = new User({name: req.body.username, password: hashedPassword});
  User.find({name: req.body.username}).exec(function(err, user){
    if (err) throw err;
    if (user.length == 0){
      new_user.save(function(err){
        if (err) return console.log("error while saving new user" + req.body.username, err);
        req.session.user = new_user;
        res.send({redirect: '/newRoutine'});
      });
    } else {
      res.send({unique: false});
    }
  });
}

exports.login = function(req,res){
  User.find({name: req.body.username}).exec(function(err, user){
    if (err) throw err;
    if (user.length == 0){
      res.send({verified: false});
    } else {
      var rightEnteredPassword = user[0].password;
      var success  = bcrypt.compareSync(req.body.uncryptpass, rightEnteredPassword);
      if (success) {
        req.session.user = user[0];
        res.send({redirect: '/myroutines'});
      }
    }
  });
}

exports.allusers = function(req, res){
  User.find().exec(function (err, users){
    res.render('layout', {title:'All Users'});
  });
};