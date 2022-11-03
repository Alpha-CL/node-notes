///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const log4js = require("log4js"),
	path = require("path");


//-------------------------------------------------------------------------------------------------------------------//


let categoriesArr = ["sql", "api"];

log4js.configure(getConfig(categoriesArr));

// log4js.configure({
// 	appenders: {
// 		sql: getCommonAppender("sql"),
// 		api: getCommonAppender("api"),
// 		default: {
// 			type: "stdout",
// 		},
// 	},
// 	categories: {
// 		sql: {
// 			appenders: ["sql"], //该分类使用出口sql的配置写入日志
// 			level: "all",
// 		},
// 		api: {
// 			appenders: ["sql"], //该分类使用出口sql的配置写入日志
// 			level: "all",
// 		},
// 		default: {
// 			appenders: ["default"],
// 			level: "all",
// 		},
// 	},
// });

process.on("exit", () => {
	log4js.shutdown();
});

function getCommonAppender(appenderPath) {
	return {
		//定义一个sql日志出口
			type: "dateFile",
		filename: path.resolve(__dirname, "logs", appenderPath, "logging.log"),
		maxLogSize: 1024 * 1024, //配置文件的最大字节数
		keepFileExt: true,
		daysToKeep: 3,
		layout: {
			type: "pattern",
				pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
		},
	}
}

function getCommonCategories(appenders, level = "all") {
	return {
			appenders: [appenders],
		level: "all",
	}
}

function getConfig(categoriesArr = []) {

	let config = {appenders: {default: {type: "stdout",}}, categories: {}};
	for (let i = 0; i < categoriesArr.length; i++) {
		config.appenders[categoriesArr[i]] = getCommonAppender(categoriesArr[i]);
		config.categories[categoriesArr[i]] = getCommonCategories(categoriesArr[i]);
	}
	config.categories.default = getCommonCategories("default");

	// console.log(config);

	return config;
}


//-------------------------------------------------------------------------------------------------------------------//


categoriesArr.push('default');

	for (let i = 0; i < categoriesArr.length; i++) {

	exports[`${categoriesArr[i]}Logger`] = log4js.getLogger(categoriesArr[i]);
}

// exports.sqlLogger = log4js.getLogger("sql");
// exports.apiLogger = log4js.getLogger("api");
// exports.defLogger = log4js.getLogger("default");


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
