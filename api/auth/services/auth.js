const bycrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const authModel = require("../model/auth");
const saltModel = require("../model/salt");
const config = require("../../../config/config.json");

const SECRET_KEY = config.JWT_ScreteKey;

const createUser = async (parms) => {
	try {
		const { email, password } = parms;
		const salt = bycrypt.genSaltSync(10);
		const storeSalt = await saltModel.create({ email, salt });
		if (storeSalt) {
			const hash = bycrypt.hashSync(password, salt);
			console.log(hash);
			const createUser = await authModel.create({ email, password: hash });
			if (createUser === null) {
				await saltModel.deleteOne({ email: email });
				return {
					statusCode: 400,
					message: "Failed to create user",
					data: "",
				};
			}
			return {
				statusCode: 201,
				message: "User created succesfully",
				data: createUser,
			};
		}
	} catch (error) {
		throw new Error(String(error));
	}
};

const loginUser = async (prams) => {
	try {
		const { email, password } = prams;
		const storeSalt = await saltModel.findOne({ email: email });
		if (storeSalt) {
			const user = await authModel.findOne({ email });
			const hash = bycrypt.hashSync(password, storeSalt.salt);
			if (hash === user.password) {
				const token = jwt.sign({ email }, SECRET_KEY, { algorithm: "HS256" });
				const addToken = await authModel.updateOne(
					{ email: email },
					{ $push: { jwt: token } },
				);

				if (addToken) {
					return {
						statusCode: 200,
						message: "User login successfull",
						data: { email: email, token: token },
					};
				} else {
					return {
						statusCode: 400,
						message: "User login failed",
						data: "",
					};
				}
			} else {
				return {
					statusCode: 400,
					message: "Password does not match",
					data: "",
				};
			}
		} else {
			return {
				statusCode: 400,
				message: "Email is not registered",
				data: "",
			};
		}
	} catch (error) {
		throw new Error(String(error));
	}
};

module.exports = {
	createUser,
	loginUser,
};
