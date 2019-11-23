require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let shop = "mojitolabs.myshopify.com";

const shopSchema = new mongoose.Schema({
  orders: [
    {
      _id: false,
      id: { type: Number, required: true, unique: true, dropDups: true },
      phone: Number,
      url: String,
      dataTime: { type: String, default: Date(Date.now()).toString() },
      purchase: { type: Boolean, default: false },
      followUp: { type: Number, default: 0 }
    }
  ]
});

const Store = new mongoose.model("Store", shopSchema);

let obj = {
  id: 3,
  phone: 333,
  url: "adijha.com"
};

// Store.findOneAndUpdate(
//   { name: shop },
//   {
//     // $push: { template: obj }
//     // $pull: { template: { id: 2 } }
//     $addToSet: { orders: obj }
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
//     $set: { abandan: obj }
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
