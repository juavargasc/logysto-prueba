const User = require('../models/user.js');

exports.list = function(req, res){
  let query = {};
  const page = req.params.page || 1;
  const options = {
    select: 'first last user',
    page: page
  };
  User.paginate(query, options).then(function(result) {
    res.json(result);
  });
};

exports.show = function(req, res){
  User.findById(req.params.id)
    .select('first last user')
    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: 'PersonNotFound'});
      } else {
        res.json(doc);
      }
  });
};

