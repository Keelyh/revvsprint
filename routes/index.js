/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('music', { title: 'Express' });
};