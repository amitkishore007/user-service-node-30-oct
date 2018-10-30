const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// setup routes here
router.post('/signup', UsersController.signup)
router.post('/login', UsersController.login)



module.exports = router;