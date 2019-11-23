//? Time manipulation
const cron = require('node-cron');
const moment = require('moment');

let currentTime = moment().add(60, 'minutes').toString();

console.log(currentTime);

// let executionTime = moment().add(60, 'minutes');

// console.log(executionTime.toString());

// ? CRON job
//* runs every 10 mins

cron.schedule('1,1-59/10 33 * * * *', () => {
	console.log('run again and again');
});
