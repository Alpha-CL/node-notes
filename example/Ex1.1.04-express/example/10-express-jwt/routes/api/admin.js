///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require('express'),
	router = express.Router(),
	adminServ = require('../../services/adminService'),
	{ asyncHandler} = require('../util/getSendResult'),
	cryptor = require('../../util/crypt'),
	jwt = require('../jwt');


//-------------------------------------------------------------------------------------------------------------------//


router.post(
	'/login',
	asyncHandler(async (req, res) => {

		// console.log('test');
		// console.log(req.body.loginId, req.body.loginPwd);
		const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
		if (result) {

			let value = result.id;

			// value = cryptor.encrypt(value.toString());
			// res.cookie('token', value, {
			// 	path: '/',
			// 	domain: 'localhost',
			// 	maxAge: 7 * 24 * 3600 * 1000,
			// 	httpOnly: true,
			// });
			// res.header('authorization', value);

			// console.log(req.session);

			// req.session.loginUser = result;

			jwt.publish(res, undefined, {id: value})

		}
		return result;
	})
);


router.get(
	'/whoami',
	asyncHandler(async (req, res) => {

		console.log('test');

		return await adminServ.getAdminById(req.userId);
}));


//-------------------------------------------------------------------------------------------------------------------//


module.exports = router;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
