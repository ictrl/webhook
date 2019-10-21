// https://api.msg91.com/api/sendhttp.php?mobiles=8340238900&authkey=300121AUJUTiHZXX25dada6b2&route=4&sender=MOJITO&message=gogomaster&country=91

var http = require("https");
var phone = 8340238900;
var message = "Samrat%20Jaiswal";
var options = {
  method: "GET",
  hostname: "api.msg91.com",
  port: null,
  path: `/api/sendhttp.php?mobiles=${phone}&authkey=300121AUJUTiHZXX25dada6b2&route=4&sender=MOJITO&message=${message}&country=91`,
  headers: {}
};

var req = http.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function() {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
