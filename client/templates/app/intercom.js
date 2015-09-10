Meteor.startup(function () {
  IntercomSettings.userInfo = function(user, info) {
    info.email = user.emails[0].address;
    info.verified = user.emails[0].verified;
  };
});
