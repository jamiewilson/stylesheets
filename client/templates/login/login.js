LoginComponents.loginCallback = function() {
  closeModal();
};
LoginComponents.signupCallback = function() {
  closeModal();
};

LoginComponents.showTabs = false;

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
