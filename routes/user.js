const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sql = require("mssql");

const router = express.Router();

const crypto = require("crypto");

const generateRandomKey = () => {
	return crypto.randomBytes(32).toString("hex"); // 32 bytes converted to a hexadecimal string
};

const secretKey = generateRandomKey();

console.log("Generated Secret Key:", secretKey);

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Connect to the database using mssql
		const pool = await sql.connect(); 

		// Retrieve user
		const result = await pool
			.request()
			.query(
				`SELECT * FROM dbo.your_user_table WHERE USERNAME = '${username}'`
			);

		const user = result.recordset[0];

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Compare the provided password with the hashed password in the database
		const passwordMatch = await bcrypt.compare(password, user.PASSWORD2);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// JWT token
		const token = jwt.sign(
			{
				userId: user.USER_ID,
				username: user.USERNAME
			},
			secretKey,
			{ expiresIn: "1h" }
		);

		res.json({ token });
	} catch (error) {
		console.error("Error during authentication:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
