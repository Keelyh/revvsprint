var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Routine = mongoose.model('Routine')
  , models = require('../models')
  , Activity = mongoose.model('Activity');

exports.myroutines = function(req, res){
  if (req.session.user.name) {
    User.findOne({ name: req.session.user.name }).populate('_routines').exec(function (err, docs) {
      User.populate(docs, {path: '._activities'}, function (err, docs) {
        if (err) throw err;
        res.render('myroutines', {title:'Tempo', routines: docs._routines, username: req.session.user.name});
      })
    })
  }
  // else {
  //   Routine.find().populate('_activities').exec(function (err, routines){
  //     res.render('myroutines', {title:'Tempo', routines: routines});
  //   });
  // }
}

exports.songsinroutine = function(req, res){
  Routine.find({'title':req.body.title}).populate('_activities', null, null, { sort: [['order', 'asc']] }).exec(function (err, routine){
    res.render('_songsinroutine', {title:'Tempo', routine: routine, index:req.body.index});
  });
};

exports.removeRoutine = function(req, res){
  Routine.findOneAndRemove({'title':req.body.title}).exec(function(err){
    if (err) { throw err; }
    console.log("found and removed");
    return res.send(true);
  });
}

exports.editRoutine = function(req, res){
  Routine.find({'title':req.body.title}).populate('_activities', null, null, { sort: [['order', 'asc']] }).exec(function (err, routine){
      console.log(routine);
      res.render('index', {title: 'Tempo', routine: routine});
      // res.send({redirect: '/myroutines'});
  });
}