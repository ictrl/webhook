require('dotenv').config();
const cron = require('node-cron');
const moment = require('moment');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
let shop = 'mojitotest.myshopify.com';

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


///////////////////////////////
Store.findOneAndUpdate(
			{ 'orders.inc': req.body.time },
			{
				$set: {
					'orders.$.followUp': req.body.topic,
					'orders.$.status': req.body.status
				}
			},
			{ new: true, useFindAndModify: false },
			(err, result) => {
				if (err) {
					console.log(err);
				} else {
					if (result === null) {
					console.log('result == null')
					}
				}
			}
		)