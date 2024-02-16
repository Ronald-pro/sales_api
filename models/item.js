const sequelize = require("../connection");
const Sequelize = require("sequelize");

const Item = sequelize.sequelize.define(
	"dbo.de_item",
	{
		ITEM_ID: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
            allowNull: false,
			field: "ITEM_ID"
		},
		CLASS_NAME: {
			type: Sequelize.TEXT,
			field: "CLASS_NAME"
		},
		DESCRIPTION: {
			type: Sequelize.TEXT,
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
