///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//-------------------------------------------------------------------------------------------------------------------//


login.onclick = function () {

	fetch('api/admin/login', {

		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			loginId: 'alpha',
			loginPwd: '666666'
		})
	})
		.then(resp => resp.json())
		.then(resp => {
			console.log(resp);
		});
};


updateStu.onclick = function () {

	fetch('api/student/3903', {

		method: 'PUT',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			name: '阿尔法',
		})
	})
		.then(resp => resp.json())
		.then(resp => {
			console.log(resp);
		});
};


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


/** 简单请求 **/

// fetch("http://localhost:9527/api/student")
// 	.then((resp) => resp.json())
// 	.then((resp) => {
// 		console.log(resp);
// 	});


/** 预检请求 **/

// fetch("http://localhost:9527/api/student", {
//
// 	method: 'POST',
// 	headers: {
// 		"content-type": "application/json",
// 		a: 1,
// 	},
// 	credentials: "include"
//
// })
// 	.then((resp) => resp.json())
// 	.then((resp) => {
// 		console.log(resp);
// 	});


//-------------------------------------------------------------------------------------------------------------------//


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
