const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Url = require("../models/Url");
const Store = require("../webhook");

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      longUrl, shortUrl, (followUp = 1), id, price, shop;
      //price, converted, followUp[], checkoutId

      Store.findOneAndUpdate(
        { name: shop },
        {
          $addToSet: {
            clicked: {
              checkoutId: url.id,
              followUp: url.followUp,
              price: url.price
            }
          }
        },
        { new: true, useFindAndModify: false },
        (err, data) => {
          if (!err) {
            console.log(data);
          } else {
            console.log(err);
          }
        }
      );

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
