Template.post_item.helpers({
  // current user created this post
  ownsPost: function() {
    return this.createdBy === Meteor.userId();
  },
  // current user has upvoted this post
  upvoted: function() {
    var userId = Meteor.userId();
    if (_.include(this.upvoters, userId))
      return true;
  }
});

Template.post_item.onRendered(function(){
  // initialize imagesLoaded on screenshot elements
  var screenshot = imagesLoaded(".screenshot");
  // remove loading animation as each image loads
  screenshot.on('progress', function(instance, image) {
    // TOOD: get loading item without prev()
    var item = $(image.img).prev();
    item.fadeOut(300);
  });
});

Template.post_item.events({
  'click .js-upvote': function(e) {
    e.preventDefault();
    e.stopPropagation();
    // if user is logged in
    var userId = Meteor.userId();
    if (userId) {
      // call upvote meteor method on click
      Meteor.call('upvote', this._id);
    } else {
      // open login modal instead
      openModal();
    }
  },
  'click .js-downvote': function(e) {
    e.preventDefault();
    e.stopPropagation();
    // if user is logged in
    var userId = Meteor.userId();
    if (userId) {
      // call upvote meteor method on click
      Meteor.call('downvote', this._id);
    } else {
      // open login modal instead
      openModal();
    }
  },
  'click .js-edit': function(e) {
    e.preventDefault();
    e.stopPropagation();
    var currentPostId = this._id;
    Router.go('edit', {_id: currentPostId});
  }
});
