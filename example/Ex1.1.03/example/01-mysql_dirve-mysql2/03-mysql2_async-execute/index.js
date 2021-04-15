///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const mysql = require('mysql2/promise');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * execute(sqlStatument, [, varable]);              // 禁止使用 query，防止 sql语句 注入
 *
 *
 * @sqlStatument: mysql 语句
 * @[, varable]: 在变量中 ？的位置，依次由该数组替换响应变量
 */

async function test(id) {

	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'Liang1992@12',
		database: 'test_retrieve_cmd',              // database
		multipleStatements: true,
	}), sql = `select * from employee where id=?`;

	const [results] = await connection.execute(sql, [id]);

	console.log(results);

	connection.end();
}

test(5);


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 若用户传递 mysql 语句，则会造成数据库的改变
//
// async function test(id) {
//
// 	/** 创建数据库连接 **/
//
// 	const connection = await mysql.createConnection({
// 		host: 'localhost',
// 		user: 'root',
// 		password: 'Liang1992@12',
// 		database: 'test_retrieve_cmd',              // database
// 		multipleStatements: true,
// 	}), sql = `select * from employee where id = ${id}`;
//
// 	const [results] = await connection.query(sql);
//
// 	console.log(results);
//
// 	connection.end();
// }
//
// test(`''; delete from company where id = 5`);


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 常规情况:
//
// async function test(id) {
//
// 	/** 创建数据库连接 **/
//
// 	const connection = await mysql.createConnection({
// 		host: 'localhost',
// 		user: 'root',
// 		password: 'Liang1992@12',
// 		database: 'test_retrieve_cmd',              // database
// 	}), sql = `select * from employee where id=${id}`;
//
// 	const [results] = await connection.query(sql);
//
// 	console.log(results);
//
// 	connection.end();
// }
//
// test(3);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////