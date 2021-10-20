const {Post} = require('../models')

const postData = [{
title: 'Test 1',
contents: 'a bunch of random words and text that will fill this box so that i know it is working properly.',

},
{
    title: 'Test 2',
contents: 'a bunch of random words and text that will fill this box so that i know it is working properly.',

},
{
    title: 'Test 3',
contents: 'a bunch of random words and text that will fill this box so that i know it is working properly.',

},
]

const seedMyPost = () => Post.bulkCreate(postData);

module.exports = seedMyPost;