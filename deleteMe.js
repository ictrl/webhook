var json_data = {
  "admin no": "1234567890",
  "orders/create customer": "on",
  "orders/create admin": "on"
};
var topics = [];

for (var i in json_data) {
  var n = i.indexOf(" ");
  var res = i.substring(n + 1, -1);
  topics.push(res);
}
topics.splice(0, 1);
console.log(topics);
