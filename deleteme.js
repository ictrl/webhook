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
//  var ss = mojitostest.myshopify.com=157371121157400; mojitotest.myshopify.com=157371152834700; mojitostore.myshopify.com=157371535774500; connect.sid=s%3A7bxHT-8M8TjQYQdPxKHfFWIQPBu233Kq.FaaMo6Hg64LT3NBj0VXjs9f%2F1CWl9wrq%2Fdx80eh2yJI

// var cookies = {
//   "mojitostest.myshopify.com": "157371121157400",
//   state: "157371121157400",
//   "mojitotest.myshopify.com": "157371152834700",
//   "mojitostore.myshopify.com": "157371535774500",
//   "connect.sid":
//     "s:7bxHT-8M8TjQYQdPxKHfFWIQPBu233Kq.FaaMo6Hg64LT3NBj0VXjs9f/1CWl9wrq/dx80eh2yJI"
// };

// var name = "mojitostest.myshopify.com";

// const stateCookie = cookies[`${name}`];

// var myarr = [
//   {
//     term: "Hi%20Samrat,%20Thanks%20order%20ID:%201104",
//     description: "Liam Fashions"
//     // number: "1234567900"
//   },
//   {
//     term: "Customer%20name:%20Sa%20order%20ID:%201104",
//     description: "Liam Fashions"
//     // number: "9898989898"
//   }
// ];

// {
//   myarr.map(function(element, index) {
//     return console.log(element);
//   });
// }



