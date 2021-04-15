///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const net = require('net'),
	os = require('os');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * net.createConection(?[, options], connectListener): socket;
 *
 *
 * return socket: 1) 特殊的文件
 *                2) 在 node 中表现为 双工流对象
 *                3) 可通过向流写入内容发送数据
 *                4) 可通过监听流从而获取数据内容
 */

let receive = null;

/** TCP/IP 连接服务器 **/
const socket = net.createConnection({

	host: 'www.baidu.com',
	port: 80,

}, ()=>{

	console.log('link successfully');
});

function parseResponse(response) {

	const index = response.indexOf(`\r\n\r\n`),
		head = response.substring(0, index),
		body = response.substring(index + 2),
		headParts = head.split('\r\n'),
		headerArray = headParts.slice(1).map(str => {
			return str.split(':').map(s => s.trim());
		}),
		header = headerArray.reduce((a, b) => {
			a[b[0]] = b[1];
			return a;
		}, {});

	return {
		header,
		body: body.trimStart()
	};
}

function isOver() {


	const contentLength = +receive.header['Content-Length'],
		curReceivedLength = Buffer.from(receive.body, 'utf-8').byteLength;

	console.log(contentLength, curReceivedLength);

	return curReceivedLength > contentLength;
}

/**  **/
socket.on('data', chunk => {

	const response = chunk.toString('utf-8');

	if (!receive) {

		receive = parseResponse(response);

		if (isOver()) {
			socket.end();
		}
		return;
	}

	receive.body += response;

	if (isOver()) {
		socket.end();
		return;
	}
});

// socket.write(`hello world`);
// HTTP/1.1 400 Bad Request
// Server: stgw/1.3.16.3_1.13.5
// Date: Mon, 22 Feb 2021 07:57:17 GMT
// Content-Type: text/html
// Content-Length: 181
// Connection: close

/** HTTP 请求 **/
socket.write(`GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive

`);                     // request body: 必须空两行

socket.on('close', () => {

	console.log(receive.body);
	console.log('[结束了!]');
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////