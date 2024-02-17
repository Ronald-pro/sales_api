const sql = require('mssql');
const db = require('../connection');

const Customer = db.sql.define(
	"dbo.de_person",
	{
		ID: {
			type: sql.Int,
			primaryKey: true,
			autoIncrement: true,
            allowNull: false,
			field: "ID"
		},
		ADDRESS_ID: {
			type: sql.Int,
			field: "ADDRESS_ID"
		},
		NAME: {
			type: sql.NVarChar,
			field: "NAME"
		},
		PHONE: {
			type: sql.NVarChar,
			field: "PHONE"
		}
	},
	{
		timestamps: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		tableName: "dbo.de_person"
	}
);
exports.Customer = Customer;
