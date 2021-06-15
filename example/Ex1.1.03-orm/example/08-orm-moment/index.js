///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const moment = require('moment');
moment.locale('zh-cn');             // 设置moment库返回的地区语言


//-------------------------------------------------------------------------------------------------------------------//


/** 获取当前时间 **/
// console.log(moment().toString());
// console.log(moment().utc().toString());


/** 获取当前时间戳 **/
// console.log(moment().valueOf(), moment().valueOf() === +moment());
// console.log(moment.utc().valueOf(), moment.utc().valueOf() === +moment.utc());


/** 根据指定时间格式获取时间 **/
// const temp = "1970-01-01 00:00:00";
// console.log(moment(temp).toString(), +moment(temp));
// console.log(moment.utc(temp).valueOf(), +moment.utc(temp));         // 服务器必须使用 utc


/** 使用日期令牌转换 **/
const formats = [
	"YYYY-MM-DD HH:mm:ss",
	"YYYY-M-D H:m:s",
	"x",
];
// console.log(moment.utc("1970-01-01 00:00:00", formats, true).toString());
// console.log(moment.utc("1970-1-1 0:0:0", formats, true).toString());
// console.log(moment.utc(0, formats, true).toString());

/** 未定义的时间格式，无法被识别 **/
// console.log(moment.utc("Thu Jan 01 1970 00:00:00 GMT+0000", formats, true).toString());
/** 未定义的时间格式转换时间戳为 NaN **/
// console.log(+moment.utc("Thu Jan 01 1970 00:00:00 GMT+0000", formats, true).toString());
/** 判断是否有效时间 .isValid(); **/
// console.log(moment.utc("Thu Jan 01 1970 00:00:00 GMT+0000", formats, true).isValid());


/** 将 utc/local 时间转换为本地时间 **/
const m = moment.utc('2020-01-01 00:00:00', formats, true);
if (m.isLocal) {
	console.log(m.local().format('YYYY年MM月DD日 HH点mm分ss秒'));
	console.log(m.local().fromNow());
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
