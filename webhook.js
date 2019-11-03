require("dotenv").config();
const http = require("https");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
const request = require("request-promise");
const bodyParser = require("body-parser");
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = [
  "read_products ",
  "read_customers",
  "read_fulfillments",
  "read_checkouts",
  "read_analytics",
  "read_orders ",
  "read_script_tags",
  "write_script_tags"
];

let Gshop = "";
let Ghmac = "";
let accessToken = "";

let message = {};
let first_name = {};
let email = {};
let total_price = {};
let price = {};
let phone = {};
let phone1 = {};
let phone2 = {};
let product = {};
let address1 = {};
let address2 = {};
let city = {};
let country = {};

const forwardingAddress = "https://immense-bastion-25565.herokuapp.com"; // Replace this with your HTTPS Forwarding address
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const storeSchema = new mongoose.Schema({
  data: JSON,
  sms: JSON,
  smsCount: Number
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// install route

app.get("/shopify", (req, res) => {
  console.log("install route call-->");
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

//callback route -->
app.get("/shopify/callback", (req, res) => {
  console.log("callback route call -->");
  let { shop, hmac, code, state } = req.query;
  Gshop = shop;
  Ghmac = hmac;

  const Gshop = new mongoose.model(Gshop, storeSchema);

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
        accessToken = accessTokenResponse.access_token;

        res.sendFile("index.html", { root: __dirname });
      })
      .catch(error => {
        // res.sendFile("index.html");
        res.send(error);
        console.log("182-->", error);
      });
  } else {
    res.status(400).send("Required parameters missing");
  }
});

// send sms
const sndSms = (phone, store, message, senderID) => {
  //sender id must be six letters
  var options = {
    method: "GET",
    hostname: "api.msg91.com",
    port: null,
    path: `/api/sendhttp.php?mobiles=${phone}&authkey=300328AHqrb8dPQZ35daf0fb0&route=4&sender=${senderID}&message=${message}&country=91`,
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

  const shop = new Shop({
    message: message,
    store: store,
    phone: phone
  });

  shop.save(function(err) {
    if (!err) {
      console.log("saved to DB");
    }
  });

  req.end();
};

app.post("/store/:Gshop/:topic/:subtopic", function(request, response) {
  const shop = request.params.Gshop;
  let topic = request.params.topic;
  const subtopic = request.params.subtopic;

  topic = topic + "/" + subtopic;

  Store.findOne({ name: shop }, function(err, data) {
    if (!err) {
      switch (topic) {
        case "orders/create":
          if (data["orders/create customer"] != undefined) {
            /*parse the response..take help from docs 
            https://help.shopify.com/en/api/reference/events/webhook
            */
            name = request.body.shipping_address.first_name;
            email = request.body.email;
            vendor = request.body.line_items[0].vendor;
            title = request.body.line_items[0].title;
            orderId = request.body.name;
            orderId = orderId.slice(1);

            price = request.body.total_price;

            phone = request.body.shipping_address.phone;
            phone1 = request.body.billing_address.phone;
            phone2 = request.body.customer.phone;

            address1 = request.body.shipping_address.address1;
            address2 = request.body.shipping_address.address2;
            city = request.body.shipping_address.city;
            country = request.body.shipping_address.country;

            message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
            //end

            let senderID = data["sender id"];
            if (phone) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone1) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone2) {
              sndSms(phone, vendor, message, senderID);
            }
          }
          if (data["orders/create admin"] != undefined) {
            sndSms(admin, vendor, message);
          }
          break;
        case "orders/cancelled":
          if (data["orders/cancelled customer"] != undefined) {
            if (phone) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone1) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone2) {
              sndSms(phone, vendor, message, senderID);
            }
          }
          if (data["orders/cancelled admin"] != undefined) {
            sndSms(admin, vendor, message);
          }
          break;
        case "orders/fulfilled":
          if (data["orders/fulfilled customer"] != undefined) {
            if (phone) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone1) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone2) {
              sndSms(phone, vendor, message, senderID);
            }
          }
          if (data["orders/fulfilled admin"] != undefined) {
            sndSms(admin, vendor, message);
          }
          break;
        case "orders/partially_fulfilled":
          if (data["orders/partially_fulfilled customer"] != undefined) {
            if (phone) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone1) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone2) {
              sndSms(phone, vendor, message, senderID);
            }
          }
          if (data["orders/partially_fulfilled admin"] != undefined) {
            sndSms(admin, vendor, message);
          }
          break;
        case "customers/create":
          if (data["customers/create customer"] != undefined) {
            if (phone) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone1) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone2) {
              sndSms(phone, vendor, message, senderID);
            }
          }
          if (data["customers/create admin"] != undefined) {
            sndSms(admin, vendor, message);
          }
          break;
        case "refunds/create":
          if (data["refunds/create customer"] != undefined) {
            if (phone) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone1) {
              sndSms(phone, vendor, message, senderID);
            } else if (phone2) {
              sndSms(phone, vendor, message, senderID);
            }
          }
          if (data["refunds/create admin"] != undefined) {
            sndSms(admin, vendor, message);
          }
          break;

        default:
          console.log("!possible");
          break;
      }
    }
  });

  response.sendStatus(200);
});

const makeWebook = topic => {
  const webhookUrl = "https://" + Gshop + "/admin/api/2019-07/webhooks.json";
  const webhookHeaders = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
    "X-Shopify-Topic": topic,
    "X-Shopify-Hmac-Sha256": Ghmac,
    "X-Shopify-Shop-Domain": "mojitostore.myshopify.com",
    "X-Shopify-API-Version": "2019-07"
  };

  const webhookPayload = {
    webhook: {
      topic: topic,
      address: `https://immense-bastion-25565.herokuapp.com/store/${Gshop}/${topic}`,
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

app.post("/myaction", function(req, res) {
  var json_data = req.body;

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

  const GshopDB = new Gshop({
    data: json_data
  });
  GshopDB.save(function(err) {
    if (!err) {
      console.log("store data saved to DB");
    }
  });

  www.forEach(topic => {
    makeWebook(topic);
  });

  res.sendStatus(200);
});

app.get("/", function(req, res) {
  // res.sendFile("index.html", { root: __dirname });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Example app listening on port 4000!");
});
