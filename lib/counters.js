truncateTitle = function() {
  $('[name=title]').simplyCountable({
    counter:   '.js-counter-title',
    maxCount:  70,
    strictMax: true
  });
}

truncateDescription = function() {
  $('[name=description]').simplyCountable({
    counter:   '.js-counter-description',
    strictMax: true
  });
}
