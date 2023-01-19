const User = require("../models/User");
const router = require("express").Router();
const requireLogin  = require('../middleware/requireLogin');


router.post('/:id',requireLogin,(req,res)=>{
  User.findByIdAndUpdate(req.params.id,{
      $push:{followers:req.body.userId}
  },{
      new:true
  },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
    User.findByIdAndUpdate(req.body.userId,{
        $push:{following:req.params.id}
        
    },{new:true}).select("-password").then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })

  }
  )
});
  
module.exports = router;