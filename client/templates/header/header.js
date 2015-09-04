Template.header.helpers({
  starCount: function() {
    var user = Meteor.userId();
    // get number of stars current user has
    return Posts.find({upvoters: { $in: [user] }}).count();
  }
});

Template.header.events({
  // clear input when click on logo
  'click .js-clear-search': function() {
    // Get instance of search based on index
    var instance = EasySearch.getComponentInstance({ index: 'posts' });
    // if someone has searched, clear instance and reset searchbar
    if ($('.search-input').val())
      instance.clear();
      $('.search-input').val("");
  },
  'click .js-login': function(e) {
    openModal();
  },
  'click #loginOrSignUp': function(e) {
    e.stopPropagation();
  },
  'click .is-open': function() {
    closeModal();
  },
  'change .js-sort-select': function(e) {
    var instance = EasySearch.getComponentInstance({ index: 'posts' });
    EasySearch.changeProperty('posts', 'sortBy', $(e.target).children(':selected').data('sort'));
    instance.triggerSearch();
  }
});
