// require("dotenv").config();
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
// let shop = "mojitotest.myshopify.com";

// const shopSchema = new mongoose.Schema({
//   test: [
//     {
//       _id: false,
//       id: { type: Number, required: true, dropDups: true },
//       phone: Number,
//       url: String,
//       dataTime: { type: String, default: Date(Date.now()).toString() },
//       purchase: { type: Boolean, default: false },
//       F30: JSON
//     }
//   ]
// });

// const Store = new mongoose.model("Store", shopSchema);

// let obj = {
//   id: 69,
//   phone: 333,
//   url: "adijha.com",
//   F30: { FollowUp: 0, status: false, time: "69:69" }
// };

// Store.updateOne(
//   { "test.id": 69 },
//   {
//     $set: {
//       "test.$.F30.FollowUp": 69
//     }
//   },
//   function(err, data) {
//     if (!err) {
//       console.log(data);
//     } else {
//       console.log(err);
//     }
//   }
// );
// Store.findOneAndUpdate(
//   { name: shop },
//   {
//     // $push: { template: obj }
//     // $pull: { template: { id: 2 } }
//     $addToSet: { test: obj }
//   },
//   { new: true, useFindAndModify: false },
//   (err, data) => {
//     if (!err) {
//       console.log(data);
//     } else {
//       console.log(err);
//     }
//   }
// );

// Store.updateOne(
//   { "orders.id": 3 },
//   {
//     $set: {
//       "orders.$.purchase": true
//     }
//   },
//   function(err, data) {
//     if (!err) {
//       console.log(data);
//     } else {
//       console.log(err);
//     }
//   }
// );

// Store.findOneAndUpdate(
//   { name: shop },
//   {
//     // $push: { abandan: obj}
//     $push: { orders: obj }
//   },
//   { new: true, useFindAndModify: false },
//   (err, data) => {
//     if (!err) {
//       console.log("data", data);
//     } else {
//       console.log("err", err);
//     }
//   }
// );

// Store.findOneAndUpdate(
//   { name: shop },
//   {
//     // $push: { abandan: obj }

//     // $set: { abandan : { id: 'java' } }

//     // $pull: { abandan: { id: "java" } } //delete
//   },
//   { new: true, useFindAndModify: false },
//   (err, data) => {
//     if (!err) {
//       console.log("data", data);
//     } else {
//       console.log("err", err);
//     }
//   }
// );

// Store.findOneAndUpdate(
//   { name: shop },
//   {
//     $push: { test: obj }
//   },
//   { new: true, useFindAndModify: false },
//   (err, data) => {
//     if (!err) {
//       console.log(data, "data");
//     } else {
//       console.log(err, "err");
//     }
//   }
// );

//manuplate
// Store.findOneAndUpdate(
//   { "abandan.id": "new1" },
//   {
//     $set: {
//       "abandan.$.dateTime": obj.dataTime,
//       "abandan.$.id": obj.id,
//       "abandan.$.phone": obj.phone
//     }
//   },
//   { new: true, useFindAndModify: false },
//   (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (result === null) {
//         Store.findOneAndUpdate(
//           { name: shop },
//           {
//             $push: { abandan: obj }
//           },
//           { new: true, useFindAndModify: false },
//           (err, data) => {
//             if (!err) {
//               console.log("data", data);
//             } else {
//               console.log("err", err);
//             }
//           }
//         );
//       }
//     }
//   }
// );

// let c = Date(Date.now()).toString();
// var x = new Date(c + 30 * 60000);

// console.log(c);
// console.log(x);

const moment = require("moment");

var c = moment()
  .add(30, "minutes")
  .format();
console.log(c);
