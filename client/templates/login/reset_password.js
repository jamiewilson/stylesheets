if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.reset_password.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('[name=password]').val(),
        passwordConfirm = resetPasswordForm.find('[name=password-confirm]').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          swal("Oops. Something went wrong. Please try again.")
        } else {
          closeModal();
          // track event with segment
          analytics.track('Reset Password');
        }
      });
    }
    return false;
  }
});
