///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


async function readAndWritePictures() {

	const formFilename = path.resolve(__dirname, './avatar.jpg'),
		imgBuffer = await fs.promises.readFile(formFilename),
		toFilename = path.resolve(__dirname, './avatar.copy.jpg');

	await fs.promises.writeFile(toFilename, imgBuffer);

	console.log('copy successfully');
}

readAndWritePictures();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
