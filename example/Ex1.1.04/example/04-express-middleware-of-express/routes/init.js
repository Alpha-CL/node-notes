///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express"),
	http = require('http'),
	{errMid} = require("./errorMiddleware"),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * express.static(staticPath);
 *
 *
 * 自动响应并返回 静态资源
 *
 ** 当请求时，根据请求路径，从指定的目录中寻找是否存在该文件
 **     1) 存在: 直接响应文件，不再交给后续的中间件处理
 **     2) 不存在: 直接移交给后续中间件处理( 调用 next(); )
 *
 ** 默认情况: 若 staticPath 为目录，则读取 index.html 作为索引文件
 */


/**
 * express.urlcoded(options);
 *
 *
 * @options:
 *
 *
 */



//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


const app = express(),
	port = 9527,
	staticRoot = path.resolve(__dirname, '../public');


/** 映射 public 目录中的静态资源 **/
app.use(express.static(staticRoot, {
	index: 'index.html'
}));


// app.use('/static', (req, res) => {
//
// 	console.log(req.baseUrl, req.path);
// });


/** 解析 application/x-www-form-urlencoded 格式的请求体 **/
app.use(express.urlencoded({
	extended: true
}));

/** 解析 application/json 格式的请求体 **/
app.use(express.json());


// app.post('/api/student', (req, res) => {
//
// 	console.log(req.body);
// });


/** 处理 api 请求 **/
// app.get('/api/student', (req, res) => {
//
// 	// 获取学生
// });
//
// app.post('/api/student', (req, res) => {
//
// 	// 添加学生
// });
//
// app.put('/api/student:id', (req, res) => {
//
// 	// 修改学生
// });


/** 解析 错误的中间件 **/
app.use(errMid);

app.listen(port, () => {

	console.log(`server listen on ${port}`);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////