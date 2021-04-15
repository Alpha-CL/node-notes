///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/** 文件流都应继承于这两个类 **/
const {Readable, Writable} = require('stream');
// console.log(Readable, Writable);

const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * .createReadSteam(filename, ?{...options}): readstream;
 *
 *
 * @options: {
 *
 *     encoding,            // 编码方式
 *     start,               // 起始字节
 *     end,                 // 结束字节
 *     highWaterMark,       // 每次读取字节数量
 * }
 *
 * return: Readable 的子类 ReadStream
 */

const filename = path.resolve(__dirname, './demo.txt');

const rs = fs.createReadStream(filename, {

	encoding: 'utf-8',
	highWaterMark: 1,
	autoClose: true,
});

/**
 * rs.on(event, ()=>{});
 *
 *
 * @event:
 *
 *      - open      // 当文件打开时触发
 *      - error     // 当读取文件发生错误时触发
 *      - close     // 当文件关闭时触发
 *      - data      // 根据 highWaterMark 读取相应字节的数据，并将 读取的数据 作为参数传递给该函数
 *      - end       // 读取文件的所有数据后触发
 */

rs.on('open', () => {

	console.log('[file opend]');
});

rs.on('error', () => {

	// console.log('[error]');
});

rs.on('close', () => {

	/**
	 * 1) 文件关闭后触发
	 * 2) 可通过 rs.close(); 手动关闭
	 * 3) 默认配置读取完成后自动关闭
	 */

	console.log('[file closed]');
});

rs.on('data', (chunk) => {

	/**
	 * 1) 读取到部分数据后及触发
	 * 2) 仅注册 data 事件后，才会真正开始读取数据
	 * 3) 每次读取 highWaterMark 配置，指定字节的数据
	 * 4) 回调函数中会附带读取到的数据
	 */

	console.log(chunk);
	rs.pause();
});

rs.on('end', () => {

	console.log('[readed all data]');
});


/**
 * rs.pause();      // 暂停读取: 触发 pause 事件
 * rs.resume();     // 恢复读取: 触发 resume 事件
 *
 */

rs.on('pause', () => {

	console.log('[paused]');

	setTimeout(() => {

		rs.resume();

	}, 1000);

});

rs.on('resume', () => {

	console.log('[resume]');
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
