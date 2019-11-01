app.get("/posts/:postId", function(req, res) {
  const requestedId = req.params.postId;
  //  requestedId = requestedId.trim();

  Post.findOne({ _id: requestedId }, function(err, item) {
    res.render("post", {
      title: item.title,
      content: item.content
    });
  });
});
