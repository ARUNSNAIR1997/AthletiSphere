const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
  profile:{
    type: String
  },
    userId:{
        type: String
    },
    name:{
        type: String
    },
    caption:{
        type: String,
        required: true
    },
    images:{
        type: String,
        required: true
    },
    likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: String,
      comment: String,
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    likedBy: {
  type: [String], // array of userId (or usernames)
  default: []
}

})

const postModel = mongoose.model("post",postSchema)


module.exports=postModel