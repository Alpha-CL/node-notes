///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Admin = require('../models/Admin'),
	Student = require('../models/Student'),
	Class = require('../models/Class');


/** 操作符: 模糊查询 **/
const {Op} = require('sequelize');

/** 对密码加密 md5 **/
const md5 = require('md5');


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


/** 用于验证某个字符串是否满足某个规则 **/
const validator = require("validator");
/** 用于验证某个对象的树形是否满足某些规则 **/
const validate = require("validate.js");


//-------------------------------------------------------------------------------------------------------------------//


let addAdmin,
	deleteAdmin,
	updateAdmin,
	login,
	getAdminById,
	getStudents;


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//



/**
 * md5          // 加密
 *
 *
 * hash 的一种算法
 */


addAdmin = async function (adminObj, operaterId) {

	// console.log('test');
	// 判断 adminObj 的各种属性是否合理，以及账号是否已存在

	/** 验证规则 **/
	const rule = {
		name: {
			// presence: true,              // 是否必填( 允许为 空字符串 )
			presence: {
				allowEmpty: false,          // 不允许为空字符串
			},
			type: "string",
			length: {
				minimum: 3,
				maximum: 10
			}
		}
		},
		result = validate.validate(adminObj, rule);
	console.log(result);

	// adminObj.loginPwd = md5(adminObj.loginPwd);
	// const ins = await Admin.create(adminObj);
	// return ins.toJSON();
};


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


deleteAdmin = async function (adminId) {

	// method_01
	// const ins = await Admin.findByPk(adminId);      	// 获取实例
	// await ins.destroy();                                // 删除实列

	// method_02
	return await Admin.destroy({
		where: {
			id: adminId
		}
	});
};


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


updateAdmin = async function (adminid, adminObj) {

	// method_01
	// const ins = await Admin.findByPk(adminid);
	// ins.loginId = adminObj.loginId;
	// ins.save();

	// method_02
	return await Admin.update(adminObj, {
		where: {
			id: adminid
		}
	});
};


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


/**
 * 数据查询
 *
 *
 * findOne();               // 查询单个数据
 * findByPK();              // 按照 主键 查询单个数据
 * findAll();               // 查询多个数据
 * count();                 // 查询数量
 * include();               // 包含关系
 */


login = async function (loginId, loginPwd) {

	const result = await Admin.findOne({
		where: {
			loginId,
			loginPwd
		}
	});

	if (result && result.loginId === loginId && result.loginPwd === loginPwd) {

		return result.toJSON();
	}

	return null;
};

getAdminById = async function (id) {

	const result = await Admin.findByPk(id);

	if (result) {

		return result.toJSON();
	}

	return null;
};

getStudents = async function (page = 1, limit = 10, sex = -1, name, attributes) {

	// const result = Student.findAll({
	// 		offset: (page - 1) * limit,
	// 		limit: +limit,
	// 	}),
	// 	total = await Student.count(),
	// 	datas = JSON.parse(JSON.stringify(result));
	//
	// return {
	// 	total,
	// 	datas,
	// };

	const condition = {};

	if (sex !== -1) {
		condition.sex = !!sex;
	}

	if (name) {
		condition.name = {
			[Op.like]: `%${name}%`
		};
	}

	const result = await Student.findAndCountAll({
		attributes: [...attributes],
		include: [Class],
		offset: (page - 1) * limit,
		limit: +limit,
		where: condition,
	});

	return {
		total: result.count,
		datas: JSON.parse(JSON.stringify(result.rows))
	};
};


//-------------------------------------------------------------------------------------------------------------------//


module.exports = {
	addAdmin,
	deleteAdmin,
	updateAdmin,
	login,
	getAdminById,
	getStudents,
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
