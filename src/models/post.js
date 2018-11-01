const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a post title'],
        validate: {
            validator: (title) => title.length > 3,
            message: 'Title length should be at least 4 characters'  
        }
    },
    content: {
        type: String,
        required: true,
        validate: {
            validator: (content) => content.length > 9,
            message: 'content should be at least 10 characters long'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;