const jwt = require("jsonwebtoken");

function createToken(user, expiresIn) {
  //Get id and email from user object
  const { id, email } = user;
  //Payload. The second part of the token is the payload
  const payload = { id, email };

  //jwt.sign(payload, secretOrPrivateKey, [options, callback])
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn });
}

function decodeToken(token) {
  return jwt.decode(token, process.env.SECRET_KEY);
}

module.exports = {
  createToken,
  decodeToken,
};
