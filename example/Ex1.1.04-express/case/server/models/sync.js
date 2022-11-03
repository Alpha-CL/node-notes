require("./Student.js");
const sequelize = require("./db.js");

sequelize
	.sync({alter: true})
	.then(() => {
		console.log("orm: all models are updated");
	});

// Test whether the database is successfully connected
(async function () {
	try {
		await sequelize.authenticate();
		console.log("orm: connection has been established successfully.");
	} catch (error) {
		console.error("orm: unable to connect to the database:", error);
	}
}());