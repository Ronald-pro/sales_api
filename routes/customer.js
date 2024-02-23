const express = require("express");
const router = express.Router();
const { sql, pool } = require("../connection");
const { v4: uuidv4 } = require("uuid");

router.post("/add", async (req, res) => {
	try {
		await pool.connect(); // connection

		let customerUID = uuidv4();
		let customer_name = req.body.customer_name;
		let phone = req.body.phone;
		let city = req.body.city;
		let county = req.body.county;
		let contact_person = req.body.contact_person;
		const companyId = 1;
		let class_name = "CDECustomer";
		let route = req.body.route;

		// Create address record
		const addressResult = await pool
			.request()
			.input("CITY", sql.NVarChar, city)
			.input("COUNTY", sql.NVarChar, county)
			.input("UID", sql.NVarChar, customerUID)

			.query(
				"INSERT INTO dbo.de_address (UID, CITY, COUNTY) VALUES (@UID, @CITY, @COUNTY); SELECT SCOPE_IDENTITY() AS insertedAddressId",
				{}
			);

		const addressId = addressResult.recordset[0].insertedAddressId;

		// Create customer record
		const customerResult = await pool
			.request()
			.input("NAME", sql.NVarChar, customer_name)
			.input("PHONE", sql.NVarChar, phone)
			.input("ADDRESS_ID", sql.Int, addressId)
			.input("COMPANY_ID", sql.Int, companyId)
			.input("CLASS_NAME", sql.NVarChar, class_name)
			.input("CONTACT_PERSON", sql.NVarChar, contact_person)
			.input("COMMENTS", sql.NVarChar, route)
			.input("UID", sql.NVarChar, customerUID)
			.query(
				"INSERT INTO dbo.de_person (UID, NAME, PHONE, ADDRESS_ID, COMPANY_ID, CONTACT_PERSON, CLASS_NAME, COMMENTS) VALUES (@UID, @NAME, @PHONE, @ADDRESS_ID, @COMPANY_ID, @CONTACT_PERSON, @CLASS_NAME, @COMMENTS); SELECT SCOPE_IDENTITY() AS insertedCustomerId",
				{
					ADDRESS_ID: sql.Int,
					COMPANY_ID: sql.Int
				}
			);

		const customerId = customerResult.recordset[0].insertedCustomerId;

		return res.status(200).json({
			success: true,
			message: `Customer: ${customer_name} was successfully added`,
			customerId: customerId
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: `Error occurred. Please try again.`
		});
	}
});

router.get("/all", async (req, res) => {
	try {
		const results = await pool.request().query(`
		SELECT dp.ID, dp.NAME as customer_name, dp.PHONE as telephone, dp.COMMENTS as route, da.COUNTY as county FROM dbo.de_person dp
		JOIN dbo.de_address da ON dp.ADDRESS_ID = da.ID

		`);
		return res.json({
			success: true,
			message: "Customers retrieved successfully.",
			data: results.recordset
		});
	} catch (error) {
		console.error("Error retrieving customers:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error"
		});
	}
});

module.exports = router;
