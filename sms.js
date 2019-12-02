// require("dotenv").config();
// const cron = require("node-cron");
// const http = require("https");
// const express = require("express");

// let senderID = "SAMRAT";

// let shop = "amydus2.myshopify.com";

// let phone = 8340238800;

//  Customer%20name:%20Mittalee,from%20shop:amydus2.myshopify.com%20order%20ID:%202693,%20Order%20Status%20fulfilled

// let message =
//   "Customer%20name:%20Ananya,from%20shop:amydus2.myshopify.com%20order%20ID:%202693,%20Order%20Status%20fulfilled";

// const sms = params => {
//   var options = {
//     method: "GET",
//     hostname: "api.msg91.com",
//     port: null,
//     path: `/api/sendhttp.php?mobiles=${phone}&authkey=300121AUJUTiHZXX25dada6b2&route=4&sender=${senderID}&message=${message}&country=91`,
//     headers: {}
//   };
//   var req = http.request(options, function(res) {
//     var chunks = [];

//     res.on("data", function(chunk) {
//       chunks.push(chunk);
//     });

//     res.on("end", function() {
//       var body = Buffer.concat(chunks);
//       console.log(body.toString());
//     });
//   });

//   req.end();
// };

// sms();

var p = "94267 10963";

p = p.replace(/ /g, "");
console.log(p);
