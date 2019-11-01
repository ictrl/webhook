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

var cc;

const json = {
  "admin no": "1234567890",
  "orders/create customer": "on",
  "refunds/create customer": "on",
  "refunds/create admin": "on",
  "sender id": "1234MS"
};

for (x in json) {
  console.log(x); 
}
