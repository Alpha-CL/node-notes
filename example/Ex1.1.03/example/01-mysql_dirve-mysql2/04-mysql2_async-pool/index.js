///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const mysql = require('mysql2/promise');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * pool = mysql.createPool();
 *
 *
 *
 */

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'Liang1992@12',
	database: 'test_retrieve_cmd',              // database
	multipleStatements: true,
});

async function test(id) {

	const sql = `select * from employee where \`name\` like concat('%', ?, '%')`,
		[results] = await pool.execute(sql, [id]);

	console.log(results);
}

test("袁");


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////