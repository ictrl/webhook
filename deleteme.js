require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
let shop = "mojitolabs.myshopify.com";

const shopSchema = new mongoose.Schema({
  name: String,
  data: JSON,

  abandan: [
    {
      id: { type: String, required: true, unique: true },
      phone: Number,
      dataTime: String
    }
  ]
});

const Store = new mongoose.model("Store", shopSchema);

var d = Date(Date.now());
d = d.toString();

let obj = {
  id: "new ",
  phone: 9898,
  dataTime: d,
  data: d
};

// Store.findOneAndUpdate(
//   { name: shop },
//   {
//     $push: { abandan: obj }

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

Store.update(
  { "abandan.id": "new data" },
  { $set: { "abandan.$.phone": 98989898 } },

  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);
