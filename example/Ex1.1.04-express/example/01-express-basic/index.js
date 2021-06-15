///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express"),
	http = require('http');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * 配置请求映射，根据不同的请求( 若请求方法和路径均满足后 )，匹配不同的处理函数
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
	// console.log('[req.params]', req.params);			 // 获取动态路径

	/** 设置响应信息 **/
	// res.setHeader('key', 'val');                // 设置响应头
	// res.send('<h1>hello world</h1>')                  // 设置响应体( send(); 会自动调用 end(); 结束响应)

	// res
	// 	.status(302)
	// 	.header('location', 'https://baidu.com/')
	// 	.end();

	// res
	// 	.status(302)
	// 	.location('https://baidu.com/')
	// 	.end();

	// res
	// 	.redirect(302,'https://baidu.com/' );

	/**
	 * 301 vs 302
	 *
	 ** 301: 永久重定向
	 ** 302: 临时重定向
	 */

	res.redirect('https://baidu.com/' );			// 默认状态码: 301

}));


app.listen(port, () => {

	console.log(`server listen on ${port}`);
});


// function listenOrigin(port, callback) {
//
// 	http.createServer(this).listen(port, callback);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
