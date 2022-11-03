const Mock = require("mockjs"),
	Admin = require("../models/Admin");

const simulationData = Mock.mock({
	"data": [
		{}
	]
}).data;

Admin.bulkCreate(simulationData)
	.then(r => {
		r && console.log("success created simulation data of Admin model");
	});
