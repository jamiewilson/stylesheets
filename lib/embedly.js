fillEmbedlyData = function() {
  // Fields to fill in
  var linkField = $('[name=link]');
  var titleField = $('[name=title]');
  var descriptionField = $('[name=description]');
  var colorField = $('[name=color]');
  var url = $('[name=link]').val();

  // Convert an RBG value to string
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  // Only get embedly data if url has been provided
  if (url) {

    // show that embedly is loading data
    titleField.attr('placeholder', 'Fetching website info…');
    descriptionField.attr('placeholder', 'Fetching website info…');

    Meteor.call('getEmbedlyData', url, function (error, data) {
      if (error) {
        sweetAlert(error.reason);
      }
      if (data) {
        // console.log(data);

        // fill link field with returned URL
        linkField.val(data.url);

        // If there isn't already a title, set returned title
        if (!titleField.val()) {
          titleField.val(data.title);
        }

        // If there isn't already a description, set returned description
        if (!descriptionField.val()) {
          descriptionField.val(data.description);
        }

        // Convert favicon_colors to hex and set input
        if (data.favicon_colors) {
          var rgbValue = data.favicon_colors[0];
          var r = rgbValue.color[0];
          var g = rgbValue.color[1];
          var b = rgbValue.color[2];
          var hexColor = rgbToHex(r, g, b);
          colorField.val(hexColor);
        }

        // if title, truncate it
        if (data.title) {
          // lib/counters.js
          truncateTitle();
        // if not, set placeholder back to default
        } else {
          titleField.attr('placeholder', 'Name your post');
        }

        // if description, truncate it
        if (data.description) {
          // lib/counters.js
          truncateDescription();
        // if not, set placeholder back to default
        } else {
          descriptionField.attr('placeholder', 'Short description');
        }
      // if no data is returned, set placeholder back to default
      } else {
        titleField.attr('placeholder', 'Name your post');
        descriptionField.attr('placeholder', 'Short description');
      }
    });
  }
}

