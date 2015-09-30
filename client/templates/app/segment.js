Meteor.startup(function () {
  analytics.load(Meteor.settings.public.segmentKey);
  Tracker.autorun(function(c) {
    // waiting for user subscription to load
    if (! Router.current() || ! Router.current().ready())
      return;

    var user = Meteor.user();
    if (! user)
      return;

    analytics.identify(user._id, {
      email: user.emails[0].address
    });

    c.stop();
  });
});

Template.posts_list.onRendered(function() {
  analytics.page("Home");
});

Template.post_submit.onRendered(function() {
  analytics.page("Submit");
});

Template.post_edit.onRendered(function() {
  analytics.page("Edit");
});

Template.about.onRendered(function() {
  analytics.page("About");
});

Template.posts_stars.onRendered(function() {
  analytics.page("Stars");
});

Template.login.onRendered(function() {
  analytics.page("Login");
});

Template.slack.onRendered(function() {
  analytics.page("Slack");
});

Template.terms.onRendered(function() {
  analytics.page("Terms");
});
