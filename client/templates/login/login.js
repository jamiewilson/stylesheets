LoginComponents.loginCallback = function() {
  closeModal();
  // track event with segment
  analytics.track('Logged In');
};
LoginComponents.signupCallback = function() {
  closeModal();
  // track event with segment
  analytics.track('Signed Up');
};

LoginComponents.showTabs = false;

Template.login.helpers({
 resetPassword: function(){
  return Session.get('resetPassword');
 }
});

Template.login.events({
  'blur #loginOrSignUp #email': function(e) {
    input = $.trim($(e.target).val());
    $(e.target).val(input);
  }
});

Template.loginOrSignUp.onRendered(function(){
  $('#loginOrSignUp #email').attr('type', 'email');
  $('#loginOrSignUp label').addClass('label');
});
