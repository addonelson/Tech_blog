const User = require('./User');
const Post = require('./Post');
const Comment = require('./comment')

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: "CASCADE", //User gets deleted then their posts also get removed. 
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: "CASCADE", //Post gets deleted then their comments also get removed. 
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "CASCADE", //User gets deleted then their comments also get removed. 
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});



module.exports = { User, Post, Comment }