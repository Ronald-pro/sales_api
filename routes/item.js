const express = require("express");
const router = express.Router();
const { sql, pool } = require("../connection");
const { v4: uuidv4 } = require("uuid");

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
            di.ITEM_ID,
            di.DESCRIPTION as Item_name,
            diu.COST,
            diu.PRICE,
			diu.UOM_ID as UOM,
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

// post orders
// router.post("/add/order", async (req, res) => {
// 	try {
// 		await pool.connect(); // connection

// 		let orderUID = uuidv4();
// 		let customer_name = req.body.customer_name;
// 		let branch_id = req.body.branch_id;
// 		let number = req.body.number;
// 		let total_amount = req.body.total_amount;
// 		const companyId = 1;
// 		let class_name = "CDEGRN";
// 		const doc_status_id = 2;
// 		let status = 1;
// 		let item_id = req.body.item_id;
// 		let item_name = req.body.item_name;
// 		let price = req.body.price;
// 		let uom = req.body.uom;
// 		let qty = req.body.qty;
// 		let date = new Date();
// 		let customer_address_line = " ";
// 		let ship_address_line = " ";
// 		let terms = req.body.terms;
// 		let ship_via_id = 6;

// 		// Create order document record
// 		const documentResult = await pool
// 			.request()
// 			.input("BRANCH_ID", sql.Int, branch_id)
// 			.input("NUMBER", sql.NVarChar, number)
// 			.input("TOTAL_AMOUNT", sql.Decimal, total_amount)
// 			.input("CLASS_NAME", sql.NVarChar, class_name)
// 			.input("DOC_STATUS_ID", sql.Int, doc_status_id)
// 			.input("STATUS", sql.Int, status)
// 			.input("UID", sql.NVarChar, orderUID)
// 			.input("COMPANY_ID", sql.Int, companyId)
// 			.input("DATE", sql.Date, date)

// 			.query(
// 				"INSERT INTO dbo.de_document (BRANCH_ID, NUMBER, TOTAL_AMOUNT, CLASS_NAME, DOC_STATUS_ID, STATUS, UID, COMPANY_ID, DATE) VALUES (@BRANCH_ID, @NUMBER, @TOTAL_AMOUNT, @CLASS_NAME, @DOC_STATUS_ID, @STATUS, @UID, @COMPANY_ID, @DATE); SELECT SCOPE_IDENTITY() AS insertedocument",
// 				{}
// 			);

// 		const documentId = documentResult.recordset[0].insertedocument;

// 		// Create order record
// 		const orderResult = await pool
// 			.request()
// 			.input("DOCUMENT_ID", sql.Int, documentId)
// 			.input("CUSTOMER_NAME", sql.NVarChar, customer_name)
// 			.input("UID", sql.NVarChar, orderUID)
// 			.input("STATUS", sql.Int, status)
// 			.input("CUSTOMER_ADDRESS_LINE", sql.Int, customer_address_line)
// 			.input("SHIP_TO_ADDRESS_LINE", sql.Int, ship_address_line)
// 			.input("TERMS_ID", sql.Int, terms)
// 			.input("SHIP_VIA_ID", sql.Int, ship_via_id)

// 			.query(
// 				"INSERT INTO dbo.de_so (DOCUMENT_ID, CUSTOMER_NAME, UID, STATUS, CUSTOMER_ADDRESS_LINE, SHIP_TO_ADDRESS_LINE, TERMS_ID, SHIP_VIA_ID) VALUES (@DOCUMENT_ID, @CUSTOMER_NAME, @UID, @STATUS, @CUSTOMER_ADDRESS_LINE, @SHIP_TO_ADDRESS_LINE, @TERMS_ID, @SHIP_VIA_ID); SELECT SCOPE_IDENTITY() AS insertedOrder",
// 				{
// 					DOCUMENT_ID: sql.Int
// 				}
// 			);

// 		const orderId = orderResult.recordset[0].insertedOrder;

// 		// Create order details record
// 		const orderdetailResult = await pool
// 			.request()
// 			.input("SO_ID", sql.Int, orderId)
// 			.input("ITEM_ID", sql.Int, item_id)
// 			.input("ITEM_DESCRIPTION", sql.NVarChar, item_name)
// 			.input("QTY", sql.Decimal, qty)
// 			.input("PRICE", sql.Decimal, price)
// 			.input("UOM_ID", sql.NVarChar, uom)
// 			.input("BRANCH_ID", sql.Int, branch_id)
// 			.query(
// 				"INSERT INTO dbo.de_so_detail (SO_ID, ITEM_ID, ITEM_DESCRIPTION, QTY, PRICE, UOM_ID, BRANCH_ID) VALUES (@SO_ID, @ITEM_ID, @ITEM_DESCRIPTION, @QTY, @PRICE, @UOM_ID, @BRANCH_ID); SELECT SCOPE_IDENTITY() AS insertedOrderdetail",
// 				{
// 					SO_ID: sql.Int,
// 					ITEM_ID: sql.Int,
// 					BRANCH_ID: sql.Int
// 				}
// 			);

// 		const orderdetailId = orderdetailResult.recordset[0].insertedOrderdetail;

// 		return res.status(200).json({
// 			success: true,
// 			message: `Order Receipt No: ${orderId} was successfully created`,
// 			Receipt_no: orderId
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).json({
// 			success: false,
// 			message: `Error occurred. Please try again.`
// 		});
// 	}
// });

router.post("/add/order", async (req, res) => {
	try {
		await pool.connect(); // connection

		let orderUID = uuidv4();
		let customer_name = req.body.customer_name;
		let branch_id = req.body.branch_id;
		let number = req.body.number;
		let total_amount = req.body.total_amount;
		const companyId = 1;
		let class_name = "CDEGRN";
		const doc_status_id = 2;
		let status = 1;

		let date = new Date();
		let customer_address_line = " ";
		let ship_address_line = " ";
		let ship_via_id = 6;
		let sys_owner = "SHOP";

		// Ensure terms is provided in the request payload
		let terms = req.body.cart_items[0].terms;
		let item_id = req.body.cart_items[0].item_id;
		let item_name = req.body.cart_items[0].item_name;
		let price = req.body.cart_items[0].price;
		let uom = req.body.cart_items[0].uom;
		let qty = req.body.cart_items[0].qty;
		if (!terms) {
			return res.status(400).json({
				success: false,
				message: "Terms not provided."
			});
		}

		// Calculate total_amount based on cart_items
		const cartItems = req.body.cart_items;
		let calculatedTotal = 0;
		cartItems.forEach((item) => {
			calculatedTotal += item.price * item.qty;
		});

		if (total_amount !== calculatedTotal) {
			return res.status(400).json({
				success: false,
				message: `Total amount provided does not match calculated total.`
			});
		}

		// Create order document record
		const documentResult = await pool
			.request()
			.input("BRANCH_ID", sql.Int, branch_id)
			.input("NUMBER", sql.NVarChar, number)
			.input("TOTAL_AMOUNT", sql.Decimal, total_amount)
			.input("CLASS_NAME", sql.NVarChar, class_name)
			.input("DOC_STATUS_ID", sql.Int, doc_status_id)
			.input("STATUS", sql.Int, status)
			.input("UID", sql.NVarChar, orderUID)
			.input("COMPANY_ID", sql.Int, companyId)
			.input("DATE", sql.Date, new Date())
			.query(
				"INSERT INTO dbo.de_document (BRANCH_ID, NUMBER, TOTAL_AMOUNT, CLASS_NAME, DOC_STATUS_ID, STATUS, UID, COMPANY_ID, DATE) VALUES (@BRANCH_ID, @NUMBER, @TOTAL_AMOUNT, @CLASS_NAME, @DOC_STATUS_ID, @STATUS, @UID, @COMPANY_ID, @DATE); SELECT SCOPE_IDENTITY() AS insertedocument",
				{}
			);

		const documentId = documentResult.recordset[0].insertedocument;

		// Create order record
		const orderResult = await pool
			.request()
			.input("DOCUMENT_ID", sql.Int, documentId)
			.input("CUSTOMER_NAME", sql.NVarChar, customer_name)
			.input("UID", sql.NVarChar, orderUID)
			.input("STATUS", sql.Int, status)
			.input("CUSTOMER_ADDRESS_LINE", sql.Int, customer_address_line)
			.input("SHIP_TO_ADDRESS_LINE", sql.Int, ship_address_line)
			.input("TERMS_ID", sql.Int, terms)
			.input("SHIP_VIA_ID", sql.Int, ship_via_id)

			.query(
				"INSERT INTO dbo.de_so (DOCUMENT_ID, CUSTOMER_NAME, UID, STATUS, CUSTOMER_ADDRESS_LINE, SHIP_TO_ADDRESS_LINE, TERMS_ID, SHIP_VIA_ID) VALUES (@DOCUMENT_ID, @CUSTOMER_NAME, @UID, @STATUS, @CUSTOMER_ADDRESS_LINE, @SHIP_TO_ADDRESS_LINE, @TERMS_ID, @SHIP_VIA_ID); SELECT SCOPE_IDENTITY() AS insertedOrder",
				{
					DOCUMENT_ID: sql.Int
				}
			);

		const orderId = orderResult.recordset[0].insertedOrder;

		// Create order details records
		for (const item of cartItems) {
			await pool
				.request()
				.input("SO_ID", sql.Int, orderId)
				.input("ITEM_ID", sql.Int, item.item_id)
				.input("ITEM_DESCRIPTION", sql.NVarChar, item.item_name)
				.input("QTY", sql.Decimal, item.qty)
				.input("PRICE", sql.Decimal, item.price)
				.input("UOM_ID", sql.NVarChar, item.uom)
				.input("BRANCH_ID", sql.Int, branch_id)
				.query(
					"INSERT INTO dbo.de_so_detail (SO_ID, ITEM_ID, ITEM_DESCRIPTION, QTY, PRICE, UOM_ID, BRANCH_ID) VALUES (@SO_ID, @ITEM_ID, @ITEM_DESCRIPTION, @QTY, @PRICE, @UOM_ID, @BRANCH_ID);",
					{
						SO_ID: sql.Int,
						ITEM_ID: sql.Int,
						BRANCH_ID: sql.Int
					}
				);
		}

		// decrease stock
		for (const item of cartItems) {
			const reduceStockResult = await pool
				.request()
				.input("DOCUMENT_ID", sql.Int, documentId)
				.input("OUT_QTY", sql.Decimal, item.qty)
				.input("UID", sql.NVarChar, orderUID)
				.input("COMPANY_ID", sql.Int, companyId)
				.input("TOTAL_COST", sql.Decimal, calculatedTotal)
				.input("STATUS", sql.Int, status)
				.input("SYS_OWNER", sql.NVarChar, sys_owner)
				.input("ITEM_ID", sql.Int, item.item_id)
				.input("UOM_ID", sql.NVarChar, item.uom)
				.input("BRANCH_ID", sql.Int, branch_id)

				.query(
					"INSERT INTO dbo.de_icj (DOCUMENT_ID, OUT_QTY, UID, COMPANY_ID, TOTAL_COST, STATUS, SYS_OWNER, ITEM_ID, UOM_ID, BRANCH_ID) VALUES (@DOCUMENT_ID, @OUT_QTY, @UID, @COMPANY_ID, @TOTAL_COST, @STATUS, @SYS_OWNER, @ITEM_ID, @UOM_ID, @BRANCH_ID); SELECT SCOPE_IDENTITY() AS insertedOrder",
					{
						DOCUMENT_ID: sql.Int
					}
				);

			const reduceStockId = reduceStockResult.recordset[0].insertedOrder;
		}
		return res.status(200).json({
			success: true,
			message: `Order Receipt No: ${orderId} was successfully created`,
			Receipt_no: orderId
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: `Error occurred. Please try again.`
		});
	}
});

router.get("/payment/terms", async (req, res) => {
	try {
		const results = await pool.request().query(`
		SELECT * FROM dbo.de_terms
		`);
		return res.json({
			success: true,
			message: "Payment Terms retrieved successfully.",
			data: results.recordset
		});
	} catch (error) {
		console.error("Error retrieving payment terms:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error"
		});
	}
});

router.get("/all/ordersss", async (req, res) => {
	try {
		const results = await pool.request().query(`

        SELECT ds.CUSTOMER_NAME as customer_name, dd.TOTAL_AMOUNT as total_amount, ds.DATE_CREATED as date_created FROM dbo.de_document dd
        LEFT JOIN dbo.de_so ds ON dd.DOCUMENT_ID = ds.DOCUMENT_ID
		`);
		return res.json({
			success: true,
			message: "Orders retrieved successfully.",
			data: results.recordset
		});
	} catch (error) {
		console.error("Error retrieving orders:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error"
		});
	}
});

router.get('/all/orderss', async (req, res) => {
    try {

        await pool.connect();

        //  all orders
        const orderQuery = `
            SELECT
                dso.CUSTOMER_NAME AS customer_name,
                doc.BRANCH_ID AS branch_id,
                db.DESCRIPTION as branch_name,
                doc.NUMBER AS number,
                doc.TOTAL_AMOUNT AS total_amount,
                dso.DATE_CREATED as date_created,
                dso.TERMS_ID AS terms,
                dsd.ITEM_ID AS item_id,
                dsd.ITEM_DESCRIPTION AS item_name,
                dsd.PRICE AS price,
                dsd.QTY AS qty,
                dsd.UOM_ID AS uom
            FROM dbo.de_so AS dso
            JOIN dbo.de_document AS doc ON dso.DOCUMENT_ID = doc.DOCUMENT_ID
            JOIN dbo.de_so_detail AS dsd ON dso.SO_ID = dsd.SO_ID
            JOIN dbo.de_branch db ON dsd.BRANCH_ID = db.ID
            WHERE dso.DATE_CREATED >= DATEADD(month, -1, GETDATE())
            ORDER BY dso.DATE_CREATED;
        `;

        //all orders
        const ordersResult = await pool.request().query(orderQuery);

        // map of orders
        const ordersMap = new Map();

        ordersResult.recordset.forEach(order => {
            const {
                customer_name,
                branch_id,
                branch_name,
                number,
                total_amount,
                date_created,
                terms,
                item_id,
                item_name,
                price,
                qty,
                uom
            } = order;

            // Check if the order already exists in the map
            if (!ordersMap.has(number)) {
                // If not, create a new order object
                ordersMap.set(number, {
                    customer_name,
                    branch_id,
                    branch_name,
                    number,
                    total_amount,
                    date_created,
                    items: []
                });
            }

            // Add item details to the order's items array
            ordersMap.get(number).items.push({
                item_id,
                item_name,
                price,
                qty,
                uom,
                terms
            });
        });

        // Convert the map values to an array
        const orders = Array.from(ordersMap.values());

        // Send the JSON response
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Error occurred. Please try again.`
        });
    }
});

router.get('/all/orders', async (req, res) => {
    try {
        // Connect to the database
        await pool.connect();

        // Query to get all orders with item details
        const orderQuery = `
            SELECT
                dso.CUSTOMER_NAME AS customer_name,
                doc.BRANCH_ID AS branch_id,
                db.DESCRIPTION as branch_name,
                doc.NUMBER AS number,
                doc.TOTAL_AMOUNT AS total_amount,
                dso.DATE_CREATED as date_created,
                dso.TERMS_ID AS terms,
                dsd.ITEM_ID AS item_id,
                dsd.ITEM_DESCRIPTION AS item_name,
                dsd.PRICE AS price,
                dsd.QTY AS qty,
                dsd.UOM_ID AS uom
            FROM dbo.de_so AS dso
            JOIN dbo.de_document AS doc ON dso.DOCUMENT_ID = doc.DOCUMENT_ID
            JOIN dbo.de_so_detail AS dsd ON dso.SO_ID = dsd.SO_ID
            JOIN dbo.de_branch db ON doc.BRANCH_ID = db.ID
            WHERE dso.DATE_CREATED >= DATEADD(month, -1, GETDATE())
            ORDER BY dso.DATE_CREATED;
        `;

        // Execute the query
        const ordersResult = await pool.request().query(orderQuery);

        // Map orders by order number
        const ordersMap = new Map();

        ordersResult.recordset.forEach(order => {
            const {
                customer_name,
                branch_id,
                branch_name,
                number,
                total_amount,
                date_created,
                terms,
                item_id,
                item_name,
                price,
                qty,
                uom
            } = order;

            // Check if the order already exists in the map
            if (!ordersMap.has(number)) {
                // If not, create a new order object
                ordersMap.set(number, {
                    customer_name,
                    branch_id,
                    branch_name,
                    number,
                    total_amount,
                    date_created,
                    terms,
                    items: []
                });
            }

            // Retrieve the order object from the map
            const existingOrder = ordersMap.get(number);

            // Add item details to the order's items array
            existingOrder.items.push({
                item_id,
                item_name,
                price,
                qty,
                uom,
                terms
            });

            // Update the order object in the map
            ordersMap.set(number, existingOrder);
        });

        // Convert the map values to an array of orders
        const orders = Array.from(ordersMap.values());

        // Send the JSON response with the orders array
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({
            success: false,
            message: `Error occurred. Please try again.`
        });
    }
});


module.exports = router;
