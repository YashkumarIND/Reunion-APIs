const router = require("express").Router();
const {Post} = require("../models/Post");
const requireLogin = require('../middleware/requireLogin');


router.post('/createpost',requireLogin,(req,res)=>{
  const {title,description} = req.body 
  if(!title || !description){
    return  res.status(422).json({error:"Plase add all the fields"})
  }
  req.user.password = undefined
  const post = new Post({
      title,
      description,
      postedById:req.user
  })
  post.save().then(result=>{
      res.json({post:result})
  })
  .catch(err=>{
      console.log(err)
  })
});


router.post('/like/:id',requireLogin,(req,res)=>{
  Post.findByIdAndUpdate(req.params.id,{
      $push:{likes:req.user._id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
});


router.put('/unlike/:id',requireLogin,(req,res)=>{
  Post.findByIdAndUpdate(req.params.id,{
      $pull:{likes:req.user._id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
});




module.exports = router;