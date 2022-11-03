const {apiLogger} = require("../../logger"),
	log4js = require("log4js");

module.exports = log4js.connectLogger(apiLogger, {
	level: "auto"
});


// module.exports = (req, res, next) => {
//
// 	next();
// 	apiLogger.debug(`${req.method}`)
// };

