const express = require("express");
const router = express.Router();
const { sql, pool } = require("../connection");

router.post("/add", async (req, res) => {
	try {
		await pool.connect(); // Ensure the connection is established before executing queries

		let customer_name = req.body.customer_name;
		let phone = req.body.phone;
		let city = req.body.city;
		let county = req.body.county;
		const companyId = 1;

		// Create address record
		const addressResult = await pool
			.request()
			.input("CITY", sql.NVarChar, city)
			.input("COUNTY", sql.NVarChar, county)

			.query(
				"INSERT INTO dbo.de_address (CITY, COUNTY) VALUES (@CITY, @COUNTY); SELECT SCOPE_IDENTITY() AS insertedAddressId",
				{

				}
			);

		const addressId = addressResult.recordset[0].insertedAddressId;

		// Create customer record
		const customerResult = await pool
			.request()
			.input("NAME", sql.NVarChar, customer_name)
			.input("PHONE", sql.NVarChar, phone)
			.input("ADDRESS_ID", sql.Int, addressId)
			.input("COMPANY_ID", sql.Int, companyId)
			.query(
				"INSERT INTO dbo.de_person (NAME, PHONE, ADDRESS_ID, COMPANY_ID) VALUES (@NAME, @PHONE, @ADDRESS_ID, @COMPANY_ID); SELECT SCOPE_IDENTITY() AS insertedCustomerId",
				{
					// Pass the ADDRESS_ID as a parameter
					ADDRESS_ID: sql.Int,
					COMPANY_ID: sql.Int,
				}
			);

		const customerId = customerResult.recordset[0].insertedCustomerId;

		return res.status(200).json({
			success: true,
			message: `Customer ${customer_name} was successfully added`,
			customerId: customerId,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: `Error occurred. Please try again.`,
		});
	}
});


module.exports = router;
