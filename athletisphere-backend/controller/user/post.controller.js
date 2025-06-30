const postModel = require("../../model/user/post.model")
const path = require("path");

exports.postInert = async(req,res)=>{
    try{

        const file =  req.files.images;
        const imageName = file.name;
        const imagePath = path.join(__dirname,"../../public/img/" + imageName)
        await file.mv(imagePath)

    const params = {
        profile: req.body.profile,
        userId: req.body.userId,
        name: req.body.name,
        caption: req.body.caption,
        images: imageName
    }

        await postModel.create(params)
        res.json("inserted")
    }catch(err){
        console.error(err);
    }
}



exports.postView = async(req,res)=>{
    try{
        let view = await postModel.find().sort({ createdAt: -1 }); // 🆕 newest first
        res.json(view)
    }catch(err){
        console.error(err);
    }
}

exports.postViewComment = async(req,res)=>{
    try{
        const commentId = req.params.commentId; 
        let view = await postModel.findById(commentId) // 🆕 newest first
        res.json(view)
    }catch(err){
        console.error(err);
    }
}



exports.likePost = async (req, res) => {
  try {


    const postId = req.params.id;
    const userId = req.body.userId; // 👈 Make sure this is passed from frontend

    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json("Post not found");

    if (post.likedBy.includes(userId)) {
      return res.status(400).json("User already liked this post");
    }

    post.likes += 1;
    post.likedBy.push(userId);

    await post.save();
    res.json("Liked");

  } catch (err) {
    console.error(err);
    res.status(500).json("like failed");
  }
};


exports.commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { user, comment } = req.body;

    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: { user, comment },
      },
    });

    res.json("commented");
  } catch (err) {
    console.error(err);
    res.status(500).json("comment failed");
  }
};
