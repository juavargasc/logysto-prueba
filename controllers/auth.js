const userService = require("./../services/auth");

exports.signup = async function(req, res, next){
  const {first, last, user, password} = req.body;
  try {
    userService.signup({first, last, user, password})
    .then(({ message, user }) => {
      res.status(200);
      res.json({message, user});
    })
    .catch(next);  
  }catch(e){
    throw e;
  }
};

exports.login = async function(req, res, next){
  const { username, password } = req.body;
  try{
    userService.login({ username, password })
    .then(({ message, user, token, refreshtoken }) => {
      res.status(200);
      res.json({message, user, token, refreshtoken:refreshtoken.token, expiresRefreshToken:refreshtoken.expires});
    })
    .catch(next);  
  }catch (e){
    throw e;
  }
};

exports.refresh = function(req, res, next){
  const { refreshtoken } = req.body;
  try{
    userService.refresh({ refreshtoken })
    .then(({ message, user, token, refreshtoken }) => {
      res.status(200);
      res.json({message, user, token, refreshtoken:refreshtoken.token, expiresRefreshToken:refreshtoken.expires});
    })
    .catch(next);  
  }catch (e){
    throw e;
  }
};