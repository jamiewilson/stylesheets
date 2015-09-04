// publish all posts to the client
Meteor.publish('posts', function() {
  return Posts.find();
});
