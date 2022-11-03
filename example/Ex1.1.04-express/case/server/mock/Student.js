const Mock = require("mockjs"),
	Student = require("../models/Student");

const simulationData = Mock.mock({
	"data|30-50": [
		{
			name: "@cname",
			birthday: "@date",
			"sex|1-2": true,
			mobile: /1\d{10}/,
		}
	]
}).data;

Student.bulkCreate(simulationData)
	.then(r => {
		 r && console.log("mock: success created simulation data in student model");
	});
