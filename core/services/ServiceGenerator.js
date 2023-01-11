var fs = require("fs/promises");

const ServiceGenerator = async (name) => {
	if (name === null || name === undefined)
		throw new Error("Controller Name should not be null or undefined");
	const moduleName = name.split(" ").join("").toLowerCase();

	const createdir = await fs.mkdir(
		`${process.cwd()}/api/${moduleName}/services`,
		{
			recursive: true,
		},
	);

	try {
		const status = await fs.lstat(
			`${process.cwd()}/api/${moduleName}/services`,
		);
		if (status.isDirectory()) {
			await fs.writeFile(
				`${process.cwd()}/api/${moduleName}/services/${moduleName}.js`,
				`const Core = require("../../../core");\n const ${moduleName}Model=require("../model/${moduleName}");\n const ${moduleName}Service=Core.CoreService(${moduleName}Model);\n module.exports = ${moduleName}Service;`,
				"utf-8",
			);

			return true;
		}
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = ServiceGenerator;
