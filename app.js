const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { pool } = require("./connection");

const customers = require("./routes/customer");
const users = require("./routes/user");
const items = require("./routes/item");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

pool.connect().then(() => {
		app.use("/api/customer", customers);
		app.use("/api/user", users);
		app.use("/api", items);

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error.message);
	});
