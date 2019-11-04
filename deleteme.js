// // require("dotenv").config();
// // const mongoose = require("mongoose");

// // mongoose.connect(process.env.MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useCreateIndex: true
// // });

// // const shopSchema = new mongoose.Schema({
// //   name: String,
// //   data: JSON,
// //   sms: JSON,
// //   smsCount: Number
// // });
// // const Store = new mongoose.model("Store", shopSchema);
// // const fn = s => {
// //   Store.findOne({ name: "mojitostore.myshopify.com" }, function(err, data) {
// //     if (!err) {
// //       console.log("count==>", data.smsCount);
// //       if (data.smsCount < 2) {
// //         Store.findOneAndUpdate(
// //           { name: "mojitostore.myshopify.com" },
// //           {
// //             $push: { sms: { a: "a", b: "b" } },
// //             $set: {
// //               smsCount: s + 1
// //             }
// //           },
// //           { new: true, useFindAndModify: false },
// //           (err, data) => {
// //             if (!err) {
// //               console.log("data");
// //             } else {
// //               console.log("err", err);
// //             }
// //           }
// //         );
// //       }
// //     } else {
// //       console.log(err);
// //     }
// //   });
// // };

// // for (let index = 0; index < 2; index++) {
// //   Store.findOne({ name: "mojitostore.myshopify.com" }, function(err, data) {
// //     let s = data.smsCount;
// //     console.log("-->", s);
// //     fn(s);
// //   }); 
// // }
// //////////
// onst sndSms = (phone, store, message) => {
//   var options = {
//     method: "GET",
//     hostname: "api.msg91.com",
//     port: null,
//     path: `/api/sendhttp.php?mobiles=${phone}&authkey=300328AHqrb8dPQZ35daf0fb0&route=4&sender=MOJITO&message=${message}&country=91`,
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

//   const shop = new Shop({
//     message: message,
//     store: store,
//     phone: phone
//   });

//   shop.save(function(err) {
//     if (!err) {
//       console.log("saved to DB");
//     }
//   });

//   req.end();
// };
// ///////////
// var options = {
//           method: "GET",
//           hostname: "api.msg91.com",
//           port: null,
//           path: `/api/sendhttp.php?mobiles=${phone}&authkey=${process.env.SMS_API}&route=4&sender=${senderID}&message=${message}&country=91`,
//           headers: {}
//         };
        
//         var req = http.request(options, function(res) {
//           var chunks = [];

//           res.on("data", function(chunk) {
//             chunks.push(chunk);
//           });

//           res.on("end", function() {
//             var body = Buffer.concat(chunks);
//             console.log(body.toString());
//           });
//           //save sms data to DB

//           var obj = {
//             message: message,
//             store: store,
//             number: phone
//           };
//           Store.findOneAndUpdate(
//             { name: shop },
//             {
//               $push: { sms: obj },
//               $set: {
//                 smsCount: data.smsCount + 1
//               }
//             },
//             { new: true, useFindAndModify: false },
//             (err, data) => {
//               if (!err) {
//                 console.log("data");
//               } else {
//                 console.log("err", err);
//               }
//             }
//           );
//         });
//       } else if ((data.smsCount = 11)) {
//         //notify admin
//         phone = adminNumber;
//         var options = {
//           method: "GET",
//           hostname: "api.msg91.com",
//           port: null,
//           path: `/api/sendhttp.php?mobiles=${phone}&authkey=${process.env.SMS_API}&route=4&sender=${senderID}&message=Update%20from%20MOJITO-SMS-UPDATE:%20Your%20SMS%20left%20is%200,%20please recharge&country=91`,
//           headers: {}
//         };

//         var req = http.request(options, function(res) {
//           var chunks = [];

//           res.on("data", function(chunk) {
//             chunks.push(chunk);
//           });

//           res.on("end", function() {
//             var body = Buffer.concat(chunks);
//             console.log(body.toString());
//           });
//         });
//         // increase smsCount to 12 and save to DB
//         Store.findOneAndUpdate(
//           { name: shop },
//           {
//             $set: {
//               smsCount: 12
//             }
//           },
//           {
//             new: true,
//             useFindAndModify: false
//           },
//           (err, data) => {
//             if (!err) {
//               console.log("data");
//             } else {
//               console.log("err", err);
//             }
//           }
//         );
//       } else {
//         console.log("admin don't recharge yet!");
//       }
//     } else {
//       console.log("err-->", err);
//     }

































