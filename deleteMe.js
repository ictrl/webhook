Store.findOne({ name: name }, function(err, item) {
  if (!err) {
    cc = item;

    console.log(JSON.parse(cc.response_data["admin no"]));
    console.log(cc.response_data["sender id"]);
    console.log(cc.response_data["admin no"]);
  }
});
