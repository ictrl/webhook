require('dotenv').config();
const cron = require('node-cron');
const moment = require('moment');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
let shop = 'mojitolabs.myshopify.com';

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
			followConfig: {
				type: Array,
				default: [
					{
						followUp: 0,
						status: false,
						inc: 30
					},
					{
						followUp: 0,
						status: false,
						inc: 60
					},
					{
						followUp: 0,
						status: false,
						inc: 360
					},
					{
						followUp: 0,
						status: false,
						inc: 600
					},
					{
						followUp: 0,
						status: false,
						inc: 1440
					},
					{
						followUp: 0,
						status: false,
						inc: 2880
					},
					{
						followUp: 0,
						status: false,
						inc: 4320
					}
				]
			}
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

const Store = new mongoose.model('Store', shopSchema);

// let obj = {
// 	id: 33,
// 	phone: 11,
// 	url: 'request.body.abandoned_checkout_url',
// 	followConfig: [
// 		{
// 			dhrbqau: 'ad',
// 			dhrbqu: 'awd',
// 			dhrbqa: 'add'
// 		}
// 	]
// };

// Store.findOneAndUpdate(
// 	{ name: shop },
// 	{
// 		$addToSet: { orders: obj }
// 	},
// 	{ new: true, useFindAndModify: false },
// 	(err, data) => {
// 		if (!err) {
// 			console.log('data add to DB', data);
// 		} else {
// 			console.log(err);
// 		}
// 	}
// );

// console.log(obj);

// Store.findOne({ name: "mojitolabs.myshopify.com" }, (err, data) => {
//   console.log(data.orders[0].followConfig[0].time);

//   data.orders.forEach(order => {
//     order.followConfig.forEach(element => {
//       console.log(element.time);
//     });
//   });
// });

console.log('--------------------------');

///////////////////////////////

// Store.findOneAndUpdate(
// 	{ 'orders.$.inc': 30 },
// 	{
// 		$set: {
// 			'orders.$.followUp': 1,
// 			'orders.$.status': true
// 		}
// 	},
// 	{ new: true, useFindAndModify: false },
// 	(err, result) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			if (result === null) {
// 				console.log('result == null');
// 				console.log('Store', Store.orders);
// 				Store.findOneAndUpdate(
// 					{ name: shop },
// 					{
// 						$set: {
// 							'orders.$.followUp': 1,
// 							'orders.$.status': true
// 						}
// 					},
// 					{ new: true, useFindAndModify: false },
// 					(err, data) => {
// 						if (!err) {
// 							console.log('Store', Store.orders);
// 							console.log(data);
// 						} else {
// 							console.log('Store', Store);
// 							console.log(err);
// 						}
// 					}
// 				);
// 			}
// 		}
// 	}
// );

// const Character = mongoose.model(
// 	'Character',
// 	new mongoose.Schema({
// 		name: String,
// 		age: Number
// 	})
// );

// await Character.create({ name: 'Jean-Luc Picard' });

// let filter = { name: 'Jean-Luc Picard' };
// let update = { age: 59 };

// // `doc` is the document _before_ `update` was applied
// let doc = await Character.findOneAndUpdate(filter, update, {
//   new: true
// });
// console.log(doc.name); // 'Jean-Luc Picard'
// console.log(doc.age);
// // undefined
// const name = async () => {
// let doc = await Store.findOne(filter);
// console.log(doc);

// 	let filter = { name: 'mojitolabs.myshopify.com' };
// 	let update = {
// 		'orders.$.purchase': true
// 	};
// 	let objectt;
// 	try {
// 		objectt = await Store.findOneAndUpdate(filter, update);
// 		console.log('object');
// 		console.log('object');
// 		console.log('object');
// 		console.log('object');
// 		console.log('object');
// 		console.log('object');
// 		console.log('object');
// 	} catch (err) {
// 		console.error(err);
// 	}

// 	console.log('hhhhhhhhhhhhhhhhhhhhhhhh', objectt, '209 hhhhhhhhhhhhhhhhhhhhhhhh');
// };

// await Store.countDocuments(filter); // 0
// 	try {
// 		doc = await Store.findOneAndUpdate(
// 			filter,
// 			update,
// 			{
// 				// new: true
// 				// upsert: true // Make this update into an upsert
// 			}
// 		);
// 	} catch (error) {
// 		console.error(error);
// 	}

// 	console.log(doc); // Will Riker
// 	// console.log(doc.age);
// };
// name();
