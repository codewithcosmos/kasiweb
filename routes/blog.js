const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getBlogPage);
router.get('/:id', blogController.getPostPage);

module.exports = router;
