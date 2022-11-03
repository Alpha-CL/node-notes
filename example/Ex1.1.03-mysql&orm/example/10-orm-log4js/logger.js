///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const log4js = require("log4js"),
	path = require("path");


//-------------------------------------------------------------------------------------------------------------------//


/**
 * log4js.configure(config);
 *
 *
 *
 */


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


log4js.configure({
	appenders: {                				// 定义日志出口
		sql: {
			type: "file",
			filename: path.resolve(__dirname, "logs", "sql", "logging.log"),
			maxLogSize: 1024 * 1024,        	// 设置文件大小，超过该大小则会分割文件
			keepFileExt: true,              	// 保留文件后缀 .log
			layout: {
				type: "pattern",
				pattern: "[%c %d{yyyy/MM/dd hh:mm:ss} %p %m]%n"
			},
		},
		def: {
			type: "file",
			filename: path.resolve(__dirname, "logs", "def", "logging.log"),
		}
	},
	categories: {								// 配置 分类
		sql: {
			appenders: ["sql"],
			level: "all"
		},
		default: {
			appenders: ["def"],
			level: "all"
		}
	}
});


process.on("exit", () => {

	// 当程序退出时，将未记录的日志记录完
	log4js.shutdown();
});

const sqlLogger = log4js.getLogger("sql"),
	defLogger = log4js.getLogger();


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


module.exports = {
	sqlLogger,
	defLogger,
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
