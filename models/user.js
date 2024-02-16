const sequelize = require("../connection");
const Sequelize = require("sequelize");

const User = sequelize.sequelize.define(
	"dbo.me_users",
	{
		USER_ID: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			field: "USER_ID"
		},
		USERNAME: {
			type: Sequelize.TEXT,
			field: "USERNAME"
		},
		PASSWORD2: {
			type: Sequelize.TEXT,
			field: "PASSWORD2"
		}
	},
	{
		timestamps: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		tableName: "dbo.me_users"
	}
);
exports.User = User;
