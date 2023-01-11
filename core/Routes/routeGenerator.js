var fs = require("fs/promises");

const routeGenerator = async (name) => {
	try {
		var moduleName = name.split(" ").join("").toLowerCase();

		const createdir = await fs.mkdir(
			`${process.cwd()}/api/${moduleName}/routes`,
			{
				recursive: true,
			},
		);
		const status = await fs.lstat(`${process.cwd()}/api/${moduleName}/routes`);
		if (status.isDirectory()) {
			await fs.writeFile(
				`${process.cwd()}/api/${moduleName}/routes/routes.js`,
				`const router = require("express").Router();\nconst ${moduleName}Controller =require("../controller/${moduleName}");\nrouter.get("/",${moduleName}Controller.find,);\nrouter.get("/:id",${moduleName}Controller.findOne,);\nrouter.post("/",${moduleName}Controller.create);\nrouter.delete("/:id", ${moduleName}Controller.delete);\nrouter.put("/", ${moduleName}Controller.update);\nmodule.exports = router;`,
				"utf-8",
			);

			return true;
		} else {
			throw new Error("Directory not found");
		}
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = routeGenerator;
