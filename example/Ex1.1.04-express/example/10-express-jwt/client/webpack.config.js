if (process.env.NODE_ENV === "production") {
	// production environment config
	module.exports = require("./webpack.pro.config");
} else {
	//// devolopment environment// config
	module.exports = require("./webpack.dev.config");
}
