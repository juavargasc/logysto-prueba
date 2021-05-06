const bcrypt = require('bcryptjs'),
      jwt = require('jwt-simple'),
      moment = require('moment'),
      crypto = require("crypto");
const db = require("./../services/db");

const config = require('./../config');

module.exports = {
	signup,
	login,
	refresh
};

async function signup({first, last, user, password}) {
	const userdb = await db.User.findOne({ user });
	console.log(userdb);
	if (!userdb) {
      	let newUser = new db.User({
      		first,
      		last,
      		user,
      		password
      	});
      	try {
      		await newUser.save()  
	      	const userfn = await db.User.findOne({ user });
	      	return {message: 'Creacion exitosa', user: userfn}
      	}catch (e) {
      		throw e
      	}
      	
    }else{
      	throw 'El usuario ya existe';
    }
};

async function login({ username, password }) {
	const userdb = await db.User.findOne({ user:username });
	const test = await bcrypt.compare(password, userdb.password);
	if (!userdb || !test) {
	    throw 'Usuario o contraseña incorrectos'
	}
	const jwtToken = generateJwtToken(userdb.id);
	const refreshToken = generateRefreshToken(userdb);

	await refreshToken.save();

	return {message:'Logueo exitoso', user:userdb.user, token:jwtToken, refreshtoken:refreshToken}
}

async function refresh({ refreshtoken }) {
	const refreshToken = await getRefreshToken(refreshtoken);
    const { user } = refreshToken;

    const newRefreshToken = generateRefreshToken(user);
    refreshToken.revoked = Date.now();
    refreshToken.replacedByToken = newRefreshToken.token;
    
    await refreshToken.save();
    await newRefreshToken.save();

    const jwtToken = generateJwtToken(user.id);

    return {message:'refresco exitoso', user:user.user, token:jwtToken, refreshtoken:newRefreshToken}
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({ token }).populate('user');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

function generateJwtToken(user) {
    let ahora = moment();
    ahora.add(moment.duration("00:15:00"));
    return jwt.encode({ sub: user, exp: ahora.unix() }, config.TOKEN_SECRET);
}

function generateRefreshToken(user) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000)
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}