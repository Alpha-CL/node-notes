///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const sequelize = require('./db'),
	{DataTypes} = require('sequelize'),
	Class = require("./Class"),
	moment = require('moment');


//-------------------------------------------------------------------------------------------------------------------//


const Student = sequelize.define(
	'Student',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {

				const birth = this.getDataValue('birthday');

				if (birth) {

					return birth.getTime();
				}

				return undefined;
			},
			set() {

			}
		},
		age: {
			type: DataTypes.VIRTUAL,                // 虚拟字段: 根据已有字段处理后获取的新字段
			get() {
				const now = moment.utc(),
					birth = moment.utc(this.birthday);
				return now.diff(birth, 'y');
			}
		},
		sex: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		mobile: {
			type: DataTypes.STRING(11),
			allowNull: false
		},
	},
	{
		createdAt: false,
		updatedAt: false,
		paranoid: true,
		// logging: null,
	}
);

// Student.belongsTo(Class);


//-------------------------------------------------------------------------------------------------------------------//


module.exports = Student;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
