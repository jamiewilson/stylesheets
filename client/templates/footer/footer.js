Template.footer.events({
  'click .js-logout': function() {
    Meteor.logout(function() {
      $("html, body").animate({ scrollTop: 0 }, "fast");
    });
  }
});
