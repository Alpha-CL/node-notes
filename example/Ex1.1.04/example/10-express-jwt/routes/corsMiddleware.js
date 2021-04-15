///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//-------------------------------------------------------------------------------------------------------------------//


const allowOrigins = [
	"http://127.0.0.1:9527",
	"null"
];

module.exports = function (req, res, next) {

	/** 处理预检请求 **/
	if (req.method === "OPTIONS") {

		console.log('[这是一个预检请求]');

		res.header(
			"access-control-allow-origin",
			req.headers.origin
		);

		res.header(
			`Access-Control-Allow-Methods`,
			req.headers['access-control-request-method']
		);

		res.header(
			`Access-Control-Allow-Headers`,
			req.headers['access-control-request-headers']
		);

		// 解决附带身份凭证的请求
		res.header("Access-Control-Allow-Credentials", true);

		// console.log(req.headers.origin);
		// console.log(req.headers['access-control-request-method']);
		// console.log(req.headers['access-control-request-headers']);
	}

	/** 处理简单请求 **/
	if ("origin" in req.headers && allowOrigins.includes(req.headers.origin)) {
		res.header("access-control-allow-origin", req.headers.origin);
	}

	next();
};


//-------------------------------------------------------------------------------------------------------------------//


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////