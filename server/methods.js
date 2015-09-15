getEmbedlyData = function(url) {
  var data = {};
  var extractBase = 'https://api.embed.ly/1/extract?secure=true';
  var embedlyKey = Meteor.settings.public.embedlyApiKey;

  try {
    var result = Meteor.http.get(extractBase, {
      params: {
        key: embedlyKey,
        url: url
      }
    });
    return _.pick(result.data, 'url', 'title', 'description', 'favicon_colors');

  } catch (error) {
    console.log(error);
  }
}

Meteor.methods({
  sendVerificationEmail: function(userId) {
    Accounts.sendVerificationEmail(userId);
  },
  getEmbedlyData: function(url) {
    check(url, String);
    return getEmbedlyData(url);
  },
  submitPost: function(postProperties) {
    // make sure user is actually signed in
    check(Meteor.userId(), String);
    // check input values to be correctly formatted
    check(postProperties, {
      link: String,
      title: String,
      description: String,
      color: String,
      image: String
    });

    // if link has already been posted, send to that post
    var alreadyPosted = Posts.findOne({link: postProperties.link});
    if (alreadyPosted) {
      return {
        postExists: true,
        _id: alreadyPosted._id
      }
    }

    var user = Meteor.user();
    // add user id and date to post
    var postComplete = _.extend(postProperties, {
      createdBy: user._id,
      dateCreated: new Date(),
      upvoters: [],
      stars: 0
    });
    // add post to posts collection
    var postId = Posts.insert(postComplete);
    // take user to post's page
    return {
      _id: postId
    };
  },

  editPost: function (currentPostId, postProperties) {
    // only let owners update posts
    var currentUserId = Meteor.userId();
    Posts.update({_id: currentPostId, createdBy: currentUserId}, {$set: postProperties});
  },

  deletePost: function (currentPostId) {
    // only let owners delete posts
    var currentUserId = Meteor.userId();
    Posts.remove({_id: currentPostId, createdBy: currentUserId});
  },

  upvote: function(postId) {
    // check if user is logged in
    check(this.userId, String);
    // check if post exists
    check(postId, String);

    // check if user has upvoted already
    // add user to upvoters and increment votes by 1
    var affected = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {stars: 1}
    });
    if (!affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  },
  downvote: function(postId) {
    // check if user is logged in
    check(this.userId, String);
    // check if post exists
    check(postId, String);

    // remove user from list of upvoters
    // add user to upvoters and increment votes by -1
    var affected = Posts.update({
      _id: postId
    }, {
      $pull: {upvoters: this.userId},
      $inc: {stars: -1}
    });
    if (!affected)
      throw new Meteor.Error('invalid', "You weren't able to downvote that post");
  }
});
