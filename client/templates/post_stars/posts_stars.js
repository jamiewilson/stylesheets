Template.posts_stars.helpers({
  // current user has upvoted this post
  upvoted: function() {
    var userId = Meteor.userId();
    if (_.include(this.upvoters, userId))
      return true;
  }
});
