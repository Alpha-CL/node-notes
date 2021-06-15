///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const log4js = require('log4js'),
	path = require('path');


//-------------------------------------------------------------------------------------------------------------------//


/**
 *
 *
 *
 *
 */


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


log4js.configure({
	appenders: {                // 定义日志出口
		sql: {
			type: 'file',
			filename: path.resolve(__dirname, 'logs', 'sql', 'logging.log'),
			maxLogSize: 1024 * 1024,               // 设置文件大小，超过该大小则会分割文件
			keepFileExt: true,              // 保留文件后缀 .log
			layout: {
				type: 'pattern',
				pattern: '[%c %d{yyyy/MM/dd hh:mm:ss} %p %m]%n'
			}
		},
		default: {
			type: 'file',
			filename: path.resolve(__dirname, 'logs', 'default', 'logging.log'),
		}
	},
	categories: {
		sql: {
			appenders: ['sql'],
			level: 'all'
		},
		default: {
			appenders: ['default'],
			level: 'all'
		}
	}
});


process.on('exit', () => {

	// 当程序退出时，将未记录的日志记录完
	log4js.shutdown();
});

const sqlLogger = log4js.getLogger('sql'),
	defaultLogger = log4js.getLogger();


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


module.exports = {
	sqlLogger,
	defaultLogger
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
