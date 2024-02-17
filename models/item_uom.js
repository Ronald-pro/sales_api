const sql = require('mssql');
const db = require('../connection');

const Item_UOM = db.sql.define(
	"dbo.de_item_uom",
	{
		ID: {
			type: sql.Int,
			primaryKey: true,
			autoIncrement: true,
            allowNull: false,
			field: "ID"
		},
		ITEM_ID: {
			type: sql.Int,
			field: "ITEM_ID"
		},
		PRICE: {
			type: sql.DOUBLE,
			field: "PRICE"
		},
        COST: {
			type: sql.DOUBLE,
			field: "COST"
		}
	},
	{
		timestamps: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		tableName: "dbo.de_item_uom"
	}
);
exports.Item_UOM = Item_UOM;
