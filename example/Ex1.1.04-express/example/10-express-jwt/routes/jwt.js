///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const jwt = require('jsonwebtoken');


//-------------------------------------------------------------------------------------------------------------------//


const cookieKey = "token",
	secrect = "personal_key";

exports.publish = function (
	res,
	maxAge = 3600 * 24,
	info = {}
) {

	const token = jwt.sign(
		info,
		secrect,
		{expiresIn: maxAge}
	);

	// 添加到 cookie
	// res.cookie(cookieKey, token, {
	// 	maxAge: maxAge * 1000,
	// 	path: '/',
	// });

	// 添加其他传输
	res.header('authorization', token);
};


exports.verify = function (req) {

	let token;

	// token = req.cookies[cookieKey];
	//
	// if (!token) {

	token = req.headers.authorization;

	if (!token) {

		return null;
	}

	token = token.split(" ");
	token = token.length === 1 ? token[0] : token[1];

	// }

	try {

		return jwt.verify(token, secrect);

	} catch (err) {

		return null;
	}
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
