const express = require('express');
const cors = require('cors');
const router = express.Router();

app.use(cors());

router.get('/die', async (req, res) => {
	try {
		return res.status(200).json("Heroku won't die");
	} catch (err) {
		console.error(err);
		res.status(500).json('Server error');
	}
});

module.exports = router;
