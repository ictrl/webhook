var topics = ["orders/create", "orders/cancelled"];

topics.splice(0, 1);
topics.forEach(topic => {
  makeWebook(topic);
  console.log("forEach Topic call-->", topic);
});
