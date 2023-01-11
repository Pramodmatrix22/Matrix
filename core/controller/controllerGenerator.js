var fs = require("fs/promises");

const ControllerGenerator = async (name) => {
	if (name === null || name === undefined)
		throw new Error("Controller Name should not be null or undefined");
	const moduleName = name.split(" ").join("").toLowerCase();

	const createdir = await fs.mkdir(
		`${process.cwd()}/api/${moduleName}/controller`,
		{
			recursive: true,
		},
	);

	try {
		const status = await fs.lstat(
			`${process.cwd()}/api/${moduleName}/controller`,
		);
		if (status.isDirectory()) {
			await fs.writeFile(
				`${process.cwd()}/api/${moduleName}/controller/${moduleName}.js`,
				`const Core = require("../../../core");\n const ${moduleName}Service=require("../services/${moduleName}");\nconst ${moduleName}Controller=Core.CoreController(${moduleName}Service);\nmodule.exports = ${moduleName}Controller;`,
				"utf-8",
			);

			return true;
		}
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = ControllerGenerator;
