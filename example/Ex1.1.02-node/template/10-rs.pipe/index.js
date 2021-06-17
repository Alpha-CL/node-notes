///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * rs.pipe(ws): ws;             // 用于解决背压问题
 *
 *
 * 将 可读流 连接到 可写流
 */

async function method2() {

	const from = path.resolve(__dirname, './demo.txt'),
		to = path.resolve(__dirname, './demo.copy.txt');

	const rs = fs.createReadStream(from),
		ws = fs.createWriteStream(to);

	rs.pipe(ws);

	// rs.on('data', chunk => {
	//
	// 	const flag = ws.write(chunk);
	//
	// 	if (!flag) {
	//
	// 		rs.pause();
	// 	}
	// });
	//
	// ws.on('drain', () => {
	//
	// 	rs.resume();
	// });
	//
	// rs.on('close', () => {
	//
	// 	console.log('[successfully copy]');
	// });
}

method2();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


















