Gausala = {
  data: {
    "admin no": "",
    "sender id": "",
    "subscription choice": "",
    "sms count": 3
  },
  sms: {
    "message template": "hey!"
  },
  sms: {
    "message template": "hey!"
  },
  sms: {
    "message template": "hey!"
  }
};

Mojito = {
  data: {
    "admin no": "",
    "sender id": "",
    "subscription choice": "",
    "sms count": 3
  },
  sms: {
    "message template": "hey!"
  },
  sms: {
    "message template": "hey!"
  },
  sms: {
    "message template": "hey!"
  }
};

Gogo = {
  data: {
    "admin no": "",
    "sender id": "",
    "subscription choice": "",
    "sms count": 3
  },
  sms: {
    "message template": "hey!"
  },
  sms: {
    "message template": "hey!"
  },
  sms: {
    "message template": "hey!"
  }
};

  const Store = new mongoose.model(Gshop, shopSchema);


  const post = new Post({
    title: req.body.title,
    content: req.body.body
  });   
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
