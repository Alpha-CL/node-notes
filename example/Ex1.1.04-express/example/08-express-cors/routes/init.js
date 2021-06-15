///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express"),
	app = express(),
	path = require("path"),                                 // 映射public目录中的静态资源
	staticRoot = path.resolve(__dirname, "../public"),
	cookieParser = require('cookie-parser'),
	cors = require('cors');


//-------------------------------------------------------------------------------------------------------------------//


app.use(express.static(staticRoot));


/**
 * cookie parser middleware
 *
 *
 * req.cookie: 用于获取所有请求传递过来的 cookie
 * res.cookie: 用于设置 cookie
 */
app.use(cookieParser());


const whiteList = ['null'];
app.use(cors({
	origin(origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, origin);
		} else {
			callback(new Error('not allowed'));
		}
	},
	credential: true
}));

// app.use(require('./corsMiddleware'));

app.use(require('./tokenMiddleware'));


// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({extended: true}));


// 解析 application/json 格式的请求体
app.use(express.json());


// 处理 api 的请求
app.use("/api/student", require("./api/student"));
app.use("/api/admin", require("./api/admin"));
// app.use("/api/book", require("./api/book"));
// app.use("/api/class", require("./api/class"));


// 处理错误的中间件
app.use(require("./errorMiddleware"));


//-------------------------------------------------------------------------------------------------------------------//


const port = 9527;
app.listen(port, () => {
	console.log(`server listen on ${port}`);
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
