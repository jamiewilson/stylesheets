// meteorhacks:subs-manager
var subs = new SubsManager();

// Apply layout template to all routes
// wait on posts before loading
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loader',
  notFoundTemplate: 'not_found'
});

// Route index to posts list
Router.route('/', {
  template: 'posts_list',
  name: 'home',
  waitOn: function() {
    return subs.subscribe('posts');
  },
  fastRender: true
});

Router.route('/stars', {
  template: 'posts_stars',
  name: 'stars',
  fastRender: true
});

Router.route('/submit', {
  template: 'post_submit',
  name: 'submit'
});

Router.route('/posts/:_id', {
  template: 'post_page',
  name: 'post',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  template: 'post_edit',
  name: 'edit',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/about', {
  template: 'about'
});

Router.route('/slack', {
  template: 'slack'
});

Router.route('/terms', {
  template: 'terms'
});

Router.route('/loader', {
  template: 'loader'
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loading);
    } else {
      Router.go('home');
    }
  } else {
    this.next();
  }
};

if (Meteor.isClient){
  Router.onBeforeAction(requireLogin, { only: ['submit', 'edit', 'stars'] });
}
