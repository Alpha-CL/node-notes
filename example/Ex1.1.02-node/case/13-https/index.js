///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const http = require('https'),
	URL = require('url'),
	path = require('path'),
	fs = require('fs');


//-------------------------------------------------------------------------------------------------------------------//


async function handle(req, res) {

	const info = await getFileContent(req.url);

	// console.log(info);

	if (info) {

		res.write(info);

	} else {

		res.statusCode = '404';
		res.write('Resource is not exist');
	}

	res.end();
}

async function getFileContent(url) {

	const urlObj = URL.parse(url);

	let filename = path.resolve(__dirname, 'public', urlObj.pathname.substr(1)),
		stat = await getStat(filename);



	// console.log(stat);

	if (!stat) {

		console.log('[文件不存在]');

		return null;

	} else if (stat.isDirectory()) {

		console.log('[文件为目录]');

		filename = path.resolve(__dirname, 'public', urlObj.pathname.substr(1), 'index.html');

		console.log(filename);

		stat = await getStat(filename);

		// console.log(stat);

		if (!stat) {

			// console.log(stat);

			console.log('[文件不存在]');

			return null;

		} else {

			console.log(filename);

			return await fs.promises.readFile(filename);
		}

	} else {

		console.log('[正常文件]', filename);

		return await fs.promises.readFile(filename);
	}
}

async function getStat(filename) {

	try {

		return await fs.promises.stat(filename);

	} catch {

		return null;
	}
}

const server = http.createServer({

		key: fs.readFileSync(path.resolve(__dirname, "server-key.pem")),            // common_key
		cert: fs.readFileSync(path.resolve(__dirname, "server-cert.crt")),          // certificate
	},
	handle);

server.on('listening', () => {

	console.log('[server listen 443]');
});

server.listen(443);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
