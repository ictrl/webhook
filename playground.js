const cron = require('node-cron');
const moment = require('moment');
const axios = require('axios');

const Store = require('./webhook');

let abandoned_checkout_url = 'https://adijha.com';

//! Time manipulation

// let currentTime = moment().add(60, 'minutes').toString();

// console.log(currentTime);

// let executionTime = moment().add(60, 'minutes');

// console.log(executionTime.toString());

// ! CRON job
//* runs every 5 seconds For TESTING

cron.schedule('*/5 * * * * *', () => {
	console.log('running every 5 second');
	// console.log(moment());
});

//* runs every 5 mins for PRODUCTION

// cron.schedule('*/5 * * * *', () => {
// 	console.log('running every 5min');
// });

//TODO implement this on webhook.js

cron.schedule('*/5 * * * * *', () => {
	console.log('cron started  every 5 sec');
	let interval = moment().subtract(10, 'minutes');
	let current = moment();

	//? test should be time extracted from store.orders.followConfig[0].time

	let test = moment().subtract(5, 'minutes');

	console.log(test.isBetween(interval, current));

	if (test.isBetween(interval, current)) {
		//TODO post request carring
		// sendShortenReq();
		console.log(test.format());
	}
});

const objToSend = {
	longUrl: abandoned_checkout_url,
	followUp: '2',
	id: '222'
};

const sendShortenReq = async (params) => {
	//TODO find followUp template from store.orders.abandan_template

	//? line no 63 me axios check kar lo sahi jaa raha ya nahi

	//?agar axios se post node se nahi jaa raha to wake me up I'll do this through functions by integrating URL Shortner app with it

	try {
		const res = await axios.post('/api/shorten', objToSend);
		console.log(res);
	} catch (err) {
		console.error(err);
		console.log('response nahi aaya');
	}
};

// TODO Frontend(abandan template)  se jab req aata hai to usse tum order.abandanTemplate ko modify kar rahe ho DB me, iske saath saath orders.followConfig ko v update karna hai.
// * for example
// ? if user selected: followUp : 1, 30 min and status : true then after updating store.abandanTemplate you will check for call me
