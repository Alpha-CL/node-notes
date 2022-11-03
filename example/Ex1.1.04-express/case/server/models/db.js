const { Sequelize } = require("sequelize"),
	{sqlLogger} = require("../logger"),
	mysql = require("../conf/mysql.json");

const sequelize = new Sequelize(
	mysql.database,
	mysql.username,
	mysql.password,
	{
		host: mysql.host,
		dialect: mysql["database_type"],
		logging: msg => {
			sqlLogger.debug(msg);
		},
	}
);

module.exports = sequelize;
