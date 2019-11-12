require("dotenv").config();
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const request = require("request-promise");
const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const http = require("https");
const path = require("path");
const ejs = require("ejs");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "GoGoMaster",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const storeSchema = new mongoose.Schema({
  name: String,
  token: String,
  hmac: String,
  state: String,
  data: JSON,
  sms: Array,
  smsCount: Number,
  template: Array
});

storeSchema.plugin(passportLocalMongoose);

const Store = new mongoose.model("Store", storeSchema);

passport.use(Store.createStrategy());

passport.serializeUser(Store.serializeUser());
passport.deserializeUser(Store.deserializeUser());

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

const forwardingAddress = "https://immense-bastion-25565.herokuapp.com"; // Replace this with your HTTPS Forwarding address

// install route
// "/shopify/shop=?shopname.shopify.com
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
  let { shop, hmac, code, state } = req.query;
  console.log("callback route call -->", shop);

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
        //regiter or login
        const store = new Store({
          name: shop,
          state: state
        });
        req.login(store, err => {
          if (err) {
            //register
            Store.register(
              {
                name: shop,
                smsCount: 100,
                hmac: hmac,
                token: accessTokenResponse.access_token
              },
              state,
              function(err, user) {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  passport.authenticate("local")(req, res, function() {
                    res.redirect("/");
                  });
                }
              }
            );
          } else {
            passport.authenticate("local")(req, res, function() {
              //login
              res.redirect("/");
            });
          }
        });
      })
      .catch(error => {
        res.send(error);
        console.log("182-->", error);
      });
  } else {
    res.status(400).send("Required parameters missing");
  }
});

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.send("Not Authorized");
  }
});

app.post("/myaction", function(req, res) {
  var json_data = req.body;
  res.sendStatus(200);

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.data = json_data;
        foundUser.save(function() {
          res.redirect("/secrets");
        });
      }
    }
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
