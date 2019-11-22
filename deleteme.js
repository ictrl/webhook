require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let shop = "mojitolabs.myshopify.com";

const shopSchema = new mongoose.Schema({
  name: String,
  data: JSON,

  abandan: [
    {
      id: { type: String, required: true, unique: true },
      phone: Number,
      dataTime: { type: Date, default: Date(Date.now()).toString() }
    }
  ]
});

const Store = new mongoose.model("Store", shopSchema);

let obj = {
  id: "success",
  phone: 999999
};

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

Store.findOneAndUpdate(
  { name: shop },
  {
    $set: { abandan: obj }
  },
  { new: true, useFindAndModify: false },
  (err, data) => {
    if (!err) {
      console.log(data, "data");
    } else {
      console.log(err, "err");
    }
  }
);

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
