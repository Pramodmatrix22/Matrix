var fs = require("fs/promises");

const modelGenerator = async (name) => {
	if (name === null || name === undefined)
		throw new Error("Data should not be null or undefined");

	const moduleName = name.split(" ").join("").toLowerCase();

	const createdir = await fs.mkdir(`${process.cwd()}/api/${moduleName}/model`, {
		recursive: true,
	});
	try {
		const status = await fs.lstat(`${process.cwd()}/api/${moduleName}/model`);
		if (status.isDirectory()) {
			const modelcreate = await fs.writeFile(
				`${process.cwd()}/api/${moduleName}/model/${moduleName}.js`,
				`
        const mongoose = require("mongoose");\n const { Schema } = mongoose;\nconst ${moduleName}Schema = new Schema({},{timestamps: true });\nconst ${moduleName}Model = mongoose.model("${moduleName}",${moduleName}Schema);\nmodule.exports = ${moduleName}Model;`,
			);
			return true;
		}
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = modelGenerator;
