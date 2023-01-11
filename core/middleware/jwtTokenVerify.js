const jwt = require("jsonwebtoken");

const AuthModel = require("../../api/auth/model/auth");
const config = require("../../config/config.json");

const SECRET_KEY = config.JWT_ScreteKey;

const JWT_VERIFY = (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (error, decoded) => {
			if (error) reject(error);
			resolve(decoded);
		});
	});

const JwtVerfication = async (req, res, next) => {
	const { authorization } = req.headers;

	try {
		if (res.skipVerification) {
			next();
		} else {
			if (!authorization) {
				const message = "Bad Token:Missing authorization in request headers";
				const response = {
					statusCode: 400,
					message: message,
					data: "",
				};
				return res.status(400).send(response);
			} else {
				const token = authorization.split(" ")[1];

				const data = await AuthModel.findOne({
					jwt: { $in: token },
				});

				if (data) {
					await JWT_VERIFY(token);
					next();
				} else {
					const response = {
						statusCode: 400,
						message: "Bad Token:Token Expired!",
						data: "",
					};
					return res.status(400).send(response);
				}
			}
		}
	} catch (error) {
		const response = {
			statusCode: 500,
			message: "Internal Server Error",
			data: String(error),
		};
		return res.status(500).send(response);
	}
};

module.exports = JwtVerfication;
