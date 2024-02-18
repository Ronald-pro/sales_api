const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sql, pool, connect } = require("../connection");

const router = express.Router();

const crypto = require("crypto");

const generateRandomKey = () => {
	return crypto.randomBytes(32).toString("hex");
};

const secretKey = generateRandomKey();


router.post("/login", async (req, res) => {
	await connect();

	const { username, password } = req.body;

	try {
		// Retrieve user
		const result = await pool
			.request()
			.query(`SELECT * FROM dbo.me_users WHERE USERNAME = '${username}'`);

		const user = result.recordset[0];

		if (!user) {
			console.log("User not found:", username);
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Compare the provided password with the hashed password in the database
		const passwordMatch = await bcrypt.compare(password, user.PASSWORD);

		console.log("Provided Password:", password);
		console.log("Stored Hashed Password:", user.PASSWORD);

		if (!passwordMatch) {
			console.log("Incorrect password for user:", username);
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

		console.log("Login successful for user:", username);
		res.json({ success: true, message: "Login successful", token });
	} catch (error) {
		console.error("Error during authentication:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

module.exports = router;
