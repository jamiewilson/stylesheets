Meteor.startup(function () {
  Posts.initEasySearch(['title', 'link', 'description', 'createdBy'], {
    'limit': 50,
    'sort': function() {
      // most stars
      if (this.props.sortBy === 'stars') {
        return { 'stars': -1 };
      // alphabetical
      } else if (this.props.sortBy === 'a-z') {
        return { 'title': 1 };
      // reverse alphabetical
      }  else if (this.props.sortBy === 'z-a') {
        return { 'title': -1 };
      // oldest
      } else if (this.props.sortBy === 'oldest') {
        return { 'dateCreated': 1 };
      }
      // default to Newest
      return { 'dateCreated': -1 };
    },
  });
});
