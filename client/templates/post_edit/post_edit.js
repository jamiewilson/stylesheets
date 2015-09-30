Template.post_edit.helpers({
  hash: function() {
    url = this.link;
    secret = Meteor.settings.public.screenshotMachineSecret;
    var hash = CryptoJS.MD5(url + secret).toString();
    return hash;
  }
});

Template.post_edit.events({
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
    });
  },

  'submit form': function (e) {
    e.preventDefault();
    var currentPostId = this._id;

    // place input values in post variable
    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      link: $(e.target).find('[name=link]').val(),
      description: $(e.target).find('[name=description]').val(),
      color: $(e.target).find('[name=color]').val(),
      image: $(e.target).find('[name=image]').val()
    };

    Meteor.call('editPost', currentPostId, postProperties, function(error, result) {
      // abort and alert error reason
      if (error) {
        return sweetAlert(error.reason);
      } else {
        // if successfully updated, go to homepage
        sweetAlert({
          title: "Your updates were saved!",
          type: "success",
          confirmButtonText: "Back to homepage"
        }, function() {
          Router.go('home');
        });
        // track event with segment
        analytics.track('Edited Post');
      }
    });
  },

  'click .js-delete': function(e) {
    e.preventDefault();
    var currentPostId = this._id;
    sweetAlert({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function(isConfirm) {
      if (isConfirm) {
        Meteor.call('deletePost', currentPostId, function(error, result) {
          // abort and alert error reason
          if (error) {
            return sweetAlert(error.reason);
          } else {
            // go to homepage when finished
            sweetAlert({
              title: "Successfully deleted!",
              type: "success",
              confirmButtonText: "Back to homepage"
            }, function() {
              Router.go('home');
            });
            // track event with segment
            analytics.track('Deleted Post');
          }
        });
      }
    });
  }
});
