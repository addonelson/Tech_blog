const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    // try {
        const postData = await Post.create({
             ...req.body,
             user_id: req.session.user_id,
        });
        res.status(200).json(postData)
    // } catch (err) {
    //     console.log(err);
    //     res.status(400).json(err);
    // }
});

router.post('/comment/:id', withAuth, async (req, res) => {
    console.log(req.body);
    // try {

        const commentData = await Comment.create({
             ...req.body,
             post_id: req.params.id,
             user_id: req.session.user_id,
        },{
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(commentData)
    // } catch (err) {
    //     console.log(err);
    //     res.status(400).json(err);
    // }
});

router.put('/:id', withAuth, async (res, req) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (!postData[0]) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (res, req) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData[0]) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comment/:id', withAuth, async (req, res) =>{
    // try {
        const commentData = await Post.findByPk(req.params.id, {
            include: [{
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_contents",
                        "comment_date",
                        "createdAt",
                        "user_id",
                        "post_id"
                    ],
                    include: [{
                        model: User,
                        attributes: [
                            'username'
                        ]
                    }]
                },
                // {
                //     model: User,
                //     attributes: [
                //         "id",
                //         "username"
                //     ]
                // },
            ],
        });
        const post = commentData.get({
            plain: true
        });
        res.json(commentData);
    // }catch (err) {
        // res.status(500).json(err);
    // }
})

module.exports = router;