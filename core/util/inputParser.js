const fs = require("fs");
const chalk = require("chalk");
const mime = require("mime");
const { v4: uuidv4 } = require("uuid");

const fileUpload = (data, name) => {
	const file = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
	const fileName = `${name}.${mime.extension(file[1])}`;

	try {
		var fileData = Buffer.from(file[2], "base64");
		fs.writeFileSync("./public/uploads/" + fileName, fileData, "utf8");
		return "./public/uploads/" + fileName;
	} catch (err) {
		console.log(chalk.red("FILE UPLOAD ERROR:") + err);
		throw new Error("File Upload Error");
	}
};

module.exports = (body) => {
	let data = {};
	try {
		Object.values(body).map((item, index) => {
			const key = Object.keys(body);
			//parsing through body
			if (Array.isArray(item)) {
				if (typeof item[0] === "object" && !Array.isArray(item[0])) {
					Object.keys(item[0]).map((KEY) => {
						if (KEY === "url") {
							data = {
								[key[index]]: fileUpload(item[0].url, item[0].name),
								...data,
							};
						}
					});
				} else {
					data = { [key[index]]: item, ...data };
				}
			} else if (typeof item === "string") {
				if (item.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
					data = {
						[key[index]]: fileUpload(item, uuidv4()),
						...data,
					};
				} else {
					data = { [key[index]]: item, ...data };
				}
			} else {
				data = { [key[index]]: item, ...data };
			}
		});
		console.log("File upload Successfully");
		return data;
	} catch (err) {
		console.log(chalk.red("INPUT PARSER ERROR:") + err);
		return err;
	}
};
