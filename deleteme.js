// require("dotenv").config();
// const mongoose = require("mongoose");
// const shop = "mojitostore.myshopify.com";

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

// const shopSchema = new mongoose.Schema({
//   name: String,
//   data: JSON,
//   sms: JSON,
//   smsCount: Number
// });
// const Store = new mongoose.model("Store", shopSchema);

// Store.findOne({ name: shop }, function(err, data) {
//   if (!err) {
//     if (data.data["orders/create customer"] != undefined) {
//       console.log(data);

//       // data.template.forEach(element => {
//       //   console.log("in");
//       //   if (element.topic === topic) {
//       //     console.log("in1");
//       //     if (element.customer) {
//       //       message = element.customer;
//       //       console.log("in2");
//       //     } else {
//       //       console.log("else1");

//       //       message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
//       //     }
//       //   } else {
//       //     console.log("else2");

//       //     message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
//       //   }
//       // });
//     }
//   }
// });

// // var message = "";
// // var data = {
// //   sms: [],
// //   template: [],
// //   name: "mojitostore.myshopify.com",
// //   data: {
// //     "admin no": "9898989898",
// //     "orders/create customer": "on",
// //     "orders/create admin": "on",
// //     "sender id": "MOJITO"
// //   },
// //   smsCount: 6099,
// //   __v: 0
// // };

// // data.template.forEach(element => {
// //   console.log("in");
// //   if (element.topic === topic) {
// //     console.log("in");
// //     if (element.customer) {
// //       message = element.customer;
// //       console.log("in2");
// //     } else {
// //       console.log("else1");

// //       message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
// //     }
// //   } else {
// //     console.log("else2");

// //     message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
// //   }
// // });

// // console.log(message);
install route call--> mojitotest.myshopify.com
157371020462600 <--stateNshop--> mojitotest.myshopify.com

install route call--> mojitostore.myshopify.com
 157371020591200 <--stateNshop--> mojitostore.myshopify.com



 callback route call --> mojitostore.myshopify.com
 state 157371020591200
 stateCookie cookie.parse(req.headers.cookie).mojitostore.myshopify.com