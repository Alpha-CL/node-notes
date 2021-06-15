///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require('express'),
	router = express.Router(),
	admnServ = require('../../services/adminService'),
	{ asyncHandler} = require('../getSendResult'),
	cryptor = require('../../util/crypt');


//-------------------------------------------------------------------------------------------------------------------//


router.post(
	'/login',
	asyncHandler(async (req, res) => {

		// console.log('test');
		// console.log(req.body.loginId, req.body.loginPwd);

		const result = await admnServ.login(req.body.loginId, req.body.loginPwd);

		if (result) {

			// let value = result.id;
			// value = cryptor.encrypt(value.toString());
			// res.cookie('token', value, {
			// 	path: '/',
			// 	domain: 'localhost',
			// 	maxAge: 7 * 24 * 3600 * 1000,
			// 	httpOnly: true,
			// });
			// res.header('authorization', value);

			// console.log(req.session);
			req.session.loginUser = result;
		}

		return result;
	})
);


//-------------------------------------------------------------------------------------------------------------------//


module.exports = router;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
