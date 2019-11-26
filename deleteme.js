// require("dotenv").config();
// const cron = require("node-cron");
// const moment = require("moment");
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
// let shop = "mojitolabs.myshopify.com";

// const shopSchema = new mongoose.Schema({
//   name: String,
//   data: JSON,
//   orders: [
//     {
//       _id: false,
//       id: { type: Number, required: true, dropDups: true },
//       phone: Number,
//       url: String,
//       dataTime: {
//         type: String,
//         default: moment().format()
//       },
//       email: { type: String, default: null },
//       purchase: { type: Boolean, default: false },
//       storeTime: {
//         type: String,
//         default: moment().format()
//       }
//     }
//   ],

//   sms: Array,
//   smsCount: Number,
//   template: [
//     {
//       _id: false,
//       topic: { type: String, required: true, dropDups: true },
//       customer: String,
//       admin: String
//     }
//   ],
//   abandanTemplate: [
//     {
//       _id: false,
//       topic: { type: String, required: true, dropDups: true },
//       template: String,
//       time: String,
//       status: Boolean
//     }
//   ],
//   clicked: [
//     {
//       _id: false,
//       checkoutId: { type: Number, required: true, dropDups: true },
//       followUp: {
//         type: Array,
//         default: [0]
//       },

//       converted: { type: Boolean, default: false },
//       price: { type: Number, default: null }
//     }
//   ]
// });

// const Store = new mongoose.model("Store", shopSchema);

// let obj = {
//   id: "request",
//   phone: "request",
//   price: "request",
//   url: "request"
//   // f1: moment().add(30, 'minutes').format(),
//   // f2: moment().add(30, 'minutes').format(),
//   // f3: moment().add(30, 'minutes').format(),
//   // f4: moment().add(30, 'minutes').format()
// };

// Store.findOne({ name: shop }, function(err, data) {
//   if (data.abandanTemplate) {
//     data.abandanTemplate.forEach(e => {
//       if (e.topic === "1") {
//         obj.f1 = moment()
//           .add(e.time, "minutes")
//           .format();
//       } else if (e.topic === "2") {
//         obj.f2 = moment()
//           .add(e.time, "minutes")
//           .format();
//       } else if (e.topic === "3") {
//         obj.f3 = moment()
//           .add(e.time, "minutes")
//           .format();
//       } else if (e.topic === "4") {
//         obj.f4 = moment()
//           .add(e.time, "minutes")
//           .format();
//       }
//     });
//   }
//   console.log(obj);
// });

// // const storeName = [];
// // storeName.push("gogo");

// // Store.find({}, function(err, stores) {
// //   stores.forEach(store => {
// //     storeName.push(store.name);
// //   });
// //   console.log("All store name-->", storeName);
// // });
// // console.log("All store name->", storeName);

// // cron.schedule("*/5 * * * * ", () => {
// //   //getting list of all store name
// //   var storeName = [];
// //   Store.find({}, function(err, stores) {
// //     stores.forEach(store => {
// //       storeName.push(store.name);
// //     });
// //     console.log("All store name->", storeName);

// //     let interval = moment()
// //       .subtract(10, "minutes")
// //       .format();
// //     let current = moment().format();
// //     console.log("current time-->", current);
// //     console.log("interval time-->", interval);

// //     storeName.forEach(store => {
// //       console.log("Performing on store-->", store);
// //       Store.findOne({ name: store }, (err, data) => {
// //         data.orders.forEach(order => {
// //           order.followConfig.forEach(element => {
// //             console.log("order time->", element.time);
// //             if (moment(element.time).isBetween(interval, current)) {
// //               console.log("call shortner function for", element.time);
// //             } else console.log("time is not in range", element.time);
// //           });
// //         });
// //       });
// //     });
// //   });
// // });

// //get list of all store name
// // Store.find({}, function(err, stores) {
// //   var storeName = [];

// //   stores.forEach(store => {
// //     storeName.push(store.name);
// //   });
// //   console.log(storeName);
// // });

// // Store.findOne({ name: "mojitolabs.myshopify.com" }, (err, data) => {
// //   console.log(data.orders[0].followConfig[0].time);

// //   data.orders.forEach(order => {
// //     order.followConfig.forEach(element => {
// //       console.log(element.time);
// //     });
// //   });
// // });

// // Store.updateOne(
// //   { "test.id": 69 },
// //   {
// //     $set: {
// //       "test.$.F30.FollowUp": 69
// //     }
// //   },
// //   function(err, data) {
// //     if (!err) {
// //       console.log(data);
// //     } else {
// //       console.log(err);
// //     }
// //   }
// // );
// // Store.findOneAndUpdate(
// //   { name: shop },
// //   {
// //     // $push: { template: obj }
// //     // $pull: { template: { id: 2 } }
// //     $addToSet: { test: obj }
// //   },
// //   { new: true, useFindAndModify: false },
// //   (err, data) => {
// //     if (!err) {
// //       console.log(data);
// //     } else {
// //       console.log(err);
// //     }
// //   }
// // );

// // Store.updateOne(
// //   { "orders.id": 3 },
// //   {
// //     $set: {
// //       "orders.$.purchase": true
// //     }
// //   },
// //   function(err, data) {
// //     if (!err) {
// //       console.log(data);
// //     } else {
// //       console.log(err);
// //     }
// //   }
// // );

// // Store.findOneAndUpdate(
// //   { name: shop },
// //   {
// //     // $push: { abandan: obj}
// //     $push: { orders: obj }
// //   },
// //   { new: true, useFindAndModify: false },
// //   (err, data) => {
// //     if (!err) {
// //       console.log("data", data);
// //     } else {
// //       console.log("err", err);
// //     }
// //   }
// // );

// // Store.findOneAndUpdate(
// //   { name: shop },
// //   {
// //     // $push: { abandan: obj }

// //     // $set: { abandan : { id: 'java' } }

// //     // $pull: { abandan: { id: "java" } } //delete
// //   },
// //   { new: true, useFindAndModify: false },
// //   (err, data) => {
// //     if (!err) {
// //       console.log("data", data);
// //     } else {
// //       console.log("err", err);
// //     }
// //   }
// // );

// // Store.findOneAndUpdate(
// //   { name: shop },
// //   {
// //     $push: { test: obj }
// //   },
// //   { new: true, useFindAndModify: false },
// //   (err, data) => {
// //     if (!err) {
// //       console.log(data, "data");
// //     } else {
// //       console.log(err, "err");
// //     }
// //   }
// // );

// // // manuplate
// // Store.findOneAndUpdate(
// //   { "abandan.id": "new1" },
// //   {
// //     $set: {
// //       "abandan.$.dateTime": obj.dataTime,
// //       "abandan.$.id": obj.id,
// //       "abandan.$.phone": obj.phone
// //     }
// //   },
// //   { new: true, useFindAndModify: false },
// //   (err, result) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       if (result === null) {
// //         Store.findOneAndUpdate(
// //           { name: shop },
// //           {
// //             $push: { abandan: obj }
// //           },
// //           { new: true, useFindAndModify: false },
// //           (err, data) => {
// //             if (!err) {
// //               console.log("data", data);
// //             } else {
// //               console.log("err", err);
// //             }
// //           }
// //         );
// //       }
// //     }
// //   }
// // );
