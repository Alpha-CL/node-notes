///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// require("./models/sync");

/** 模拟学生数据 **/
require("./models/relation");               // 建立表关系
// require("./mock/mockStudent");              // 创建学生数据( 需先建立外键关系 )

const Admin = require("./models/Admin"),
	{
		addAdmin,
		deleteAdmin,
		updateAdmin,
		login,
		getAdminById,
		getStudents,
	} = require("./services/adminService");


//-------------------------------------------------------------------------------------------------------------------//


/** add data methods - 01: 需手动执行 save(); 后同步数据到数据库 **/

// const ins = Admin.build({
// 	loginId: "alpha",
// 	loginPwd: "666666",
// 	name: 'go'
// });
//
// /** 有且仅当 save(); 执行时，才将数据同步到数据库 **/
// ins.save()
// 	.then(() => {
// 		console.log('[新建管理员成功]');
// });

/** add data methods - 02: 自动同步数据到数据库 **/

// Admin.create({
//
// 	loginId: 'beta',
// 	loginPwd: '777777',
// 	name: 'to'
//
// }).then((ins) => {
//
// 	console.log(ins.id, ins.loginId, ins.loginPwd);
// });


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// addAdmin({
//
// 	loginId: 'omega',
// 	loginPwd: 'nidwadwa',
// 	name: 'aaa'
//
// }).then(r => {
//
// });

// deleteAdmin(5);

// updateAdmin(4, {
//
// 	loginId: '20',
//
// }).then(r=>{
//
// 	console.log(r);
// });


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


/** search data **/

// login('alpha', '666666')
// 	.then(r => {
// 		console.log(r);
// 	});


// getAdminById(1)
// 	.then(r => {
// 		console.log(r);
// 	});


getStudents(1, 10, false, '贾', ['id', 'name', 'sex'])

	.then(r => {
		console.log(r);
	});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



