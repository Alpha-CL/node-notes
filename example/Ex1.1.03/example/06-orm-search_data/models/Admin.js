///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const sequelize = require('./db'),
	{DataTypes} = require('sequelize');


//-------------------------------------------------------------------------------------------------------------------//


/**
 * sequelize.define('modelName', attributes, ?options): ModelObj;
 *
 * @modelName: 模型名称
 * @attribute: 模型属性
 *
 * return: 返回一个模型对象
 */

/**
 * DataTypes
 *
 *
 * 用于定义 数据类型
 */


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


const Admin = sequelize.define(
	"Admin",
	{
		loginId: {
			type: DataTypes.STRING,                 // 数据类型
			allowNull: false,                       // 数据是否允许为空
		},
		loginPwd: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		createdAt: false,                           // 是否创建列 createdAt
		updatedAt: false,                           // 是否创建列 updatedAt

		/** 因数据是宝贵的，在用户选择删除数据后，创建了一列记录删除的时间，用于后期恢复数据 **/
		paranoid: true,                             // 表中的数据不会真正删除，而是记录用户删除的时间，以便遍后期使用
		// deletedAt: 'newdeleteAtName'

		/** 日志记录: 可关闭，可自定函数 **/
		logging: null,
	}
);


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配


// (async function () {
//
// 	/** 同步指定 model 到数据库 **/
// 	await Admin.sync({
// 		alter: true
// 	});
//
// 	console.log('[myschool-Admin 同步完成]');
//
// }());


//-------------------------------------------------------------------------------------------------------------------//


module.exports = Admin;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
