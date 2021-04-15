///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const http = require('http'),
	url = require('url');


//-------------------------------------------------------------------------------------------------------------------//


function handleReq(req) {

	console.log('[有请求来了]');

	const urlObj = url.parse(req.url);
	// console.log('[请求路径]', urlObj);
	console.log('[请求方法]', req.method);
	// console.log('[请求头]', req.headers);
	// console.log('[请求的地址]', req.url);

	let body = '';

	req.on('data', chunk => {

		body += chunk.toString('utf-8');
	});

	req.on('end', () => {

		console.log('[请求体]', body);
	});
}

function handleRes(res) {

	res.setHeader('name', 'alpha');
	res.setHeader('age', 18);

	res.statusCode = 404;

	res.write('hello world');
	res.end();
}

const server = http.createServer((req, res) => {

	handleReq(req);
	handleRes(res);
});

server.listen(9527);

server.on('listening', () => {

	console.log('[server listen 9527]');
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////