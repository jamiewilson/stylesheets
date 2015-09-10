Template.layout.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          swal(err.message);
        }
      } else {
        swal("Thank you!", "Your email address has been confirmed", "success");
        // track event with Segment
        analytics.track('Verified Email');
      }
    });
  }
};
