const config = require("../../config/config.json");
const skipList = config.Skip_API_Token_Verification;

const verficationSkipper = (req, res, next) => {
	const url = req.url.split("/");
	skipList.includes(url[1])
		? (res.skipVerification = true)
		: (res.skipVerification = false);
	next();
};

module.exports = verficationSkipper;
