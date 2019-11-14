require("dotenv").config();
const http = require("https");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
const request = require("request-promise");
const bodyParser = require("body-parser");
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const mongoConnect = require("connect-mongo")(session);
const forwardingAddress = "https://immense-bastion-25565.herokuapp.com"; // Replace this with your HTTPS Forwarding address

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

let Gshop = "";
let Ghmac = "";
let Gtoken = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "mylittleSecrets.",
    resave: false,
    saveUninitialized: false,
    store: new mongoConnect({ mongooseConnection: mongoose.connection })
  })
);

// store: new mongoStore({
//   mongoose_connection: mongoose.connection,
//   collection: "sessions"
// });

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

const shopSchema = new mongoose.Schema({
  name: String,
  data: JSON,
  sms: Array,
  smsCount: Number,
  template: Array
});

const Store = new mongoose.model("Store", shopSchema);

// install route ==>"/shopify/shop=?shopname.shopify.com
app.get("/shopify", (req, res) => {
  const shop = req.query.shop;
  console.log("install route call-->", shop);
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + "/shopify/callback";
    const installUrl =
      "https://" +
      shop +
      "/admin/oauth/authorize?client_id=" +
      apiKey +
      "&scope=" +
      [
        "read_products ",
        "read_customers",
        "read_fulfillments",
        "read_checkouts",
        "read_analytics",
        "read_orders ",
        "read_script_tags",
        "write_script_tags"
      ] +
      "&state=" +
      state +
      "&redirect_uri=" +
      redirectUri;

    res.cookie("state", state);

    res.redirect(installUrl);
  } else {
    return res
      .status(400)
      .send(
        "Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request"
      );
  }
});

//callback route -->
app.get("/shopify/callback", (req, res) => {
  let { shop, hmac, code, state } = req.query;
  console.log("callback route call -->", shop);
  Gshop = shop;
  Ghmac = hmac;

  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send("Request origin cannot be verified");
  }

  if (shop && hmac && code) {
    // DONE: Validate request is from Shopify
    const map = Object.assign({}, req.query);
    delete map["signature"];
    delete map["hmac"];
    const message = querystring.stringify(map);
    const providedHmac = Buffer.from(hmac, "utf-8");
    const generatedHash = Buffer.from(
      crypto
        .createHmac("sha256", apiSecret)
        .update(message)
        .digest("hex"),
      "utf-8"
    );
    let hashEquals = false;

    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
    } catch (e) {
      hashEquals = false;
    }

    if (!hashEquals) {
      return res.status(400).send("HMAC validation failed");
    }

    // DONE: Exchange temporary code for a permanent access token

    const accessTokenRequestUrl =
      "https://" + shop + "/admin/oauth/access_token";
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code
    };
    request
      .post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then(accessTokenResponse => {
        Gtoken = accessTokenResponse.access_token;

        req.session.shop = shop;
        req.session.token = hmac;
        req.session.hmac = accessTokenResponse.access_token;
        console.log("top shop", req.session.shop);
        res.redirect("/");
      })
      .catch(error => {
        res.send(error);
        console.log("144-->", error);
      });
  } else {
    res.status(400).send("Required parameters missing");
  }
});

app.post("/myaction", function(req, res) {
  if (req.session.shop) {
    let shop = req.session.shop;
    var json_data = req.body;

    res.sendStatus(200);
    const store = new Store({
      name: shop,
      data: req.body,
      smsCount: 90
    });

    store.save(function(err) {
      if (!err) {
        console.log(`${shop} data store to DB`);
      }
    });

    var topics = [];
    //convet JSON to array
    for (var i in json_data) {
      var n = i.indexOf(" ");
      var res = i.substring(n + 1, -1);
      topics.push(res);
    }
    //remove "admin"
    topics.splice(0, 1);

    //remove dublicate element
    const set1 = new Set(topics);

    //convert back to array
    let www = [...set1];

    function trimArray(arr) {
      for (i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      return arr;
    }

    www = trimArray(www);

    //remove "sender"
    function removeElement(array, elem) {
      var index = array.indexOf(elem);
      if (index > -1) {
        array.splice(index, 1);
      }
    }

    removeElement(www, "sender");

    www.forEach(topic => {
      makeWebook(topic);
    });
  } else {
    console.log("cant find session key form post /myacion");
  }
});

const makeWebook = topic => {
  let token = req.session.token;
  let hmac = req.session.hmac;
  if (hmac === Ghmac) {
    console.log("hmac equall");
  } else {
    console.log(hmac, " hmac ", Ghmac);
  }
  if (token === Gtoken) {
    console.log("token equall");
  } else {
    console.log(token, " token ", Gtoken);
  }
  if (shop === Gshop) {
    console.log("shop equall");
  } else {
    console.log(shop, " shop ", Ghmac);
  }

  const webhookUrl = "https://" + Gshop + "/admin/api/2019-07/webhooks.json";
  const webhookHeaders = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": Gtoken,
    "X-Shopify-Topic": topic,
    "X-Shopify-Hmac-Sha256": Ghmac,
    "X-Shopify-Shop-Domain": Gshop,
    "X-Shopify-API-Version": "2019-07"
  };

  const webhookPayload = {
    webhook: {
      topic: topic,
      address: `https://immense-bastion-25565.herokuapp.com/store/${shop}/${topic}`,
      format: "json"
    }
  };
  request
    .post(webhookUrl, {
      headers: webhookHeaders,
      json: webhookPayload
    })
    .then(shopResponse => {
      console.log("showResponse-->", shopResponse);
    })
    .catch(error => {
      console.log("error-->", error);
    });
};

app.get("/api/smsCount", function(req, res) {
  if (req.session.shop) {
    Store.findOne({ name: req.session.shop }, function(err, data) {
      if (data) {
        var sms = data.smsCount + "";
        console.log("sms", sms);
        res.send(sms);
      } else {
        res.send("100");
      }
      console.log("263", req.session.shop);
    });
  } else {
    console.log("cant find session key form get /api/smsCount");
  }
});

// app.get("/api/history", function(req, res) {
//   if (req.session.shop) {
//     Store.findOne({ name: shop }, function(err, data) {
//       if (data) {
//         var history = data.sms;
//         res.send(history);
//       }
//     });
//   } else {
//     console.log("cant find session key form get /api/history");
//   }
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
