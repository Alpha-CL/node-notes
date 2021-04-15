///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const sequelize = require('./db'),
	{DataTypes} = require('sequelize');


//-------------------------------------------------------------------------------------------------------------------//


const Book = sequelize.define(
	'Book',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imgurl: {
			type: DataTypes.STRING,
			allowNull: false
		},
		publishDate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		paranoid: true,
		/** 日志记录: 可关闭，可自定函数 **/
		logging: null,
	}
);


//-------------------------------------------------------------------------------------------------------------------//


module.exports = Book;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
