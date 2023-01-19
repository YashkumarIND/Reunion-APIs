const router = require("express").Router();
const {Post} = require("../models/Post");
const requireLogin = require('../middleware/requireLogin');


router.post('/:id',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.params.id,{
        $push:{comment:comment}
    },{
        new:true
    })
    .populate("comment.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
});

module.exports = router;