const http = require('https');
phone = 7821915962;
message = 'hello';
smsapi = '300121AUJUTiHZXX25dada6b2';
senderID = 'MESSAG';

var options = {
	method: 'GET',
	hostname: 'api.msg91.com',
	port: null,
	path: `/api/sendhttp.php?mobiles=${phone}&authkey=${smsapi}&route=4&sender=${senderID}&message=${message}&country=91`,
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



var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/sendhttp.php?authkey=%24authentication_key&mobiles=Mobile%20no.&unicode=&country=91&message=Hello!%20This%20is%20a%20test%20message&sender=TESTIN&route=4&flash=&schtime=&afterminutes=&response=&campaign=",
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();