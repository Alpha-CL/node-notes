///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const Student = require("../models/Student"),
	{Op} = require("sequelize"),
	Class = require("../models/Class"),
	validate = require("validate.js"),
	moment = require("moment"),
	{pick} = require("../util/propertyHelper");


//-------------------------------------------------------------------------------------------------------------------//


let addStudent,
	deleteStudent,
	updateStudent,
	getStudentById,
	getStudents;

addStudent = async function (stuObj) {

	// stuObj = pick(stuObj, "name", "birthday", "sex", "mobile", "ClassId");
	// console.log(stuObj)
	//
	// validate.validators.classExits = async function (value) {
	// 	const c = await Class.findByPk(value);
	// 	if (c) {
	// 		return;
	// 	}
	// 	return "is not exist";
	// };
	//
	// const rule = {
	// 	//验证规则
	// 	name: {
	// 		presence: {
	// 			allowEmpty: false,
	// 		},
	// 		type: "string",
	// 		length: {
	// 			minimum: 1,
	// 			maximum: 10,
	// 		},
	// 	},
	// 	birthday: {
	// 		presence: {
	// 			allowEmpty: false,
	// 		},
	// 		datetime: {
	// 			dateOnly: true,
	// 			earliest: +moment.utc().subtract(100, "y"),
	// 			latest: +moment.utc().subtract(5, "y"),
	// 		},
	// 	},
	// 	sex: {
	// 		presence: true,
	// 		type: "boolean",
	// 	},
	// 	mobile: {
	// 		presence: {
	// 			allowEmpty: false,
	// 		},
	// 		format: /1\d{10}/,
	// 	},
	// 	ClassId: {
	// 		presence: true,
	// 		numericality: {
	// 			onlyInteger: true,
	// 			strict: false,
	// 		},
	// 		classExits: true,
	// 	},
	// };


	stuObj = pick(stuObj, "name", "birthday", "sex", "mobile", "ClassId");
	console.log(stuObj)

	/** 扩展自定义验证 **/
	validate.validators.classExits = async function (value) {
		const c = await Class.findByPk(value);
		if (c) {
			return;
		}
		return "is not exist";
	};

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


	// 由于自定义扩展是异步的，
	// const result = validate.validate(stuObj, rule);
	// console.log(result);


	// try {
	//
	// 	await validate.async(stuObj, rule);
	//
	// } catch (err) {
	//
	// 	console.log(err);
	// }

	const result = await validate.async(stuObj, rule),
		ins = await Student.create(stuObj);
	console.log(result);

	return ins.toJSON();
};

deleteStudent = async function (id) {
	return await Student.destroy({
		where: {
			id,
		},
	});
};

updateStudent = async function (id, obj) {
	return await Student.update(obj, {
		where: {
			id,
		},
	});
};

getStudentById = async function (id) {
	const result = await Student.findByPk(id);
	if (result) {
		return result.toJSON();
	}
	return null;
};

getStudents = async function (page = 1, limit = 10, sex = -1, name = "") {
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


//-------------------------------------------------------------------------------------------------------------------//


module.exports = {
	addStudent,
	deleteStudent,
	updateStudent,
	getStudentById,
	getStudents
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
