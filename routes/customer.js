const express = require("express");
// const moment = require("moment");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();

const { Customer } = require("../models/customer");
const { Address } = require("../models/customer_address");

router.post("/add", async (req, res) => {
	let customer_name = req.body.customer_name;
	let phone = req.body.phone;
	let city = req.body.city;
	let county = req.body.county;

	try {
		await Customer.create(
			{
				NAME: customer_name,
				PHONE: phone
			},
			{
				// Specify the attributes to include or exclude
				attributes: { exclude: ["created_at", "updated_at"] }
			}
		);
		await Address.create(
			{
				CITY: city,
				COUNTY: county
			},
			{
				// Specify the attributes to include or exclude
				attributes: { exclude: ["created_at", "updated_at"] }
			}
		);
		return res.status(200).json({
			success: true,
			message: `Customer ${customer_name} was successfully added`
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: `Error occurred. Please try again.`
		});
	}
});

module.exports = router;
