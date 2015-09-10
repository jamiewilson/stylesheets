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
