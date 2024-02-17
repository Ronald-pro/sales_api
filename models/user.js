// const db = require("../connection");
// const { DataTypes } = require("sequelize");

// const User = db.sql.define(
// 	"dbo.me_users",
// 	{
// 		USER_ID: {
// 			type: db.sql.Int,
// 			primaryKey: true,
// 			autoIncrement: true,
// 			allowNull: false,
// 			field: "USER_ID"
// 		},
// 		USERNAME: {
// 			type: db.sql.NVarChar,
// 			field: "USERNAME"
// 		},
// 		PASSWORD2: {
// 			type: db.sql.NVarChar,
// 			field: "PASSWORD2"
// 		}
// 	},
// 	{
// 		timestamps: false,
// 		paranoid: true,
// 		underscored: true,
// 		freezeTableName: true,
// 		tableName: "dbo.me_users"
// 	}
// );

// module.exports = User;
