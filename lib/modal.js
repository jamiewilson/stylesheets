openModal = function() {
  $('.modal').addClass('is-open');
  $('body').addClass('overflow-hidden');
  setTimeout(function() {
    $('#loginOrSignUp input').first().focus();
  }, 100);
}

closeModal = function() {
  $('.modal').removeClass('is-open');
  $('body').removeClass('overflow-hidden');
  $('#loginOrSignUp')[0].reset();
}

verifyEmailModal = function() {
  swal({
    title: "Please verify your account.",
    text: "You should have reveived a verification email when you created your account.",
    type: "warning",
    showCancelButton: true,
    cancelButtonText: "I'll take a look.",
    confirmButtonText: "Resend?",
    closeOnConfirm: false
  }, function() {
    var userId = Meteor.userId();
    Meteor.call('sendVerificationEmail', userId, function (error, result) {
      if (error) {
        swal(error.reason);
      } else {
        swal("Check your email!", "We've resent your verification email", "success");
      }
    });
  });
}
