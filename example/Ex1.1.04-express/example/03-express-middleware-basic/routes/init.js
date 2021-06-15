///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express"),
	{errMid} = require("./errorMiddleware"),
	{staticMid} = require('./staticMiddleware');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * app.method(path, (req,res,next)=>{} ...);
 *
 * @ (req,res,next)=>{}
 *      - request: 请求
 *      - response: 响应
 *      - next: 手动触发，将当前中间件的结果递交给下一个中间件
 *
 ** 1) 匹配 path
 *
 *      a) 匹配成功
 *
 *          依次交给中间件处理( 中间件中需要手动调用 next(); 后才可以递交给后续中间件处理 )
 *
 *      b) 中间件细节
 *
 *          若递交后，已无后续中间件( express 发现响应无结果，则会响应 404 )
 *
 *      c) 匹配失败
 *
 *          不会停止服务器
 *          相当于调用 next(errObj);
 *          寻找后续错误处理中间件( 若无错误处理中间件，则响应 status: 500 )
 */


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


const app = express(),
	port = 9527;

// 判断是否请求的为静态资源
app.use(staticMid);

/** 配置请求映射 **/
app.get('/news',
	(req, res, next) => {

		// console.log('handle_01');
		// next();

		// console.log('handle_01');
		// res.status(200);
		// res.end();                      // 结束响应后，后续中间件无法再向响应体中添加内容
		// next(new Error('throw error of handle_01'));

		console.log('handle_01');
		next(new Error('throw error of handle_01'));

		// console.log('handle_01');
		// next();
	},
	// (err, req, res, next) => {
	//
	// 	console.log('handle_02');
	// 	res.send('handle_02');
	// 	next();
	// }
);

app.get('/news', (req, res, next) => {

	console.log('handle_03');
	next();
});

/**
 * app.use(path, midware);
 *
 *
 * app.use("*", midware); === app.use(midware);
 *
 ** app.use(path, midware); vs app.otherMethod(path, midware);
 ** use 不仅可匹配 当前 path，还可以匹配以当前 path 作为根路径后的所有后代路径
 ** useMiddleware 中可以输出 req.baseUrl
 */

app.use(errMid);


app.listen(port, () => {

	console.log(`server listen on ${port}`);
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
