const User  = require('../models/user');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');

class UserController{
    
   static signUp(req,res){
      let {name, email, password} = req.body;

      User.create({
         name,
         email,
         password,
      })
      .then(function(){
         res.status(201)
         .json({
            message: "Successfully created new user",
         })
      })
      .catch(function(err){
         res.status(401)
         .json({
            message: err.message
         })
      })
   }
   
  static signIn(req,res){
    let {email, password} = req.body;
    User.findOne({ email })
    .then(function(user){
      user.comparePassword(password, function(err, isMatch){
        if(err){
            res.status(401).json(err.message)
        }
        else{
          if(isMatch){
            let token = jwt.sign({_id: user._id}, process.env.secretKey)
            res.status(200)
            .json({
                user, 
                token, 
                message: "Token generated"
            });
          }
          else{
            res.status(400)
            .json({
                message: "Password is wrong!"
            })
          }
        }
      })
    })
    .catch(function(err){
        res.status(400)
        .json(err.message);
    })
  }
}

module.exports = UserController;