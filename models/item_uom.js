const sequelize = require("../connection");
const Sequelize = require("sequelize");

const Item_UOM = sequelize.sequelize.define(
	"dbo.de_item_uom",
	{
		ID: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
            allowNull: false,
			field: "ID"
		},
		ITEM_ID: {
			type: Sequelize.INTEGER,
			field: "ITEM_ID"
		},
		PRICE: {
			type: Sequelize.DOUBLE,
			field: "PRICE"
		},
        COST: {
			type: Sequelize.DOUBLE,
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
