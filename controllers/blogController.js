const BlogPost = require('../models/BlogPost');

exports.getBlogPage = async (req, res) => {
    const posts = await BlogPost.find();
    res.render('blog', { title: 'Blog', posts });
};

exports.getPostPage = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('post', { title: post.title, post });
};
