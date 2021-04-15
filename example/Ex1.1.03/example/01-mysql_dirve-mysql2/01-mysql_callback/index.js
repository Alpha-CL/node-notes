///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const mysql = require('mysql2');


//-------------------------------------------------------------------------------------------------------------------//


/** 创建数据库连接 **/
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Liang1992@12',
	database: 'test_retrieve_cmd',              // database
});


// 手动切断数据库连接
// connection.end();


/**
 * connection.query(mysqlStatement, callback);
 *
 *
 * @ mysqlStatement: mysql 语句
 * @callback: (err, result, fields) => {}
 */

/** simple query **/
// connection.query(
// 	'SELECT * FROM `company`;',             // table
// 	function (err, result, fields) {
//
// 		// console.log(err);                    // 返回 mysql 语句查询后的 错误信息
// 		console.log(result);                    // 返回 mysql 语句查询后的 结果
// 		// console.log(fields);                 // 返回 源数据信息
// 	}
// );

/** add **/
// connection.query(
// 	"insert into company(`name`,location,buildDate) values('abbc2', '阿萨德2', curdate());",
// 	(err, res) => {
// 		console.log(res);
// 	}
// );

/** update **/
// connection.query(
// 	"update company set `name`='dwadw' where id=4",
// 	(err, res) => {
// 		console.log(res);
// 	}
// );

/** delete **/
// connection.query(
// 	"delete from company where id=6",
// 	(err, res) => {
// 		console.log(res);
// 	}
// );


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////











