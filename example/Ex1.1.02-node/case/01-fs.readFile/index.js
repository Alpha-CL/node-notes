///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


const filename = path.resolve(__dirname, './demo.txt');

async function test() {

	/** node@12+ 后新增的 promise **/
	const content = await fs.promises.readFile(filename, 'utf-8');

	console.log(content);
}

test();

// fs.readFile(filename, { encoding: 'utf-8' }, (err, content) => {
//
// 	console.log(content);
// });

// fs.readFile(filename, 'utf-8', (err, content) => {
//
// 	console.log(content);
// });

// fs.readFile(filename, (err, content) => {
//
// 	console.log(content.toString('utf-8'));
// });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
