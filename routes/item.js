const express = require("express");
const router = express.Router();
const { pool } = require("../connection");

router.get("/items", async (req, res) => {
	try {
		// asynchronously
		const results = await processQueryAsync();

		res.json(results);
	} catch (error) {
		console.error("Error retrieving items:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// asynchronously
async function processQueryAsync() {
	try {
		const result = await pool.request().query(`
            SELECT
            di.DESCRIPTION as Item_name,
            diu.COST,
            diu.PRICE,
            db.DESCRIPTION as Branch_name,
            db.CODE
        FROM dbo.de_item di
        JOIN dbo.de_item_uom diu ON di.ITEM_ID = diu.ITEM_ID
        JOIN dbo.de_item_branch dib ON di.ITEM_ID = dib.ITEM_ID
        JOIN dbo.de_branch db ON dib.BRANCH_ID = db.ID
        `);

		return result.recordset;
	} catch (error) {
		console.error("Error processing query:", error.message);
	
		throw error;
	}
}

module.exports = router;
