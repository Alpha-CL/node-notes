///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express"),
	router = express.Router(),
	stuServ = require("../../services/studentService"),
	{asyncHandler} = require("../util/getSendResult");


//-------------------------------------------------------------------------------------------------------------------//


router.get(
	"/",
	asyncHandler(async (req, res) => {

		if (req.query.all) {
			// console.log('test');
			return await stuServ.getAllStudents();
		}

		const page = req.query.page || 1,
			limit = req.query.limit || 10,
			sex = req.query.sex || -1,
			name = req.query.name || "";

		console.log('test');

		return await stuServ.getStudents(page, limit, sex, name);
	})
);


router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		return await stuServ.getStudentById(req.params.id);
	})
);

router.post(
	"/",
	asyncHandler(async (req, res, next) => {
		return await stuServ.addStudent(req.body);
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res, next) => {
		return await stuServ.deleteStudent(req.params.id);
	})
);

router.put(
	"/:id",
	asyncHandler(async (req, res, next) => {
		return await stuServ.updateStudent(req.params.id, req.body);
	})
);


//-------------------------------------------------------------------------------------------------------------------//


module.exports = router;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

