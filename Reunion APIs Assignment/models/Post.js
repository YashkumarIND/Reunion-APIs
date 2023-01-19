const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postedById: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User"
    },
    title:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    likes: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    comment:[{
      text:String,
      postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
    }],
  },
  { timestamps: true }
);



const Post = mongoose.model('Post', PostSchema);

module.exports = {Post};