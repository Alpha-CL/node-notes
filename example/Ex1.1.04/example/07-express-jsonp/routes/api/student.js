///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express"),
	router = express.Router(),
	stuServ = require("../../services/studentService"),
	{asyncHandler} = require("../getSendResult");


//-------------------------------------------------------------------------------------------------------------------//


router.get(
	"/",
	async (req, res) => {

		const page = req.query.page || 1,
			limit = req.query.limit || 10,
			sex = req.query.sex || -1,
			name = req.query.name || "";

		const result = await stuServ.getStudents(page, limit, sex, name),
			json = JSON.stringify(result),
			script = `callback(${json})`;

		res
			.header('content-type', 'application/javascript')
			.send(script);
	}
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

