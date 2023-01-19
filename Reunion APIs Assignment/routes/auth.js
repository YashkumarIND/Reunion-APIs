const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require('../keys');
const requireLogin = require('../middleware/requireLogin');


router.post('/register',(req,res)=>{
  const {username,email,password} = req.body 
  if(!email || !password || !username){
     return res.status(422).json({error:"please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                username
            })
    
            user.save()
            .then(user=>{
                res.json({message:"User registered successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
});



router.post('/authenticate',(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
     return res.status(422).json({error:"please add email or password"})
  }
  User.findOne({email:email})
  .then(savedUser=>{
      if(!savedUser){
         return res.status(422).json({error:"Invalid Email or password"})
      }
      bcrypt.compare(password,savedUser.password)
      .then(doMatch=>{
          if(doMatch){
              
             const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
             const {_id,username,email,followers,following} = savedUser
             res.json({token,user:{_id,username,email,followers,following}})
          }
          else{
              return res.status(422).json({error:"Invalid Email or password"})
          }
      })
      .catch(err=>{
          console.log(err)
      })
  })
})



module.exports = router;