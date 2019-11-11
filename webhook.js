require('dotenv').config();
const http = require('https');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const bodyParser = require('body-parser');
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = [
	'read_products ',
	'read_customers',
	'read_fulfillments',
	'read_checkouts',
	'read_analytics',
	'read_orders ',
	'read_script_tags',
	'write_script_tags'
];

let Gshop = '';
let Ghmac = '';
let accessToken = '';
let adminNumber;
let message = {};
let first_name = {};
let email = {};
let total_price = {};
let price = {};
let phone = {};
let phone1 = {};
let phone2 = {};
let product = {};
let address1 = {};
let address2 = {};
let city = {};
let country = {};

const forwardingAddress = 'https://immense-bastion-25565.herokuapp.com'; // Replace this with your HTTPS Forwarding address
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const shopSchema = new mongoose.Schema({
	name: String,
	data: JSON,
	sms: Array,
	smsCount: Number,
	template: Array
});

const Store = new mongoose.model('Store', shopSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// install route

app.get('/shopify', (req, res) => {
	console.log('install route call-->');
	const shop = req.query.shop;
	if (shop) {
		const state = nonce();
		const redirectUri = forwardingAddress + '/shopify/callback';
		const installUrl =
			'https://' +
			shop +
			'/admin/oauth/authorize?client_id=' +
			apiKey +
			'&scope=' +
			scopes +
			'&state=' +
			state +
			'&redirect_uri=' +
			redirectUri;

		res.cookie('state', state);

		res.redirect(installUrl);
	} else {
		return res
			.status(400)
			.send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
	}
});

//callback route -->
app.get('/shopify/callback', (req, res) => {
	console.log('callback route call -->');
	let { shop, hmac, code, state } = req.query;
	Gshop = shop;
	Ghmac = hmac;

	const stateCookie = cookie.parse(req.headers.cookie).state;

	if (state !== stateCookie) {
		return res.status(403).send('Request origin cannot be verified');
	}

	if (shop && hmac && code) {
		// DONE: Validate request is from Shopify
		const map = Object.assign({}, req.query);
		delete map['signature'];
		delete map['hmac'];
		const message = querystring.stringify(map);
		const providedHmac = Buffer.from(hmac, 'utf-8');
		const generatedHash = Buffer.from(crypto.createHmac('sha256', apiSecret).update(message).digest('hex'), 'utf-8');
		let hashEquals = false;

		try {
			hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
		} catch (e) {
			hashEquals = false;
		}

		if (!hashEquals) {
			return res.status(400).send('HMAC validation failed');
		}

		// DONE: Exchange temporary code for a permanent access token

		const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
		const accessTokenPayload = {
			client_id: apiKey,
			client_secret: apiSecret,
			code
		};
		request
			.post(accessTokenRequestUrl, { json: accessTokenPayload })
			.then((accessTokenResponse) => {
				accessToken = accessTokenResponse.access_token;

				// res.sendFile("index.html", { root: __dirname });
				res.redirect('/');
			})
			.catch((error) => {
				// res.sendFile("index.html");
				res.send(error);
				console.log('182-->', error);
			});
	} else {
		res.status(400).send('Required parameters missing');
	}
});

app.post('/myaction', function(req, res) {
	var json_data = req.body;
	console.log(req.body);
	// res.send(200); //add
	res.sendStatus(200); //add

	const store = new Store({
		name: Gshop,
		data: req.body,
		smsCount: 100
	});

	store.save(function(err) {
		if (!err) {
			console.log(`${Gshop} data store to DB`);
		}
	});

	var topics = [];
	//convet JSON to array
	for (var i in json_data) {
		var n = i.indexOf(' ');
		var res = i.substring(n + 1, -1);
		topics.push(res);
	}
	//remove "admin"
	topics.splice(0, 1);

	//remove dublicate element
	const set1 = new Set(topics);

	//convert back to array
	let www = [ ...set1 ];

	function trimArray(arr) {
		for (i = 0; i < arr.length; i++) {
			arr[i] = arr[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		}
		return arr;
	}

	www = trimArray(www);

	//remove "sender"
	function removeElement(array, elem) {
		var index = array.indexOf(elem);
		if (index > -1) {
			array.splice(index, 1);
		}
	}

	removeElement(www, 'sender');

	www.forEach((topic) => {
		makeWebook(topic);
	});
});

const makeWebook = (topic) => {
	const webhookUrl = 'https://' + Gshop + '/admin/api/2019-07/webhooks.json';
	const webhookHeaders = {
		'Content-Type': 'application/json',
		'X-Shopify-Access-Token': accessToken,
		'X-Shopify-Topic': topic,
		'X-Shopify-Hmac-Sha256': Ghmac,
		'X-Shopify-Shop-Domain': 'mojitostore.myshopify.com',
		'X-Shopify-API-Version': '2019-07'
	};

	const webhookPayload = {
		webhook: {
			topic: topic,
			address: `https://immense-bastion-25565.herokuapp.com/store/${Gshop}/${topic}`,
			format: 'json'
		}
	};
	request
		.post(webhookUrl, {
			headers: webhookHeaders,
			json: webhookPayload
		})
		.then((shopResponse) => {
			console.log('showResponse-->', shopResponse);
		})
		.catch((error) => {
			console.log('error-->', error);
		});
};

app.post('/store/:Gshop/:topic/:subtopic', function(request, response) {
	const shop = request.params.Gshop;
	let topic = request.params.topic;
	const subtopic = request.params.subtopic;
	topic = topic + '/' + subtopic;
	Store.findOne({ name: shop }, function(err, data) {
		if (!err) {
			switch (topic) {
				case 'orders/create':
					if (data.data['orders/create customer'] != undefined && data.data['orders/create admin'] != undefined) {
						// data.smsCount + 2
						Store.findOneAndUpdate(
							{ name: shop },
							{
								$set: {
									smsCount: data.smsCount - 1
								}
							},
							{ new: true, useFindAndModify: false },
							(err, data) => {
								if (!err) {
									console.log('datacount + 1');
								} else {
									console.log('err', err);
								}
							}
						);
					}
					if (data.data['orders/create customer'] != undefined) {
						name = request.body.shipping_address.first_name;
						email = request.body.email;
						vendor = request.body.line_items[0].vendor;
						title = request.body.line_items[0].title;
						orderId = request.body.name;
						orderId = orderId.slice(1);
						price = request.body.total_price;
						phone = request.body.shipping_address.phone;
						phone1 = request.body.billing_address.phone;
						phone2 = request.body.customer.phone;
						address1 = request.body.shipping_address.address1;
						address2 = request.body.shipping_address.address2;
						city = request.body.shipping_address.city;
						country = request.body.shipping_address.country;
						//check in data base if there is exist any template for  orders/create
						message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.customer) {
										message = element.customer;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
										}
									} else {
										message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
									}
								} else {
									message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20will%20be%20shipped%20shortly.%20Your%20order%20ID:%20${orderId}`;
								}
							});
						}
						//end
						let senderID = data.data['sender id'];
						if (phone) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone1) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone2) {
							sndSms(phone, vendor, message, senderID, shop);
						}
					}
					if (data.data['orders/create admin'] != undefined) {
						let admin = data.data['admin no'];
						adminNumber = admin;
						let senderID = data.data['sender id'];
						//check in data base if there is exist any template for  orders/create for admin
						message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId}`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.admin) {
										message = element.admin;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
										}
									} else {
										message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId}`;
									}
								} else {
									message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId}`;
								}
							});
						}
						//end
						sndSms(admin, vendor, message, senderID, shop);
					}

					break;
				case 'orders/cancelled':
					if (data.data['orders/cancelled customer'] != undefined && data.data['orders/cancelled admin'] != undefined) {
						Store.findOneAndUpdate(
							{ name: shop },
							{
								$set: {
									smsCount: data.smsCount - 1
								}
							},
							{ new: true, useFindAndModify: false },
							(err, data) => {
								if (!err) {
									console.log('datacount + 1');
								} else {
									console.log('err', err);
								}
							}
						);
					}
					if (data.data['orders/cancelled customer'] != undefined) {
						name = request.body.shipping_address.first_name;
						email = request.body.email;
						vendor = request.body.line_items[0].vendor;
						title = request.body.line_items[0].title;
						orderId = request.body.name;
						orderId = orderId.slice(1);
						price = request.body.total_price;
						phone = request.body.shipping_address.phone;
						phone1 = request.body.billing_address.phone;
						phone2 = request.body.customer.phone;
						address1 = request.body.shipping_address.address1;
						address2 = request.body.shipping_address.address2;
						city = request.body.shipping_address.city;
						country = request.body.shipping_address.country;
						cancelled_at = request.body.cancelled_at;
						cancel_reason = request.body.cancel_reason;
						message = `Hi%20${name},%20Thanks%20for%20trying%20us!%20Your%20order%20is%20cancelled,%20because%20${cancel_reason}%20at%20${cancelled_at}.%20Your%20order%20ID:%20${orderId}`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.customer) {
										message = element.customer;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
											message = message.replace('${cancel_reason}', cancel_reason);
										}
									} else {
										message = `Hi%20${name},%20Thanks%20for%20trying%20us!%20Your%20order%20is%20cancelled,%20because%20${cancel_reason}%20at%20${cancelled_at}.%20Your%20order%20ID:%20${orderId}`;
									}
								} else {
									message = `Hi%20${name},%20Thanks%20for%20trying%20us!%20Your%20order%20is%20cancelled,%20because%20${cancel_reason}%20at%20${cancelled_at}.%20Your%20order%20ID:%20${orderId}`;
								}
							});
						}

						//end
						let senderID = data.data['sender id'];
						if (phone) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone1) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone2) {
							sndSms(phone, vendor, message, senderID, shop);
						}
					}
					if (data.data['orders/cancelled admin'] != undefined) {
						let admin = data.data['admin no'];
						adminNumber = admin;
						let senderID = data.data['sender id'];
						message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId}`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.admin) {
										message = element.admin;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
										}
									} else {
										message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId}`;
									}
								} else {
									message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId}`;
								}
							});
						}

						sndSms(admin, vendor, message, senderID, shop);
					}
					break;
				case 'orders/fulfilled':
					if (data.data['orders/fulfilled customer'] != undefined && data.data['orders/fulfilled admin'] != undefined) {
						// data.smsCount + 2
						Store.findOneAndUpdate(
							{ name: shop },
							{
								$set: {
									smsCount: data.smsCount - 1
								}
							},
							{ new: true, useFindAndModify: false },
							(err, data) => {
								if (!err) {
									console.log('datacount + 1');
								} else {
									console.log('err', err);
								}
							}
						);
					}
					if (data.data['orders/fulfilled customer'] != undefined) {
						name = request.body.shipping_address.first_name;
						email = request.body.email;
						vendor = request.body.line_items[0].vendor;
						title = request.body.line_items[0].title;
						orderId = request.body.name;
						orderId = orderId.slice(1);
						price = request.body.total_price;
						phone = request.body.shipping_address.phone;
						phone1 = request.body.billing_address.phone;
						phone2 = request.body.customer.phone;
						address1 = request.body.shipping_address.address1;
						address2 = request.body.shipping_address.address2;
						city = request.body.shipping_address.city;
						country = request.body.shipping_address.country;
						fulfillment_status = request.body.fulfillment_status;
						updated_at = request.body.updated_at;
						order_status_url = request.body.order_status_url;
						message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20fulfillment%20status%20is%20${fulfillment_status}%20updated%20at%20${updated_at}.Your%order%status%20${order_status_url}.%20Your%20order%20ID:%20${orderId}`;
						//end

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.customer) {
										message = element.customer;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
											message = message.replace('${fulfillment_status}', fulfillment_status);
											message = message.replace('${order_status_url}', order_status_url);
										}
									} else {
										message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20fulfillment%20status%20is%20${fulfillment_status}%20updated%20at%20${updated_at}.Your%order%status%20${order_status_url}.%20Your%20order%20ID:%20${orderId}`;
									}
								} else {
									message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20fulfillment%20status%20is%20${fulfillment_status}%20updated%20at%20${updated_at}.Your%order%status%20${order_status_url}.%20Your%20order%20ID:%20${orderId}`;
								}
							});
						}

						let senderID = data.data['sender id'];
						if (phone) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone1) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone2) {
							sndSms(phone, vendor, message, senderID, shop);
						}
					}
					if (data.data['orders/fulfilled admin'] != undefined) {
						let admin = data.data['admin no'];
						adminNumber = admin;
						let senderID = data.data['sender id'];
						message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.admin) {
										message = element.admin;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
											message = message.replace('${fulfillment_status}', fulfillment_status);
											message = message.replace('${order_status_url}', order_status_url);
										}
									} else {
										message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;
									}
								} else {
									message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;
								}
							});
						}

						sndSms(admin, vendor, message, senderID, shop);
					}
					break;
				case 'orders/partially_fulfilled':
					if (data.data['orders/partially customer'] != undefined && data.data['orders/partially admin'] != undefined) {
						// data.smsCount + 2
						Store.findOneAndUpdate(
							{ name: shop },
							{
								$set: {
									smsCount: data.smsCount - 1
								}
							},
							{ new: true, useFindAndModify: false },
							(err, data) => {
								if (!err) {
									console.log('datacount + 1');
								} else {
									console.log('err', err);
								}
							}
						);
					}
					if (data.data['orders/partially_fulfilled customer'] != undefined) {
						name = request.body.shipping_address.first_name;
						email = request.body.email;
						vendor = request.body.line_items[0].vendor;
						title = request.body.line_items[0].title;
						orderId = request.body.name;
						orderId = orderId.slice(1);

						price = request.body.total_price;

						phone = request.body.shipping_address.phone;
						phone1 = request.body.billing_address.phone;
						phone2 = request.body.customer.phone;

						address1 = request.body.shipping_address.address1;
						address2 = request.body.shipping_address.address2;
						city = request.body.shipping_address.city;
						country = request.body.shipping_address.country;

						fulfillment_status = request.body.fulfillment_status;
						updated_at = request.body.updated_at;
						order_status_url = request.body.order_status_url;

						message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20fulfillment%20status%20is%20${fulfillment_status}%20updated%20at%20${updated_at}.Your%order%status%20${order_status_url}.%20Your%20order%20ID:%20${orderId}`;
						//end

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.customer) {
										message = element.customer;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
											message = message.replace('${fulfillment_status}', fulfillment_status);
											message = message.replace('${order_status_url}', order_status_url);
										}
									} else {
										message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20fulfillment%20status%20is%20${fulfillment_status}%20updated%20at%20${updated_at}.Your%order%status%20${order_status_url}.%20Your%20order%20ID:%20${orderId}`;
									}
								} else {
									message = `Hi%20${name},%20Thanks%20for%20shopping%20with%20us!%20Your%20order%20is%20confirmed,%20and%20fulfillment%20status%20is%20${fulfillment_status}%20updated%20at%20${updated_at}.Your%order%status%20${order_status_url}.%20Your%20order%20ID:%20${orderId}`;
								}
							});
						}

						let senderID = data.data['sender id'];

						if (phone) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone1) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone2) {
							sndSms(phone, vendor, message, senderID, shop);
						}
					}
					if (data.data['orders/partially_fulfilled admin'] != undefined) {
						let admin = data.data['admin no'];
						adminNumber = admin;
						let senderID = data.data['sender id'];
						message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.admin) {
										message = element.admin;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
											message = message.replace('${fulfillment_status}', fulfillment_status);
											message = message.replace('${order_status_url}', order_status_url);
										}
									} else {
										message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;
									}
								} else {
									message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;
								}
							});
						}

						sndSms(admin, vendor, message, senderID, shop);
					}
					break;
				case 'customers/create':
					if (data.data['customers/create customer'] != undefined && data.data['customers/create admin'] != undefined) {
						// data.smsCount + 2
						Store.findOneAndUpdate(
							{ name: shop },
							{
								$set: {
									smsCount: data.smsCount - 1
								}
							},
							{ new: true, useFindAndModify: false },
							(err, data) => {
								if (!err) {
									console.log('datacount + 1');
								} else {
									console.log('err', err);
								}
							}
						);
					}
					if (data.data['customers/create customer'] != undefined) {
						name = request.body.first_name;
						email = request.body.email;

						phone = request.body.phone;

						message = `Hi%20${name},%20Thanks%20for%20showing%20interest%20on%20us!%20Your%20account%20is%20created,%20Happy%20Shopping.`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.customer) {
										message = element.customer;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${email}', email);
											message = message.replace('${phone}', phone);
											message = message.replace('${name}', name);
										}
									} else {
										message = `Hi%20${name},%20Thanks%20for%20showing%20interest%20on%20us!%20Your%20account%20is%20created,%20Happy%20Shopping.`;
									}
								} else {
									message = `Hi%20${name},%20Thanks%20for%20showing%20interest%20on%20us!%20Your%20account%20is%20created,%20Happy%20Shopping.`;
								}
							});
						}

						//end

						let senderID = data.data['sender id'];

						if (phone) {
							sndSms(phone, vendor, message, senderID, shop);
						}
					}
					if (data.data['customers/create admin'] != undefined) {
						let admin = data.data['admin no'];
						adminNumber = admin;
						let senderID = data.data['sender id'];
						message = `New%20Customer%20${name},%20arrived.`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.admin) {
										message = element.admin;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${email}', email);
											message = message.replace('${phone}', phone);
											message = message.replace('${name}', name);
										}
									} else {
										message = `New%20Customer%20${name},%20arrived.`;
									}
								} else {
									message = `New%20Customer%20${name},%20arrived.`;
								}
							});
						}

						sndSms(admin, vendor, message, senderID, shop);
					}
					break;
				case 'refunds/create':
					if (data.data['refunds/create customer'] != undefined && data.data['refunds/create admin'] != undefined) {
						// data.smsCount + 2
						Store.findOneAndUpdate(
							{ name: shop },
							{
								$set: {
									smsCount: data.smsCount - 1
								}
							},
							{ new: true, useFindAndModify: false },
							(err, data) => {
								if (!err) {
									console.log('datacount + 1');
								} else {
									console.log('err', err);
								}
							}
						);
					}
					if (data.data['refunds/create customer'] != undefined) {
						vendor = request.body.refund_line_items[0].line_item.vendor;
						title = request.body.refund_line_items[0].line_item.title;
						orderId = request.body.order_id;

						name = request.body.shipping_address.first_name;
						vendor = request.body.line_items[0].vendor;

						price = request.body.refund_line_items[0].subtotal;
						processed_at = request.body.processed_at;

						message = `Hi%20customer,%20Thanks%20for%20shopping%20with%20us!%20Your%20refund%20is%20processed%20at%20${processed_at}.%20Your%20order%20ID:%20${orderId}`;
						//end

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.customer) {
										message = element.customer;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${processed_at}', processed_at);
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
										}
									} else {
										message = `Hi%20customer,%20Thanks%20for%20shopping%20with%20us!%20Your%20refund%20is%20processed%20at%20${processed_at}.%20Your%20order%20ID:%20${orderId}`;
									}
								} else {
									message = `Hi%20customer,%20Thanks%20for%20shopping%20with%20us!%20Your%20refund%20is%20processed%20at%20${processed_at}.%20Your%20order%20ID:%20${orderId}`;
								}
							});
						}

						let senderID = data.data['sender id'];

						if (phone) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone1) {
							sndSms(phone, vendor, message, senderID, shop);
						} else if (phone2) {
							sndSms(phone, vendor, message, senderID, shop);
						}
					}
					if (data.data['refunds/create admin'] != undefined) {
						let admin = data.data['admin no'];
						adminNumber = admin;
						let senderID = data.data['sender id'];
						message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;

						if (data.template !== undefined) {
							data.template.forEach((element) => {
								if (element.topic === topic) {
									if (element.admin) {
										message = element.admin;
										for (let i = 0; i < message.length; i++) {
											message = message.replace('${processed_at}', processed_at);
											message = message.replace('${name}', name);
											message = message.replace('${vendor}', vendor);
											message = message.replace('${price}', price);
											message = message.replace('${order_id}', orderId);
											message = message.replace('${title}', title);
										}
									} else {
										message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;
									}
								} else {
									message = `Customer%20name:%20${name},from%20shop:${shop}%20order%20ID:%20${orderId},%20Order%20Status%20${fulfillment_status}`;
								}
							});
						}

						sndSms(admin, vendor, message, senderID, shop);
					}
					break;
				/////////////////////////////////////////////
				default:
					console.log('!possible');
					break;
			}
		} else {
			console.log(err);
		}
	});
	response.sendStatus(200);
});

const sndSms = (phone, store, message, senderID, shop) => {
	message = message.replace(/ /g, '%20');
	console.log('message sms', message);
	Store.findOne({ name: shop }, function(err, data) {
		if (!err) {
			if (data.smsCount > 0) {
				//send SMS
				var options = {
					method: 'GET',
					hostname: 'api.msg91.com',
					port: null,
					path: `/api/sendhttp.php?mobiles=${phone}&authkey=300328AHqrb8dPQZ35daf0fb0&route=4&sender=${senderID}&message=${message}&country=91`,
					headers: {}
				};
				var req = http.request(options, function(res) {
					var chunks = [];

					res.on('data', function(chunk) {
						chunks.push(chunk);
					});

					res.on('end', function() {
						var body = Buffer.concat(chunks);
						console.log(body.toString());
					});
				});
				//save sms data to DB
				var obj = {
					message: message,
					store: store,
					number: phone
				};
				Store.findOneAndUpdate(
					{ name: shop },
					{
						$push: { sms: obj },
						$set: {
							smsCount: data.smsCount - 1
						}
					},
					{ new: true, useFindAndModify: false },
					(err, data) => {
						if (!err) {
							console.log('data');
						} else {
							console.log('err', err);
						}
					}
				);
				req.end();
			} else if (data.smsCount == 0 || data.smsCount == -1) {
				// notify admin to recharge
				//send SMS mgs91
				phone = adminNumber;
				message = `Your%20SMS_UPDATE%20pack%20is%20exausted,from%20shop:${shop}plesase%20recharge`;
				var options = {
					method: 'GET',
					hostname: 'api.msg91.com',
					port: null,
					path: `/api/sendhttp.php?mobiles=${phone}&authkey=300328AHqrb8dPQZ35daf0fb0&route=4&sender=MOJITO&message=${message}&country=91`,
					headers: {}
				};
				var req = http.request(options, function(res) {
					var chunks = [];

					res.on('data', function(chunk) {
						chunks.push(chunk);
					});

					res.on('end', function() {
						var body = Buffer.concat(chunks);
						console.log(body.toString());
					});
				});
				//save sms data to DB
				var obj = {
					message: message,
					store: store,
					number: phone
				};
				Store.findOneAndUpdate(
					{ name: shop },
					{
						$push: { sms: obj },
						$set: {
							smsCount: data.smsCount - 1
						}
					},
					{ new: true, useFindAndModify: false },
					(err, data) => {
						if (!err) {
							console.log('data');
						} else {
							console.log('err', err);
						}
					}
				);
				req.end();
			} else {
				console.log('admin still not recharge');
			}
		}
	});
};

// save template to db
app.post('/api/template', function(req, res) {
	let data = req.body;
	console.log('data', data);

	if (Gshop != '') {
		Store.findOneAndUpdate(
			{ name: Gshop },
			{
				$push: { template: data }
			},
			{ new: true, useFindAndModify: false },
			(err, data) => {
				if (!err) {
					console.log('data');
				} else {
					console.log('err', err);
				}
			}
		);
	} else {
		console.log('Gshop-->640', Gshop);
	}
});

// send rechage smscount to db
app.post('/api/recharge', function(req, res) {
	let sms = req.body;
	console.log('selected  sms pack ', parseInt(sms.smsCount));

	if (Gshop != '') {
		Store.findOne({ name: Gshop }, function(err, data) {
			if (data) {
				var smsLeft = data.smsCount;
				console.log('smsLeft', smsLeft);
				Store.findOneAndUpdate(
					{ name: Gshop },
					{
						$set: {
							smsCount: smsLeft + parseInt(sms.smsCount)
						}
					},
					{ new: true, useFindAndModify: false },
					(err, data) => {
						if (!err) {
							console.log('data');
						} else {
							console.log('err', err);
						}
					}
				);
			} else {
				res.send('100');
			}
		});
	} else {
		console.log('Gshop-->640', Gshop);
	}
});

app.get('/api/smsCount', function(req, res) {
	Store.findOne({ name: Gshop }, function(err, data) {
		if (data) {
			var sms = data.smsCount + '';
			res.send(sms);
		} else {
			res.send('100');
		}
	});
});

app.get('/api/history', function(req, res) {
	Store.findOne({ name: Gshop }, function(err, data) {
		if (data) {
			var history = data.sms;
			res.send(history);
		}
	});
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`app listening on port ${port}!`);
});
