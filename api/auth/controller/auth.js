const authService = require("../services/auth");

const CreateUser = async (req, res, next) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const createUser = await authService.createUser({ email, password });
		res.response = createUser;
	} catch (error) {
		res.response = {
			statusCode: 500,
			message: "Internal Server Error",
			data: String(error),
		};
	} finally {
		next();
	}
};

const LoginUser = async (req, res, next) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const login = await authService.loginUser({ email, password });
		res.response = login;
	} catch (error) {
		res.response = {
			statusCode: 500,
			message: "Internal Server Error",
			data: String(error),
		};
	} finally {
		next();
	}
};

module.exports = { CreateUser, LoginUser };
