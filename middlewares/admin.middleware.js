const { invalid } = require("joi");
const {to} = require("../helpers/to_promise");
const jwtService = require("../services/jwt.service");
const adminJwt = require("../services/jwt.service");


module.exports = async function(req, res, next) {
  try {
    const token = req.cookies.accessToken; 

    if (!token)
      return res.status(401).send({message: "Unauthorized"});

    const isValid = await jwtService.verifyAccessToken(token);
    console.log("verification " + isValid)

    const [error, decodedToken] = await to(
      adminJwt.verifyAccessToken(token)
    );

    if (error) 
      return res.status(401).send({ message: error.message});

    req.admin = decodedToken;

    next();

  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: error.message });
  }
}