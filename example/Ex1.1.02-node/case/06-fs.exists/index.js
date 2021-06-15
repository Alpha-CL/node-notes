///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * exists(dirname): bool;           // 已废弃
 *
 *
 * 判断是否存在指定目录
 */

const dirname = path.resolve(__dirname, './demo/sub');

async function exists(filename) {

	try {

		await fs.promises.stat(filename);

		return true;

	} catch (err) {

		if (err.code === 'ENOENT') {

			return false;
		}

		throw err;
	}
}

async function test() {

	const result = await exists(dirname);

	if (result) {

		console.log('目录已存在，无需操作');

	} else {

		await fs.promises.mkdir(dirname);
		console.log('成功创建目录');
	}
}

test();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
