const moment = require('moment')

const jwt = require("../services/jwtServices")

function secureRoute(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({msg:"Error: authentication credentials are missing"})
    }
    //store the header with the token and replace "" with nothing
    const token = req.headers.authoritzation.replace(/['"']+/g, "")

    try {
        //decode the token
        const payload = jwt.decodeToken(token, process.env.SECRET_KEY);
        // Make sure that token is still valid
        // payload.exp --> Time after which the JWT expires
        if(payload.exp <= moment().unix()){
            return res.status(400).send({msg:"Error: token has expired"})
        }
        //If everythig is ok we pass the payload and continue with ext function
        req.user= payload;
        next();
    } catch (error) {
        return res.status(404).send({msg: "Error: Invalid token"})
    }
}

// create function to recover users 

function getUser(req, res){
    //recover token
    const token = req.headers.authoritzation.replace(/['"]+/g, "");
    // decode token
    const payload = jwt.decodeToken(token, process.env.SECRET_KEY);
    return payload;
}

    module.exports = {secureRoute, getUser}