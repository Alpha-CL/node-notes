///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require('fs'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


class File {

	constructor(filename, name, ext, isFile, size, createTime, updateTime) {

		this.filename = filename;
		this.name = name;
		this.ext = ext;
		this.isFile = isFile;
		this.size = size;
		this.createTime = createTime;
		this.updateTime = updateTime;
	}

 	static async getFile(filename) {

	    const stat = await fs.promises.stat(filename),
		    name = path.basename(filename),
		    ext = path.extname(filename),
		    isFile = stat.isFile(),
		    size = stat.size,
		    createTime = new Date(stat.birthtime),
		    updateTime = new Date(stat.mtime);

	    return new File(filename, name, ext, isFile, size, createTime, updateTime);
	}

	async getContent(isBuffer = false) {

		if (this.isFile) {

			if (isBuffer) {

				return await fs.promises.readFile(this.filename);

			} else {

				return await fs.promises.readFile(this.filename, 'utf-8');
			}
		}

		return null;
	}

	async getChildren() {

		if (this.isFile) {

			return [];
		}

		let children = await fs.promises.readdir(this.filename);

		// console.log(this.filename);

		children = children.map(child => {

			const childPath = path.resolve(this.filename, child);

			// console.log(childPath);

			return File.getFile(childPath);

			// console.log(File.getFile(childPath));
		});

		// console.log(children);

		return Promise.all(children);
	}
}

async function getDirInfo() {


}

async function test() {

	const filename = path.resolve(__dirname, "./demo/sub"),
		file = await File.getFile(filename);

	console.log(await file.getChildren());
}

test();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
