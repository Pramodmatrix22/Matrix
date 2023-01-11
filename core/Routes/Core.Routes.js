const fs = require("fs");
const router = require("express").Router();
const JwtVerfication = require("../middleware/jwtTokenVerify");
const SkipVerification = require("../middleware/skipTokenVerfication");
const config = require("../../config/config.json");
const response = require("../util/response");
const BASE_DIR = process.cwd() + "/api";

let files = fs.readdirSync(BASE_DIR);
for (let path of files) {
	const apirouter = require(`../../api/${path}/routes/routes`);
	router.use(`/${path}`, apirouter, response);
}

router.use(config.API_Base_URL, SkipVerification, JwtVerfication, router);
module.exports = router;
