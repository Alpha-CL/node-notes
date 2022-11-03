///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const {getErr} = require('../utilities/formatSendResult'),
	{pathToRegexp} = require('path-to-regexp'),
	{cryptor} = require('../../utilities'),
	jwt = require('../jwt');


//-------------------------------------------------------------------------------------------------------------------//


const needTokenApi = [
	{method: "POST", path: 'api/student/'},
	{method: "PUT", path: 'api/student/:id'},
	{method: "GET", path: 'api/admin/whoami'},
	// {method: 'GET', path: 'api/student'}
];

module.exports = (req, res, next) => {

	const apis = needTokenApi.filter(api => {

		const reg = pathToRegexp(api.path);

		return api.method === req.method && reg.test(req.path);
	});

	if (apis.length === 0) {

		next();
		return;
	}

	const result = jwt.verify(req);

	if (result) {

		req.userId = resule.id;
		next();

	} else {

		handleNonToken(req, res, next);
	}


	// if (req.session.loginUser) {
	//
	// 	// 说明已经通过
	// 	next();
	//
	// } else {
	//
	// 	handleNonToken(req, res, next);
	// }
	//
	// console.log(req.session);

	// let token = req.cookies.token;
	//
	// console.log(req.cookies);
	//
	// if (!token) {
	//
	// 	token = req.headers.authorization;
	// }
	//
	// if (!token) {
	//
	// 	// 未认证
	// 	handleNonToken(req, res, next);
	// 	console.log('[认证未通过]')
	//
	// 	return;
	// }
	//
	// console.log('[认证通过]')
	//
	// const userId = cryptor.decrypt(token);
	// console.log(userId);
	// req.userId = userId;
	//
	// next();

};


// 处理未认证的情况
function handleNonToken() {

	res
		.status(403)
		.set(getErr("you don\'t have any token to access the api )"));
}


//-------------------------------------------------------------------------------------------------------------------//





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
