const sql = require("mssql");
require("dotenv").config();

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	options: {
		encrypt: true,
		trustServerCertificate: true // Use this option if you're connecting to Azure SQL Database
	},
	port: parseInt(process.env.DB_PORT) || 1433,
	connectionTimeout: 30000
};

const pool = new sql.ConnectionPool(config);

const connect = async () => {
	try {
		await pool.connect();
		console.log("Connection has been established successfully.");
	} catch (err) {
		console.error("Unable to connect to the database:", err.message);
	}
};

const db = {
	sql: sql,
	pool: pool,
	connect: connect
};

module.exports = db;
