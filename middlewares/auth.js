const jwt = require ('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config()

const auth = function(req, res, next){
    let {token} = req.headers;
    
    if(token){
        jwt.verify(token, process.env.secretKey, function(err, decoded){
            if(decoded){
                let decodedId = decoded._id
                User.findById(decodedId)
                .then(function(user){
                    if(user){
                        //if found === id similar
                        req.decoded = decoded;
                        next();
                    }
                    else{
                        res.status(403)
                        .json("UNAUTHORIZED")
                    }
                })
                .catch(function(err){
                    res.status(401)
                    .json(err.message)
                })
            }
            else{
                res.status(403).json("Please Log In")
            }
        })
    }
   
}

module.exports = auth;