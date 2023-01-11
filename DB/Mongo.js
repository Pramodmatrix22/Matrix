const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const config = require("../config/config.json");

const databaseConnection = () => {
	main().catch((err) => console.log(err));

	async function main() {
		try {
			const data = await mongoose.connect(config.Database, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log(
				"host:",
				data.connection.host,
				"port:",
				data.connection.port,
				"name:",
				data.connection.name,
			);
		} catch (err) {
			console.log("Database not connected");
			console.log(err);
			if (err.code === "ETIMEOUT") {
				console.log("Retrying to connect....");
				main();
			}
		}
	}
};

module.exports = databaseConnection;
