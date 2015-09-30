Router.route('/api/posts', {
  where: 'server',
  name: 'apiPosts',
  action: function() {
    var parameters = this.request.query,
        // check if there is a limit parameter e.g. /api/posts?limit=5
        limit = !!parameters.limit ? parseInt(parameters.limit) : 50,
        data = Posts.find({}, { limit: limit, fields: {title: 1, link: 1, stars: 1, dateCreated: 1 }}).fetch();
    this.response.write(JSON.stringify(data));
    this.response.end();
  }
});

Router.route('/api/posts/:_id', {
  where: 'server',
  name: 'apiPost',
  action: function() {
    var post = Posts.findOne(this.params._id);
    if(post){
      this.response.write(JSON.stringify(post));
    } else {
      this.response.writeHead(404, {'Content-Type': 'text/html'});
      this.response.write("Sorry, but that post cannot be found.");
    }
    this.response.end();
  }
});
