const sql = require('mssql');
const db = require('../connection');

const Item = db.sql.define(
	"dbo.de_item",
	{
		ITEM_ID: {
			type: sql.Int,
			primaryKey: true,
			autoIncrement: true,
            allowNull: false,
			field: "ITEM_ID"
		},
		CLASS_NAME: {
			type: sql.NVarChar,
			field: "CLASS_NAME"
		},
		DESCRIPTION: {
			type: sql.NVarChar,
			field: "DESCRIPTION"
		}
	},
	{
		timestamps: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		tableName: "dbo.de_item"
	}
);
exports.Item = Item;
