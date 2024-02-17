const express = require("express");
const router = express.Router();
const { sql, pool } = require("../connection");

router.get(
	"/items",
	async(req, (res) => {})
);

module.exports = router;
