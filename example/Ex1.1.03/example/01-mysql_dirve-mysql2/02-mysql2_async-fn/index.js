///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const mysql = require('mysql2/promise');


//-------------------------------------------------------------------------------------------------------------------//


async function test() {

	/** 创建数据库连接 **/

	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'Liang1992@12',
		database: 'test_retrieve_cmd',              // database
	});

	const [results] = await connection.query("SELECT * FROM `company`;");

	console.log(results);

	connection.end();
}

test();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




