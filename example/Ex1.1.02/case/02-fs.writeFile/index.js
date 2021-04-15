///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path'),
	os = require('os');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * .writeFile(path, data, {,options}, callback);
 *
 * @options: {
 *
 *     encoding: 'utf-8',           // 数据以什么编码处理:
 *     mode: '0o666',               // 默认整数型模式: integer
 *     flag: 'w',                   // 写入数据处理的方式: write: 写入, append: 追加 ...
 * }
 *
 ** 无法创建新目录下的文件，仅可在当前目录创建新文件并写入内容
 */

const filename = path.resolve(__dirname, './demo.txt');

async function test() {

	const buffer = Buffer.from('hello world', 'utf-8'),
		content = `${buffer}${os.EOL}-------------${os.EOL}hello world just do it`;

	await fs.promises.writeFile(filename, content, {
		flag: 'a',
	});

	console.log('successfully written!');
}

test();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
