var request = require("request-promise");
let smsapi = process.env.SMS_API;
console.log(process.env.SMS_API, "api");
var options = { method: 'GET',
  url: 'https://global.datagenit.com/API/sms-api.php',
  qs:
   { auth: smsapi,
     senderid: 'Aditya',
     msisdn: '7988783588',
     message: 'Hello Testcase new' },
  headers:
   {'cache-control': 'no-cache' },
 rejectUnauthorized: false};


// request.get(options)
// .then( function (error, response, body) {
//   if (error) console.log(error);
// console.log(response);
//   console.log(body);
// })
// .catch(error=>{
//   console.log(error);
// })
request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
