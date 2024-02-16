const sequelize = require("../connection");
const Sequelize = require("sequelize");

const Address = sequelize.sequelize.define(
	"dbo.de_address",
	{
		ID: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
            allowNull: false,
			field: "ID"
		},
		CITY: { type: Sequelize.TEXT, field: "CITY" },
		COUNTY: { type: Sequelize.TEXT, field: "COUNTY" }
	},
	{
		timestamps: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		tableName: "dbo.de_address"
	}
);
exports.Address = Address;
