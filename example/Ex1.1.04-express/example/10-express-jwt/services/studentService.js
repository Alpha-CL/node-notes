///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Student = require("../models/Student"),
	{Op} = require("sequelize"),
	Class = require("../models/Class"),
	validate = require("validate.js"),
	moment = require("moment"),
	{pick} = require("../util");


//-------------------------------------------------------------------------------------------------------------------//

exports.getAllStudents = async function () {
	return Student.findAll();
};

exports.getStudents = async function (page = 1, limit = 10, sex = -1, name = "") {
	// const results = await Student.findAll({
	//   offset: (page - 1) * limit,
	//   limit: +limit,
	// });
	// const total = await Student.count()
	// const datas = JSON.parse(JSON.stringify(results));
	// return {
	//   total,
	//   datas
	// }

	const where = {};

	if (sex !== -1) {
		where.sex = !!sex;
	}

	if (name) {
		where.name = {
			[Op.like]: `%${name}%`,
		};
	}

	// sex !== -1 && (where.sex = !!sex);
	// name && (where.name = {[Op.like]: `%${name}%`});

	const result = await Student.findAndCountAll({
		attributes: ["id", "name", "sex", "birthday", "age"],
		where,
		include: [Class],
		offset: (page - 1) * limit,
		limit: +limit,
	});
	return {
		total: result.count,
		datas: JSON.parse(JSON.stringify(result.rows)),
	};
};

exports.getStudentById = async function (id) {
	const result = await Student.findByPk(id);
	return result ? result.toJSON() : null;
};

exports.addStudent = async function (stuObj) {
	stuObj = pick(stuObj, "name", "birthday", "sex", "mobile", "ClassId");
	validate.validators.classExits = async function (value) {
		const c = await Class.findByPk(value);
		if (c) {
			return;
		}
		return "is not exist";
	};

	const rule = {
		//验证规则
		name: {
			presence: {
				allowEmpty: false,
			},
			type: "string",
			length: {
				minimum: 1,
				maximum: 10,
			},
		},
		birthday: {
			presence: {
				allowEmpty: false,
			},
			datetime: {
				dateOnly: true,
				earliest: +moment.utc().subtract(100, "y"),
				latest: +moment.utc().subtract(5, "y"),
			},
		},
		sex: {
			presence: true,
			type: "boolean",
		},
		mobile: {
			presence: {
				allowEmpty: false,
			},
			format: /1\d{10}/,
		},
		ClassId: {
			presence: true,
			numericality: {
				onlyInteger: true,
				strict: false,
			},
			classExits: true,
		},
	};

	await validate.async(stuObj, rule);
	const ins = await Student.create(stuObj);
	return ins.toJSON();
};

exports.deleteStudent = async function (id) {
	return await Student.destroy({
		where: {id},
	});
};

exports.updateStudent = async function (id, obj) {
	return await Student.update(obj, {
		where: {
			id
		},
	});
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////