//! adityajha126@gmail.com credentials

// const accountSid = 'ACdd4222ddf69ed4bd5984920f296dd7eb';
// const authToken = '52aad3900ce0cf31da9cd6f0868a1da2';
// const client = require('twilio')(accountSid, authToken);

// const MessagingResponse = require('twilio').twiml.MessagingResponse;

// const response = new MessagingResponse();
// response.message('This is message 1 of 2.');
// response.message('This is message 2 of 2.');

// console.log(response.toString());

// client.messages
//       .create({
//          body: 'Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/',
//          from: 'whatsapp:+14155238886',
//          to: 'whatsapp:+919711463419'
//        })
//       .then(message => console.log(message.sid))
//   .done();

//! adityajha526@gmail.com credentials

const accountSid = 'AC704e6ad13244ed977f7bed9f8b063b0f';
const authToken = '7aaca9144490a290604db687eb451b7e';
const client = require('twilio')(accountSid, authToken);

client.messages
	.create({
		body:
			'Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/',
		from: 'whatsapp:+14155238886',
		to: 'whatsapp:+917821915962'
	})
	.then((message) => console.log(message.sid))
	.done();


