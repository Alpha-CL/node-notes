///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * .mkdir(dirname);
 *
 *
 * 根据路径创建子目录
 *
 ** 仅可在已有目录下创建新的子目录
 */

const dirname = path.resolve(__dirname, "./demo/sub");

console.log(dirname);

async function test() {

	await fs.promises.mkdir(dirname);

	console.log('create directory successfully');
}

test();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////