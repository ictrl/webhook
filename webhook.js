require("dotenv").config();
const express = require("express");
const app = express();
const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
const request = require("request-promise");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;

const forwardingAddress = "https://immense-bastion-25565.herokuapp.com"; // Replace this with your HTTPS Forwarding address

app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    console.log("DB connected");
  }
);

const shopSchema = new mongoose.Schema({
  name: String
  // data: JSON,
  // sms: Array,
  // smsCount: Number,
  // template: Array
});

const Store = new mongoose.model("Store", shopSchema);
// install route

app.get("/shopify", (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + "/shopify/callback";
    const installUrl =
      "https://" +
      shop +
      "/admin/oauth/authorize?client_id=" +
      apiKey +
      "&scope=" +
      ["read_orders"] +
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

//callback route
app.get("/shopify/callback", (req, res) => {
  let { shop, hmac, code, state } = req.query;
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
        const accessToken = accessTokenResponse.access_token;
        const webhookUrl =
          "https://" + shop + "/admin/api/2019-07/webhooks.json";
        const webhookHeaders = {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
          "X-Shopify-Topic": "orders/create",
          "X-Shopify-Hmac-Sha256": hmac,
          "X-Shopify-Shop-Domain": "mojitostore.myshopify.com",
          "X-Shopify-API-Version": "2019-07"
        };

        const webhookPayload = {
          webhook: {
            topic: "orders/create",
            address: "https://immense-bastion-25565.herokuapp.com/",
            format: "json"
          }
        };
        request
          .post(webhookUrl, { headers: webhookHeaders, json: webhookPayload })
          .then(shopResponse => {
            saveDB(shop);
            res.send(shopResponse);
          })
          .catch(error => {
            res.send("131 --> error");
            console.log(error);
          });
      })
      .catch(error => {
        res.send(" 137 --> error");
        console.log(error);
      });
  } else {
    res.status(400).send("Required parameters missing");
  }
});

app.post("/", (req, res) => {
  console.log(req.body);
});
const saveDB = name => {
  const store = new Store({
    name: name
  });

  store.save(function(err) {
    if (!err) {
      console.log("data store to DB");
    }
  });
};

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening on port 3000!");
});
