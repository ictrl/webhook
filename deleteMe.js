var sss = [
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
  "sender "
];

function trimArray(arr) {
  for (i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  return arr;
}

var topics = trimArray(sss);

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
