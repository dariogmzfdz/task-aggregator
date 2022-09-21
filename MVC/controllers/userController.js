const bcryptjs = require('bcryptjs');
const User = require('../Models/userModel');

async function postUser(req, res){
    const params = req.body;
    const user = new User(params);

    try{
        //require email and pasword
        if(!params.email) throw{msg: "Error: email can not be null"};
        if(!params.password) throw{msg: "Error: password can not be null"};

        //Avoid duplicated emails
        const emailExists = await User.findOne({email: params.email});
        if (emailExists) throw {msg: "Email already exists"};

        // encrypting pasword
        const salt = bcryptjs.genSaltSync(10);
        user.pasword = await bcryptjs.hash(params.password, salt);

        user.save();
        res.status(201).send({user: user});

    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = {postUser}