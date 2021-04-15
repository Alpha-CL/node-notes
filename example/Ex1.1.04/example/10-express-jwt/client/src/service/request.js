///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import axios from "axios";


//-------------------------------------------------------------------------------------------------------------------//



export default function () {

	// 1. 发送请求的时候，如果 token，需要附带到响应头中
	const token = localStorage.getItem("token");

	let instance = axios;

	if (token) {

		instance = axios.create({

			headers: {

				authorization: `bearer ${token}`
			}
		});
	}


	instance.interceptors.response.use(
		resp => {

			// 2. 响应的时候，如果有 token，保存 token 到本地( localstore )
			if (resp.headers.authorization) {

				localStorage.setItem('token', resp.headers.authorization);
			}

			return resp;

		},
		err => {

			// 3. 响应的时候，如果响应的消息码是 403 ( 没有 token，token 失效 )，在本地删除 token
			if (err.response.status === 403) {

				localStorage.removeItem('token');
			}

			return Promise.reject(err);
		}
	);

	return instance;
};





//-------------------------------------------------------------------------------------------------------------------//





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
