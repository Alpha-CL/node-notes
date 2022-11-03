const getMsg = require("../utilities/formatSendResult");

module.exports = (err, req, res, next) => {
	if (err) {
		const errObj = err instanceof Error ? err.message : err;
		res.status(500).send(getMsg.getErr(errObj));
	} else {
		next();
	}
};
