Template.post_submit.events({
  // lib/embedly.js
  'blur [name=link]': function() {
    fillEmbedlyData();
  },
  // lib/counters.js
  'keydown [name=title]': function() {
    truncateTitle();
  },
  // lib/counters.js
  'keydown [name=description]': function() {
    truncateDescription();
  },
  'click .filepicker': function (e) {
    filepicker.pick({
      mimetypes: ['image/gif','image/jpeg','image/png'],
      maxSize: 2*1024*1024,
      cropRatio: 4/3,
      imageDim: [400, 300],
      cropForce: true,
      multiple: false
    },
    function(blob){
      $('[name=image]').val(blob.url);
      $('.image-thumbnail').attr('src', blob.url);
      $('.filepicker').text('Replace Image');
    });
  },

  'submit form': function (e) {
    e.preventDefault();

    // place input values in postProperties
    var postProperties = {
      link: $(e.target).find('[name=link]').val(),
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      color: $(e.target).find('[name=color]').val(),
      image: $(e.target).find('[name=image]').val()
    };

    // check if user email is verified
    if (Meteor.user().emails[0].verified === true) {
      Meteor.call('submitPost', postProperties, function (error, result) {
        // abort and alert error reason
        if (error) {
          sweetAlert(error.reason);
        }
        // tell user the link in already posted
        if (result.postExists) {
          sweetAlert({
            title: "D’oh! That’s already been posted.",
            type: "info",
            confirmButtonText: "Take a look. And upvote it!"
          }, function() {
            Router.go('post', {_id: result._id});
          });
        } else {
          // if successfully posted, go to new post page
          sweetAlert({
            title: "Thanks for posting!",
            type: "success",
            confirmButtonText: "View the latest posts."
          }, function() {
            Router.go('home');
          });
          // track event with segment
          analytics.track('Submitted Post');
        }
      });
    // if not verified allow resending
    } else {
      verifyEmailModal();
    }
  }
});
