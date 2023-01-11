const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Salt = new Schema(
	{
		email: {
			type: String,
			required: [true, "user email is required"],
			unique: [true, "User already present"],
		},
		salt: { type: String, required: [true, "user password is missing"] },
	},
	{ timestamps: true },
);

module.exports = model("salts", Salt);
