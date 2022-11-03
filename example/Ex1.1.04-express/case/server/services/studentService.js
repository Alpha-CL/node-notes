const Student = require("../models/Student"),
	{Op} = require("sequelize"),		// 操作符模糊查询
	md5 = require("md5"),				// 密码加密
	validate = require("validate.js");	// 验证单个 对象树

exports.getAllStudents = async function () {
	return await Student.findAll();
};

exports.getStudentsByCondition = async function(page = 1, limit = 10, sex = -1, name = "") {
	const where = {};
	sex !== -1 && (where.sex = !!sex);
	name && (where.name = {[Op.like]: `%${name}%`});
	const result = await Student.findAndCountAll({
		attributes: ["id", "name", "sex", "birthday"],
		where,
		limit: +limit,
		offset: (page - 1) * limit,
		// include: [],
	});
	return {
		total: result.count,
		data: JSON.parse(JSON.stringify(result.rows)),
	};
};

exports.getStudentById = async function (id) {
	const result = await Student.findByPk(id);
	return result ? result.toJSON() : null;
};

exports.addStudent = async function(reqBody) {
	const ins = await Student.create(reqBody);
	return ins.toJSON();
};

exports.deleteStudent = async function(id) {
	return await Student.destroy({
		where: {id},
	});
};

exports.updateStudent = async function(id, reqBody) {
	return await Student.update(reqBody, {
		where: {id},
	});
};
