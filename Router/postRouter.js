const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postsController');

router.use('/posts', postController);

module.exports = router;