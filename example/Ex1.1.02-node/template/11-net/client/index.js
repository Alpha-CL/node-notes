///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const net = require('net'),
	server = net.createServer(),
	fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


server.listen(9527);

server.on('listening', () => {

	console.log('[server listen 9527]');
});

server.on('connection', socket => {

	console.log('[有客户端连接到服务器]');

	socket.on('data', async chunk => {

/** 服务器响应的编码中不可以有空格( 否则容易导致解析错误 ) **/
/** 服务器响应的编码中不可以有空格( 否则容易导致解析错误 ) **/
/** 服务器响应的编码中不可以有空格( 否则容易导致解析错误 ) **/

const filename = path.resolve(__dirname, "./avatar.jpg"),
headBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`, 'utf-8'),
bodyBuffer = await fs.promises.readFile(filename),
result = Buffer.concat([headBuffer, bodyBuffer]);

		socket.write(result);
		socket.end();
	});

	socket.on('end', () => {
		console.log('[连接关闭了]')
	});
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
