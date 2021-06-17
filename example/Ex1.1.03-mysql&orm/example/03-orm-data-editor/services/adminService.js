///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Admin = require('../models/Admin');


//-------------------------------------------------------------------------------------------------------------------//


let addAdmin,
	deleteAdmin,
	updateAdmin;

addAdmin = async function (adminObj, operatorId) {

	console.log('test');

	// 判断 adminObj 的各种属性是否合理，以及账号是否已存在

	const ins = await Admin.create(adminObj);

	return ins.toJSON();
};

deleteAdmin = async function (adminId) {

	// method_01
	// const ins = await Admin.findByPk(adminId);      	   // 获取实例
	// await ins.destroy();                                // 删除实列

	// method_02
	return await Admin.destroy({
		where: {
			id: adminId
		}
	});
};

updateAdmin = async function (adminId, adminObj) {

	// method_01
	// const ins = await Admin.findByPk(adminId);
	// ins.loginId = adminObj.loginId;
	// ins.save();

	// method_02
	return await Admin.update(adminObj, {
		where: {
			id: adminId
		}
	});
};


//-------------------------------------------------------------------------------------------------------------------//


module.exports = {

	addAdmin,
	deleteAdmin,
	updateAdmin
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
