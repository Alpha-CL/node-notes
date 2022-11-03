import axios from "axios";

const axiosIns = axios.create();

// axios interceptors
axiosIns.interceptors.response.use(function (resp) {

	// determine whether the request is normal
	if (resp.data.code !== 0) {
		console.log(resp.data.msg)
		return null;
	}

	return resp.data.data;
});

export default axiosIns;
