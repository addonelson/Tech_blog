const { Comment } = require('../models')

const commentData = [{
    comment_contents: 'This is a comment for this post',
    post_id: 2,
    user_id: 2
},
{
    comment_contents: 'This is a comment for this post',
    post_id: 1,
    user_id: 2
},
{
    comment_contents: 'This is a comment for this post',
    post_id: 3,
    user_id: 2
},
]

const seedMyComment = () => Comment.bulkCreate(commentData)

module.exports = seedMyComment;