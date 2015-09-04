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
