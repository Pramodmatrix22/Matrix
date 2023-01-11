const chalk = require("chalk");
const fs = require("fs");

const Controller = require("./controller/controllerGenerator");
const Service = require("./services/ServiceGenerator");
const Model = require("./model/modelgenerator");
const Route = require("./Routes/routeGenerator");
const BASE_DIR = process.cwd() + "/api";

const ApiGenerator = async (name) => {
	let files = fs.readdirSync(BASE_DIR);

	try {
		console.log(chalk.green("Creating API ..."));
		for (let path of files) {
			if (path === name) {
				throw new Error("Api already exists");
			}
		}
		await Controller(name);
		await Service(name);
		await Model(name);
		await Route(name);
		console.log(chalk.green("API created successfully"));
	} catch (err) {
		if (String(err) !== "Api already exists") {
			fs.rmSync(`${BASE_DIR}/${name}`, { recursive: true });
		}
		console.log(chalk.red("ERROR:FAILED TO CREATE API"));
		console.log(err);
	}
};

module.exports = ApiGenerator;
