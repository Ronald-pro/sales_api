const sequelize = require("../connection");
const Sequelize = require("sequelize");

const Customer = sequelize.sequelize.define(
	"dbo.de_person",
	{
		ID: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
            allowNull: false,
			field: "ID"
		},
		ADDRESS_ID: {
			type: Sequelize.INTEGER,
			field: "ADDRESS_ID"
		},
		NAME: {
			type: Sequelize.TEXT,
			field: "NAME"
		},
		PHONE: {
			type: Sequelize.TEXT,
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
