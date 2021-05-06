const jwt = require('jwt-simple'),
      moment = require('moment');

const config = require('./../config');
const db = require("./../services/db");

module.exports = ensureAuthenticated;

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  const token = req.headers.authorization.split(' ')[1];
  let payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ error: err.message });
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: 'TokenExpired' });
  }
  db.User.findById(payload.sub, function(err, person){
    if (!person){
      return res.status(401).send({error: 'PersonNotFound'});
    } else {
      req.user = payload.sub;
      next();
    }
  });
};