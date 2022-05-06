import axios from "axios";

const REGISTER_API_URL = "/api/users/register";
const LOGIN_API_URL = "/api/users/login";

const register = async (userData) => {
	const response = await axios.post(REGISTER_API_URL, userData);

	if (response.status === 201) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

const login = async (userData) => {
	const response = await axios.post(LOGIN_API_URL, userData);

	if (response.status === 200) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

const logout = async () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	logout,
	login,
};

export default authService;
