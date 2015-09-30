Router.route('/feed.xml', {
  where: 'server',
  name: 'rss',
  action: function() {
    var feed = new RSS({
      title: "Stylesheets",
      description: "The newest from the community-generated collection of CSS resources.",
      site_url: "https://stylesheets.co",
      feed_url: "https://stylesheets.co/feed.xml",
      image_url: "http://i.imgur.com/7jjEZXX.png"
    });
    Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function(post) {
      feed.item({
        title: post.title,
        description: post.description + " " + post.link,
        url: '/posts/' + post._id,
        date: post.dateCreated
      })
    });
    this.response.write(feed.xml());
    this.response.end();
  }
});
