require("dotenv").config();
const cron = require("node-cron");
const moment = require("moment");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let shop = "mojitotest.myshopify.com";

const shopSchema = new mongoose.Schema({
  name: String,
  data: JSON,
  orders: [
    {
      _id: false,
      id: { type: Number, required: true, dropDups: true },
      phone: Number,
      url: String,
      dataTime: {
        type: String,
        default: moment().format()
      },
      purchase: { type: Boolean, default: false },
      followConfig: Array
    }
  ],

  sms: Array,
  smsCount: Number,
  template: [
    {
      _id: false,
      topic: { type: String, required: true, dropDups: true },
      customer: String,
      admin: String
    }
  ],
  abandanTemplate: [
    {
      _id: false,
      topic: { type: String, required: true, dropDups: true },
      template: String,
      time: String,
      status: Boolean
    }
  ]
});

const Store = new mongoose.model("Store", shopSchema);

// let obj = {
//   id: "request.body.id",
//   phone: request.body.shipping_address.phone,
//   url: request.body.abandoned_checkout_url,
//   followConfig: []
// };

// obj.followConfig.push(
//   {
//     followUp: 0,
//     status: false,
//     time: moment()
//       .add(30, "minutes")
//       .format()
//   },
//   {
//     followUp: 0,
//     status: false,
//     time: moment()
//       .add(60, "minutes")
//       .format()
//   },
//   {
//     followUp: 0,
//     status: false,
//     time: moment()
//       .add(360, "minutes")
//       .format()
//   },
//   {
//     followUp: 0,
//     status: false,
//     time: moment()
//       .add(600, "minutes")
//       .format()
//   },
//   {
//     followUp: 0,
//     status: false,
//     time: moment()
//       .add(1440, "minutes")
//       .format()
//   },
//   {
//     followUp: 0,
//     status: false,
//     time: moment()
//       .add(2880, "minutes")
//       .format()
//   },
//   {
//     followUp: 0,
//     status: false,
//     time: moment()
//       .add(4320, "minutes")
//       .format()
//   }
// );

// console.log(obj);


Store.findOne({ name: "mojitolabs.myshopify.com" }, (err, data) => {
  console.log(data.orders[0].followConfig[0].time);

  data.orders.forEach(order => {
    order.followConfig.forEach(element => {
      console.log(element.time);
    });
  });
});
