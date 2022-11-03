const express = require("express"),
	studentService = require("../../services/studentService"),
	router = express.Router(),
	{asyncHandler} = require("../utilities");


router.get(
	"/all",
	asyncHandler(async (req, res, next) => {
		console.log(req.query);
		return await studentService.getAllStudents();
	})
);

router.get(
	"/", 
	asyncHandler(async (req, res, next) => {
		console.log(req.query);
		const page = req.query.page || 1,
			limit = req.query.limit || 10,
			sex = req.query.sex || -1,
			name = req.query.name || "";
		return await studentService.getStudentsByCondition(page, limit, sex, name);
	})
);

router.get(
	"/:id", 
	asyncHandler(async (req, res, next) => {
		return await studentService.getStudentById(req.params.id);
	})
);

router.post(
	"/", 
	asyncHandler(async (req, res, next) => {
		// return await studentService.addStudent(req.body);
	})
);

router.delete(
	"/:id", 
	asyncHandler(async (req, res, next) => {
		// return await studentService.deleteStudent(req.params.id);
	})
);

router.put(
	"/:id", 
	asyncHandler(async (req, res, next) => {
		// return await studentService.updateStudent(req.params.id, req.body);
	})
);

module.exports = router;
