///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const qs = require("querystring");


//-------------------------------------------------------------------------------------------------------------------//


let myUrlEncoded;


myUrlEncoded = (req, res, next) => {

	if (req.header["content-type"] === "application/x-www-form-urlencoded") {

		let result = "";

		req.on("data", chunk => {

			result += chunk.toString("utf-8");
		});

		req.on("end", () => {

			req.body = qs.parse(result);

			next();
		});

	} else {

		next();
	}
};

//-------------------------------------------------------------------------------------------------------------------//


module.exports = {
	myUrlEncoded
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////