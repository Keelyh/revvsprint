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
  console.log("username:", req.body.username);
  console.log("password:", req.body.uncryptpass);
  
  var hashedPassword = bcrypt.hashSync(req.body.uncryptpass, 10);
  var new_user = new models.User({name: req.body.username, password: hashedPassword});
  new_user.save(function(err){
    if (err) return console.log("error while saving new user" + req.body.username, err);
  });
  req.session.user = new_user;
  res.redirect('/');
}

exports.login = function(req,res){
  var userPasswordHash = hashedPassword;
  var rightEnteredPassword = "SuperSecretPassword";
  var success  = bcrypt.compareSync(rightEnteredPassword, hashedPassword); 
  var user = models.User.find({name: req.body.username }, function(err, docs){
    if (err) return console.log("error finding user by that name");
    else if (docs.length == 1){
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