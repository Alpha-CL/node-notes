///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


async function method1() {

	const from = path.resolve(__dirname, './demo.txt'),
		to = path.resolve(__dirname, './demo.copy.txt'),
		content = await fs.promises.readFile(from);

	await fs.promises.writeFile(to, content);

	console.log('[successfully copy]');
}

// method1();


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


async function method2() {

	const from = path.resolve(__dirname, './demo.txt'),
		to = path.resolve(__dirname, './demo.copy.txt');

	const rs = fs.createReadStream(from),
		ws = fs.createWriteStream(to);

	rs.on('data', chunk => {

		const flag = ws.write(chunk);

		if (!flag) {

			rs.pause();
		}
	});

	ws.on('drain', () => {

		rs.resume();
	});

	rs.on('close', () => {

		console.log('[successfully copy]');
	});
}

method2();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


















