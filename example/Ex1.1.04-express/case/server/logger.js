const log4js = require("log4js"),
	path = require("path");

let categoriesArr = ["sql", "api"];

log4js.configure(getConfig(categoriesArr));

process.on("exit", () => {
	log4js.shutdown();
});

function getCommonAppender(appenderPath) {
	return {
		type: "dateFile",
		filename: path.resolve(__dirname, "logs", appenderPath, "logging.log"),
		maxLogSize: 1024 * 1024,
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
	return config;
}

categoriesArr.push("default");

for (let i = 0; i < categoriesArr.length; i++) {
	exports[`${categoriesArr[i]}Logger`] = log4js.getLogger(categoriesArr[i]);
}
