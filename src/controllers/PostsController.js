const Post  =  require('../models/post');
module.exports = {

    create(req, res, next) {
        const post = new Post({
            title  : req.body.title,
            content: req.body.content,
            user   : req.userId
        });
        post.save()
            .then((savedPost)=>{
                const resPost = {
                    title: savedPost.title,
                    content: savedPost.content,
                    user: savedPost.user,
                    id: savedPost._id
                };
                return res.status(200).json({
                    status: 'success',
                    data: resPost,
                });
            })
            .catch(()=>{
                return res.status(500).json({status:'failed', errors:{error: 'could not create post'}});
            });
    },
    all(req, res, next) {
        Post.find()
            .then((posts)=>{
                res.status(200).json({status:'success', data:posts});
            })
            .catch(()=>{
                res.status(500).json({status:'failed', errors:{message:'Could not load posts'}});
            });
    },
    delete(req, res, next) {
        const postId = req.params.id;
        Post.findOneAndDelete({
            _id: postId,
            user: res.userId
        })
        .then((result) => {
            console.log(result);
            res.status(200).json({status: 'success', data: ''});
        })
        .catch(()=>{
            res.status(500).json({status:'failed', errors:{message:"could not delete the post"}});
        });
    }

};