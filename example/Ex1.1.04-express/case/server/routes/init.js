const express = require("express"),
	app = express(),
	path = require("path"),
	staticRoot = path.resolve(__dirname, "../../client/dist"),
	cookieParser = require("cookie-parser"),
	cors = require("cors"),
	globalConf = require("../conf/global.json");

// middlewares start
const whiteList = [
	"null",
	"http://localhost:8080",
];
app.use(cors({
	origin(origin, callback) {
		if (!origin) {
			callback(null, "*");
			return;
		}
		// if (whiteList.includes(origin)) {
		// 	callback(null, origin);
		// } else {
		// 	callback(new Error("not allowed"));
		// }
		callback(null, origin);
	},
	credential: true
}));

app.use(express.static(staticRoot));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// api request
app.use("/api/student", require("./api/student"));

// middlewares end

app.listen(globalConf.port, () => {
	console.log(`exp: server listen on ${globalConf.port}`);
});
