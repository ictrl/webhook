// require("dotenv").config();
// const moment = require("moment");
// const mongoose = require("mongoose");
// const express = require("express");

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
// let shop = "hamsterlondon1.myshopify.com";

// const Store = require("./models/Shop");
// const Url = require("./models/Url");

// const app = express();
// app.use(express.json());

// const functionn = async params => {
//   try {
//     let ourConverted = await Store.updateOne(
//       {
//         name: shop,
//         clicked: {
//           $elemMatch: {
//             checkoutId: 1234
//           }
//         }
//       },
//       {
//         $set: {
//           "clicked.$.followUp": [0, 0, 0, 0]
//         }
//       }
//     );
//     console.log(ourConverted.nModified);
//     if (!ourConverted.nModified) {
//       Store.findOneAndUpdate(
//         { name: shop },
//         {
//           $addToSet: {
//             clicked: {
//               checkoutId: 1234,
//               followUp: [1, 1, 1],
//               price: 69
//             }
//           }
//         },
//         { new: true, useFindAndModify: false },
//         (err, data) => {
//           if (!err) {
//             console.log(data);
//           } else {
//             console.log(err);
//           }
//         }
//       );
//     }
//     console.log("ourConverted");
//   } catch (error) {
//     console.error(error);
//     console.log("unable to mark as purchase true");
//   }
// };

// functionn();

// app.listen(4000, () => {
//   console.log("App listening on port 4000!");
// });

// ////////////////////////////////
// // console.log('!production cron started');
// // var storeName = [];
// // try {
// // 	const stores = await Store.find({
// // 		uninstalled: false,
// // 		smsCount: {
// // 			$gt: 0
// // 		}
// // 	});
// // const functionn = async (params) => {
// // 	const stores = await Store.find({
// // 		uninstalled: false,
// // 		smsCount: {
// // 			$gt: 0
// // 		}
// // 	});
// // 	console.log('type: ');
// // 	console.log(typeof stores);
// // 	console.log('stores content: ', stores);
// // };
// // 	console.log(stores);

// // 	stores.forEach(async (store) => {
// // 		await storeName.push(store.name);
// // 	});

// // 	let interval = moment().subtract(5, 'minutes').format();
// // 	let current = moment().format();
// // 	console.log('current time-->', current);
// // 	console.log('interval time-->', interval);

// // 	storeName.forEach(async (store) => {
// // 		console.log('Performing on store-->', store);

// // 		try {
// // 			const data = await Store.findOne({ name: store });

// // 			data.orders.forEach(async (order) => {
// // 				if (order.f1 && order.purchase === false) {
// // 					if (moment(order.f1).isBetween(interval, current)) {
// // 						console.log('call shortner function for', order.f1);
// // 						let obj = {
// // 							longUrl: order.url,
// // 							phone: order.phone,
// // 							followUp: 1,
// // 							id: order.id,
// // 							price: order.price,

// // 							vendor: order.vendor,
// // 							name: order.name,
// // 							shop: store
// // 						};
// // 						console.log('objjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj:', obj);
// // 					} else console.log('time is not in range', order.f1);
// // 				}
// // 			});
// // 		} catch (error) {
// // 			console.error(error);
// // 		}
// // 	});
// // } catch (error) {
// // 	console.error(error);
// // }
// ///////////////////////////////////////////////////////////

// // app.get('/api/history', function(req, res) {
// // 	shop = 'uadaan.myshopify.com'; //delete this localTesting

// // 	console.log(req.body.session);

// // 	if (req.body.session.views[pathname]) {
// // 		Store.findOne({ name: shop }, function(err, data) {
// // 			if (data) {
// // 				var history = data.sms;
// // 				res.send(history);
// // 			}
// // 		});
// // 	} else {
// // 		console.log("can't  find session key form get /api/history || your session timeout");
// // 	}
// // });

// // Url.findOneAndUpdate({
// //         id: 11999085264975
// //     }, {
// //         $push: {
// //             followUp: 22
// //         }
// //     }, {
// //         new: true,
// //         useFindAndModify: false
// //     },
// //     (err, result) => {
// //         if (!err) {
// //             console.log(result);
// //         } else console.log("naah");
// //     }
// // );
// // Store.findOneAndUpdate(
// //   { name: "demo-mojito.myshopify.com" },
// //   {
// //     $addToSet: {
// //       clicked: {
// //         checkoutId: 69,
// //         followUp: [1, 2, 3],
// //         price: 99
// //       }
// //     }
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
// // Url.findOneAndUpdate(
// //   { id: 11988933345359 },
// //   {
// //     $set: {
// //       followUp: 9
// //     }
// //   },
// //   { new: true, useFindAndModify: false },
// //   (err, result) => {
// //     if (!err) {
// //       console.log(result);
// //     }
// //   }
// // );
// // Store.findOne({ name: shop, orders : {$elemMatch} }, function(err, data) {
// //   if (data.smsCount > 0) {
// //     console.log("passs");
// //   }
// // });

// // Store.find({ smsCount: { $gt: 0 } }, (err, data) => {
// // 	if (err) {
// // 		console.log(err);
// // 	} else {
// // 		console.log(data);
// // 	}
// // });

// // console.log(message);
// //A.findOne({ _id: a._id, items: { $elemMatch: {$in: [1,5,9] }}}).exec(function (err, docs) {
// // Store.updateOne(
// //   {
// //     clicked: {
// //       $elemMatch: {
// //         // questions: { $elemMatch: { questionId: upQstnObj.questionId } }
// //         // price: 100
// //         checkoutId: 1998
// //       }
// //     }
// //   },
// //   // { $set: { [`${toSet}`]: upQstnObj } },
// //   // $set: {"orders.$.purchase": true}
// //   { $set: { "clicked.$.converted": true } },
// //   (err, data) => {
// //     if (err) {
// //       console.log(err);
// //     } else console.log(data);
// //   }
// // );
// // Store.findOne(
// //   { name: shop, orders: { $elemMatch: { id: 11986548392015 } } },
// //   (err, data) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //    console.log(data)
// //       });
// // Store.findOne({ name: shop }, function(err, data) {
// //   if (data) {
// //     let follow = [];
// //     let price = [];
// //     let inc = [];
// //     let count1 = 0;
// //     let count2 = 0;
// //     let count3 = 0;
// //     let count4 = 0;
// //     let price1 = 0;
// //     let price2 = 0;
// //     let price3 = 0;
// //     let price4 = 0;
// //     let inc1 = 0;
// //     let inc2 = 0;
// //     let inc3 = 0;
// //     let inc4 = 0;
// //     data.clicked.forEach(e => {
// //       let idx = e.followUp.length - 1;
// //       let dig = e.followUp[idx];
// //       if (e.followUp.includes(1)) {
// //         inc1++;
// //       }
// //       if (e.followUp.includes(2)) {
// //         inc2++;
// //       }
// //       if (e.followUp.includes(3)) {
// //         inc3++;
// //       }
// //       if (e.followUp.includes(4)) {
// //         inc4++;
// //       }
// //       if (dig === 1) {
// //         count1++;
// //         price1 = price1 + e.price;
// //       }
// //       if (dig === 2) {
// //         count2++;
// //         price2 = price2 + e.price;
// //       }
// //       if (dig === 3) {
// //         count3++;
// //         price3 = price3 + e.price;
// //       }
// //       if (dig === 4) {
// //         count4++;
// //         price4 = price4 + e.price;
// //       }
// //     });
// //     follow.push(count1);
// //     follow.push(count2);
// //     follow.push(count3);
// //     follow.push(count4);
// //     price.push(price1);
// //     price.push(price2);
// //     price.push(price3);
// //     price.push(price4);
// //     inc.push(inc1);
// //     inc.push(inc2);
// //     inc.push(inc3);
// //     inc.push(inc4);
// //     console.log(follow, "followList");
// //     console.log(price, "priceList");
// //     console.log(inc, "incList");
// //     // e.followUp.forEach(ele => {
// //     // });
// //     // console.log(price, "B");
// //   } else console.log(1);
// // });
// // Store.findOneAndUpdate(
// //   { name: shop },
// //   {
// //     // $push: { template: obj }
// //     // $pull: { template: { id: 2 } }
// //     $addToSet: {
// //       clicked: {
// //         checkoutId: 1,
// //         followUp: [1, 2, 3, 4],
// //         price: 69
// //       }
// //     }
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
// // Store.findOne({ name: shop }, function(err, data) {
// //   if (data.abandanTemplate) {
// //     data.abandanTemplate.forEach(e => {
// //       if (e.topic === "1") {
// //         obj.f1 = moment()
// //           .add(e.time, "minutes")
// //           .format();
// //       } else if (e.topic === "2") {
// //         obj.f2 = moment()
// //           .add(e.time, "minutes")
// //           .format();
// //       } else if (e.topic === "3") {
// //         obj.f3 = moment()
// //           .add(e.time, "minutes")
// //           .format();
// //       } else if (e.topic === "4") {
// //         obj.f4 = moment()
// //           .add(e.time, "minutes")
// //           .format();
// //       }
// //     });
// //   }
// //   console.log(obj);
// // });
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
