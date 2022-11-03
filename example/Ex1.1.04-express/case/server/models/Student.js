const sequelize = require("./db"),
	{DataTypes} = require("sequelize");

const Student = sequelize.define(
	"student",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: false
		},
		sex: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		mobile: {
			type: DataTypes.STRING(11),
			allowNull: false
		},
	},
	{paranoid: true}
);

module.exports = Student;
