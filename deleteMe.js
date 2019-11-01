var topics = [
  "orders/create",
  "orders/create",
  "orders/cancelled",
  "orders/cancelled",
  "orders/fulfilled",
  "orders/fulfilled",
  "orders/partially_fulfilled",
  "orders/partially_fulfilled",
  "customers/create",
  "refunds/create",
  "sender"
];

const set1 = new Set(topics);

let www = [...set1];

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

removeElement(www, "sender");
console.log(www);
