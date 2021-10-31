const router = require('express').Router();
const {
    Post,
    User,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }, ],
            include: [{
                model: Comment,
                attributes: ['comment_contents', 'comment_date'], 
                include: [{
                    model: User
                }]
            }]
        });
        
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({
            plain: true
        }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// GET one post for homepage
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_contents",
                        "comment_date",
                        "createdAt"
                    ]
                },
                {
                    model: User,
                    attributes: [
                        "id",
                        "username"
                    ]
                },
            ],
        });
        const post = postData.get({
            plain: true
        });
        res.render('post', {
            ...post
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post', (req, res) => {

    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('post');
});

module.exports = router;