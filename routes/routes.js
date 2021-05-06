const config = require('./../config');
const moment = require('moment');
const jwt = require('jwt-simple');
const Auth = require('./../controllers/auth.js');
const User = require('./../controllers/user.js');
const Coords = require('./../controllers/cords.js');
const ensureAuthenticated = require('./../middleware/ensure-authenticated');

module.exports = function (app) {
  // 4. Authentication Routes
  app.post('/auth/login', Auth.login);
  app.post('/auth/signup', Auth.signup);
  app.post('/auth/refresh', Auth.refresh);
  // 5. Application Routes
  app.get('/user', ensureAuthenticated, User.list);
  app.get('/user/page/:page', ensureAuthenticated, User.list);
  app.get('/user/:id', ensureAuthenticated, User.show);
  app.get('/coordinates', ensureAuthenticated, Coords.list);
};