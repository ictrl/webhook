require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const shopSchema = new mongoose.Schema({
  name: String,
  data: JSON,
  sms: JSON,
  smsCount: Number
});
const Store = new mongoose.model("Store", shopSchema);
const fn = s => {
  Store.findOne({ name: "mojitostore.myshopify.com" }, function(err, data) {
    if (!err) {
      console.log("count==>", data.smsCount);
      if (data.smsCount < 2) {
        Store.findOneAndUpdate(
          { name: "mojitostore.myshopify.com" },
          {
            $push: { sms: { a: "a", b: "b" } },
            $set: {
              smsCount: s + 1
            }
          },
          { new: true, useFindAndModify: false },
          (err, data) => {
            if (!err) {
              console.log("data");
            } else {
              console.log("err", err);
            }
          }
        );
      }
    } else {
      console.log(err);
    }
  });
};

for (let index = 0; index < 2; index++) {
  Store.findOne({ name: "mojitostore.myshopify.com" }, function(err, data) {
    let s = data.smsCount;
    console.log("-->", s);
    fn(s);
  }); 
}
