///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * .createWriteStream(filepath, ?{...options});
 *
 * @options: {
 *
 *     flag,                // 操作文件的方式
 *     encoding,            // 编码方式
 *     start,               // 起始字节
 *     highWaterMark,       // 每次最多写入字节数
 * }
 */

const filename = path.resolve(__dirname, './demo.txt');

const ws = fs.createWriteStream(filename, {

	encoding: 'utf-8',
	highWaterMark: 3,
});

/**
 * ws.wrrite(content): flag;
 *
 *
 * retrun: flag: bool;
 *
 **         [ 写入队列 ] ===> [ 写入时的通道 ] ===> [ 缓慢存储的数据 ]
 *
 *      - true: 写入通道没有被填满，数据可以直接写入，无需排队
 *
 **         [ empty ] ===> [ byt, byt, byt ] ===> [ byt, byt, byt ]
 *
 *      - false: 写入通道一已被填满，数据将进入写入队列( 阻塞 )
 *
 **         [ byt, byt ... ] ===> [ byt, byt, byt ] ===> [ byt, byt, byt ]
 *
 **         背压: 写入队列的内存是有限的
 */

// let flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);
//
// flag = ws.write('a');
// console.log(flag);


let i = 0;

function write() {

	let flag = true;

	while (i < 1000 && flag) {

		flag = ws.write('a');

		i++;
	}
}

write();

/**
 * .drain
 *
 *
 * 当写入通道被清空后，即触发该事件
 */

ws.on('drain', () => {

	write();
});


/**
 * .end([data])
 *
 *
 * @data: 可选的，表示关闭前最后一次写入
 *
 * 结束写入，将自动关闭文件         // 默认自动关闭
 */

// ws.end('end');


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////