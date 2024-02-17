const sql = require('mssql');
const db = require('../connection');

const Address = db.sql.define(
  'dbo.de_address',
  {
    ID: {
      type: sql.Int,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'ID',
    },
    CITY: { type: sql.NVarChar, field: 'CITY' },
    COUNTY: { type: sql.NVarChar, field: 'COUNTY' },
  },
  {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'dbo.de_address',
  }
);

exports.Address = Address;
