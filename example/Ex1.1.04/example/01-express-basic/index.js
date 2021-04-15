///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express"),
	http = require('http');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * 配置请求映射，根绝不同的请求( 若请求方法和路径均满足后 )，匹配不同的处理函数
 *
 *
 * const app = express();
 * app.method(path, fn);
 */


/**
 * REST STYLE API
 *
 *
 * /api/test    post        根据不同方法执行不同的请求
 *              get
 *              put
 *              delete
 *              ...
 *
 *              all                     匹配所有方法
 *
 *              all('*', ()=>{});       匹配所有路径
 */


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// const app = express(),
// 	port = 9527,
// 	server = http.createServer(app);
//
// server.listen(port, () => {
//
// 	console.log(`server listen on ${port}`);
// });


const app = express(),
	port = 9527;


/** 配置请求映射 **/
app.get('/test', ((req, res) => {

	/** 获取请求信息 **/
	// console.log('[req.Header]', req.headers);
	// console.log('[req.path]', req.path);
	// console.log('[req.query]', req.query);
	// console.log('[req.params]', req.params);

	/** 设置响应信息 **/
	// res.setHeader('reskey', 'resval');                // 设置响应头
	// res.send('<h1>hello world</h1>')                  // 设置响应体( send(); 会自动调用 end(); 结束响应)

	// res
	// 	.status(302)
	// 	.header('location', 'https://baidu.com/')
	// 	.end();

	// res
	// 	.status(302)
	// 	.location('https://baidu.com/')
	// 	.end();

	res
		.redirect(302,'https://baidu.com/' );

}));


app.listen(port, () => {

	console.log(`server listen on ${port}`);
});


// function listenOrigin(port, callback) {
//
// 	http.createServer(this).listen(prot, callback);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
