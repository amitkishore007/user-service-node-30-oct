const express = require('express');
const postRouter = express.Router();
const PostsController = require('../controllers/PostsController');
const authGuard = require('../middleware/auth-guard');

postRouter.post('/create',authGuard, PostsController.create);
postRouter.get('/all', PostsController.all);
postRouter.delete('/delete/:id', PostsController.delete);

module.exports = postRouter;
