const mongoose = require("mongoose");
const Config = require("../../../config/config.json");

const { Schema, model } = mongoose;
const User = new Schema(
	{
		email: {
			type: String,
			required: [true, "user email is required"],
			unique: [true, "User already present"],
		},
		password: { type: String, required: [true, "user password is missing"] },
		jwt: {
			type: [String],
			validate: [
				loginLimt,
				`{PATH} exceeds the limit of user ${Config.Login_Session_No}`,
			],
		},
	},
	{ timestamps: true },
);

function loginLimt(login) {
	return login.length < Config.Login_Session_No;
}

module.exports = model("users", User);
