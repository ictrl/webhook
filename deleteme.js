// // // require("dotenv").config();
// // // const mongoose = require("mongoose");

// // // mongoose.connect(process.env.MONGODB_URI, {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true,
// // //   useCreateIndex: true
// // // });

// // // const shopSchema = new mongoose.Schema({
// // //   name: String,
// // //   data: JSON,
// // //   sms: JSON,
// // //   smsCount: Number
// // // });
// // // const Store = new mongoose.model("Store", shopSchema);
// // // const fn = s => {
// // //   Store.findOne({ name: "mojitostore.myshopify.com" }, function(err, data) {
// // //     if (!err) {
// // //       console.log("count==>", data.smsCount);
// // //       if (data.smsCount < 2) {
// // //         Store.findOneAndUpdate(
// // //           { name: "mojitostore.myshopify.com" },
// // //           {
// // //             $push: { sms: { a: "a", b: "b" } },
// // //             $set: {
// // //               smsCount: s + 1
// // //             }
// // //           },
// // //           { new: true, useFindAndModify: false },
// // //           (err, data) => {
// // //             if (!err) {
// // //               console.log("data");
// // //             } else {
// // //               console.log("err", err);
// // //             }
// // //           }
// // //         );
// // //       }
// // //     } else {
// // //       console.log(err);
// // //     }
// // //   });
// // // };

// // // for (let index = 0; index < 2; index++) {
// // //   Store.findOne({ name: "mojitostore.myshopify.com" }, function(err, data) {
// // //     let s = data.smsCount;
// // //     console.log("-->", s);
// // //     fn(s);
// // //   });
// // // }
// // //////////
// // onst sndSms = (phone, store, message) => {
// //   var options = {
// //     method: "GET",
// //     hostname: "api.msg91.com",
// //     port: null,
// //     path: `/api/sendhttp.php?mobiles=${phone}&authkey=300328AHqrb8dPQZ35daf0fb0&route=4&sender=MOJITO&message=${message}&country=91`,
// //     headers: {}
// //   };

// //   var req = http.request(options, function(res) {
// //     var chunks = [];

// //     res.on("data", function(chunk) {
// //       chunks.push(chunk);
// //     });

// //     res.on("end", function() {
// //       var body = Buffer.concat(chunks);
// //       console.log(body.toString());
// //     });
// //   });

// //   const shop = new Shop({
// //     message: message,
// //     store: store,
// //     phone: phone
// //   });

// //   shop.save(function(err) {
// //     if (!err) {
// //       console.log("saved to DB");
// //     }
// //   });

// //   req.end();
// // };
// // ///////////
// // var options = {
// //           method: "GET",
// //           hostname: "api.msg91.com",
// //           port: null,
// //           path: `/api/sendhttp.php?mobiles=${phone}&authkey=${process.env.SMS_API}&route=4&sender=${senderID}&message=${message}&country=91`,
// //           headers: {}
// //         };

// //         var req = http.request(options, function(res) {
// //           var chunks = [];

// //           res.on("data", function(chunk) {
// //             chunks.push(chunk);
// //           });

// //           res.on("end", function() {
// //             var body = Buffer.concat(chunks);
// //             console.log(body.toString());
// //           });
// //           //save sms data to DB

// //           var obj = {
// //             message: message,
// //             store: store,
// //             number: phone
// //           };
// //           Store.findOneAndUpdate(
// //             { name: shop },
// //             {
// //               $push: { sms: obj },
// //               $set: {
// //                 smsCount: data.smsCount + 1
// //               }
// //             },
// //             { new: true, useFindAndModify: false },
// //             (err, data) => {
// //               if (!err) {
// //                 console.log("data");
// //               } else {
// //                 console.log("err", err);
// //               }
// //             }
// //           );
// //         });
// //       } else if ((data.smsCount = 11)) {
// //         //notify admin
// //         phone = adminNumber;
// //         var options = {
// //           method: "GET",
// //           hostname: "api.msg91.com",
// //           port: null,
// //           path: `/api/sendhttp.php?mobiles=${phone}&authkey=${process.env.SMS_API}&route=4&sender=${senderID}&message=Update%20from%20MOJITO-SMS-UPDATE:%20Your%20SMS%20left%20is%200,%20please recharge&country=91`,
// //           headers: {}
// //         };

// //         var req = http.request(options, function(res) {
// //           var chunks = [];

// //           res.on("data", function(chunk) {
// //             chunks.push(chunk);
// //           });

// //           res.on("end", function() {
// //             var body = Buffer.concat(chunks);
// //             console.log(body.toString());
// //           });
// //         });
// //         // increase smsCount to 12 and save to DB
// //         Store.findOneAndUpdate(
// //           { name: shop },
// //           {
// //             $set: {
// //               smsCount: 12
// //             }
// //           },
// //           {
// //             new: true,
// //             useFindAndModify: false
// //           },
// //           (err, data) => {
// //             if (!err) {
// //               console.log("data");
// //             } else {
// //               console.log("err", err);
// //             }
// //           }
// //         );
// //       } else {
// //         console.log("admin don't recharge yet!");
// //       }
// //     } else {
// //       console.log("err-->", err);
// //     }

// //////
// app.post("/store/:Gshop/:topic/:subtopic", function(request, response) {
//   console.log("got response");

//   const shop = request.params.Gshop;
//   let topic = request.params.topic;
//   const subtopic = request.params.subtopic;

//   topic = topic + "/" + subtopic;

//   Store.findOne({ name: shop }, function(err, data) {
//     if (!err) {
//       switch (topic) {
//         case "orders/create":
//           if (data.data["orders/create customer"] != undefined) {
//             /*parse the response..take help from docs
//             https://help.shopify.com/en/api/reference/events/webhook
//             */
//             name = request.body.shipping_address.first_name;
//             email = request.body.email;
//             vendor = request.body.line_items[0].vendor;
//             title = request.body.line_items[0].title;
//             orderId = request.body.name;
//             orderId = orderId.slice(1);

//             price = request.body.total_price;

//             phone = request.body.shipping_address.phone;
//             phone1 = request.body.billing_address.phone;
//             phone2 = request.body.customer.phone;

//             address1 = request.body.shipping_address.address1;
//             address2 = request.body.shipping_address.address2;
//             city = request.body.shipping_address.city;
//             country = request.body.shipping_address.country;

//             message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
//             //end

//             let senderID = data.data["sender id"];

//             if (phone) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone1) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone2) {
//               sndSms(phone, vendor, message, senderID, shop);
//             }
//           }
//           if (data.data["orders/create admin"] != undefined) {
//             let admin = data.data["admin no"];
//             adminNumber = admin;
//             let senderID = data.data["sender id"];
//             message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId}`;

//             sndSms(admin, vendor, message, senderID, shop);
//           }
//           break;
//         case "orders/cancelled":
//           if (data.data["orders/cancelled customer"] != undefined) {
//             if (phone) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone1) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone2) {
//               sndSms(phone, vendor, message, senderID, shop);
//             }
//           }
//           if (data.data["orders/cancelled admin"] != undefined) {
//             sndSms(admin, vendor, message);
//           }
//           break;
//         case "orders/fulfilled":
//           if (data.data["orders/fulfilled customer"] != undefined) {
//             if (phone) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone1) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone2) {
//               sndSms(phone, vendor, message, senderID, shop);
//             }
//           }
//           if (data.data["orders/fulfilled admin"] != undefined) {
//             sndSms(admin, vendor, message);
//           }
//           break;
//         case "orders/partially_fulfilled":
//           if (data.data["orders/partially_fulfilled customer"] != undefined) {
//             if (phone) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone1) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone2) {
//               sndSms(phone, vendor, message, senderID, shop);
//             }
//           }
//           if (data.data["orders/partially_fulfilled admin"] != undefined) {
//             sndSms(admin, vendor, message);
//           }
//           break;
//         case "customers/create":
//           if (data.data["customers/create customer"] != undefined) {
//             if (phone) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone1) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone2) {
//               sndSms(phone, vendor, message, senderID, shop);
//             }
//           }
//           if (data.data["customers/create admin"] != undefined) {
//             sndSms(admin, vendor, message);
//           }
//           break;
//         case "refunds/create":
//           if (data.data["refunds/create customer"] != undefined) {
//             if (phone) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone1) {
//               sndSms(phone, vendor, message, senderID, shop);
//             } else if (phone2) {
//               sndSms(phone, vendor, message, senderID, shop);
//             }
//           }
//           if (data.data["refunds/create admin"] != undefined) {
//             sndSms(admin, vendor, message);
//           }
//           break;

//         default:
//           console.log("!possible");
//           break;
//       }
//     } else {
//       console.log(err);
//     }
//   });

//   response.sendStatus(200);
// });

let obj = {
  topic: "value1",
  customr: "hei",
  admin: " 222"
};
let ob2 = {
  topic: "value2",
  customr: "hei",
  admin: " 222"
};

let temp = [];
temp.push(obj);
temp.push(ob2);

var topic = "value2";

temp.forEach(element => {
  if (element.topic === topic) {
    console.log(element);
  } else {
    console.log("!find");
  }
});
