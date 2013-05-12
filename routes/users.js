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
  new_user.save(function(err){
    if (err) return console.log("error while saving new user" + req.body.username, err);
    console.log(req.session);
    req.session.user = new_user;
    res.send({redirect: '/newRoutine'});
  });
}

exports.login = function(req,res){
  User.findOne({name: req.body.username}).exec(function(err, user){
    if (err) throw err;
    console.log('db user', user);
    var rightEnteredPassword = user.password;
    var success  = bcrypt.compareSync(req.body.uncryptpass, rightEnteredPassword);
    if (success) {
      console.log('success');
      req.session.user = user;
      res.send({redirect: '/myroutines'});
    }
  });
}

exports.allusers = function(req, res){
  User.find().exec(function (err, users){
    res.render('layout', {title:'All Users'});
  });
};