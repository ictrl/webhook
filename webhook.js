require("dotenv").config();
const http = require("https");
const express = require("express");
const app = express();
const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
const request = require("request-promise");
const bodyParser = require("body-parser");
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = ["read_orders"];

let message = {};
let first_name = {};
let email = {};
let total_price = {};
let price = {};
let phone = {};
let product = {};
let address1 = {};
let address2 = {};
let city = {};
let country = {};

const forwardingAddress = "https://calm-hollows-65769.herokuapp.com"; // Replace this with your HTTPS Forwarding address

app.use(bodyParser.json());

// install route

app.get("/shopify", (req, res) => {
  console.log("install route call");
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
      scopes +
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
  console.log("callback route call");
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
            address: "https://calm-hollows-65769.herokuapp.com/",
            format: "json"
          }
        };
        request
          .post(webhookUrl, { headers: webhookHeaders, json: webhookPayload })
          .then(shopResponse => {
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

app.post("/", function(request, response) {
  first_name = request.body.shipping_address.first_name;
  email = request.body.email;
  total_price = request.body.total_price;

  product = request.body.line_items.title;
  phone = request.body.shipping_address.phone;
  address1 = request.body.shipping_address.address1;
  address2 = request.body.shipping_address.address2;
  city = request.body.shipping_address.city;
  country = request.body.shipping_address.country;

  message = `Thank%20you%20for%20your%20purchase!%20,Hi%20${first_name},%20we're%20getting%20your%20order%20ready%20to%20be%20shipped.%20We%20will%20notify%20you%20when%20it%20has%20been%20sent.%20Item:%20${product}%20%20Price:%20${total_price}%20Delivery%20Address:%20${address2}%20${address1}%20${city}%20${country}%20Phone%20No:%20${phone}%20Email:%20${email}%20`;

  var options = {
    method: "GET",
    hostname: "api.msg91.com",
    port: null,
    path: `/api/sendhttp.php?mobiles=${phone}&authkey=300121AUJUTiHZXX25dada6b2&route=4&sender=MOJITO&message=${message}&country=91`,
    headers: {}
  };

  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening on port 3000!");
});
