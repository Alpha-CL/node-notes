///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const axios = require("axios").default,
	cheerio = require('cheerio'),
	Book = require('../models/Book');


//-------------------------------------------------------------------------------------------------------------------//


/** axios 请求后的数据变成了 "script 加载" **/


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


/** 01: 获取服务器的 响应结果 **/

async function getBooksHTML() {

	const resp = await axios.get('https://book.douban.com/');

	return resp.data;
}

// getBooksHTML()
// 	.then(r => {
// 		console.log(r);
// 	});

/** 02: 根据响应结果，在 html 中筛选数据 **/

async function getBookLinks() {

	const responseHtml = await getBooksHTML(),
		$ = cheerio.load(responseHtml),
		anchorElements = $('#content li .cover a');

	// console.log(anchorElements);

	let bookInfoList = [];

	anchorElements.map((i, el) => {

		bookInfoList.push(el.attribs['href'])
	});

	return bookInfoList;

	// return anchorElements.map((i, el) => {
	//
	// 	return el.attribs['href'];
	//
	// }).get();
}

getBookLinks()
	.then(r => {
		console.log(r);
	});

async function getBookDetail(detailUrl) {

	const resp = await axios.get(detailUrl),
		$ = cheerio.load(resp.data),
		name = $('h1 span').text().trim(),                          // 获取书名
		imgurl = $('a.nbg img').attr('src');                  // 获取图片地址

	// 获取所有信息
	const infoSpans = $('#info .pl');

	// 筛选作者
	const authorSpan = infoSpans.filter((i, el) => {
		return $(el).text().includes('作者');
	}), author = authorSpan.next('a').text();

	const publishSpan = infoSpans.filter((i, el) => {
		return $(el).text().includes('出版年:');
	});
	const publishDate = publishSpan[0].nextSibling.nodeValue;

	console.log(name, imgurl, author, publishDate);

	return {
		name: name,
		imgurl: imgurl,
		publishDate: publishDate,
		author: author,
	};
}

// getBookDetail('https://book.douban.com/subject/35320923/?icn=index-latestbook-subject')
// 	.then(r => {
// 		console.log(r);
// 	});

async function fetchAll() {

	const links = await getBookLinks(),
		proms = links.map(link => {
			return getBookDetail(link);
		});

	// console.log(proms);

	return Promise.all(proms);
}

// fetchAll()
// 	.then(r => {
// 		console.log(r);
// 	});

async function saveToDB() {

	const books = await fetchAll();
	await Book.bulkCreate(books);
}

saveToDB();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
