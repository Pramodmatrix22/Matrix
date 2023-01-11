require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

/*User define*/
const coreRouter = require("./core/Routes/Core.Routes");
const dbConnection = require("./DB/Mongo");
const ENVIRONMENT = process.env.NODE_ENV || "development";
const app = express();

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "./public/uploads",
		limits: { fileSize: 52428800 },
	}),
);

const __options = {
	uploadDir: "./public/uploads",
	autoClean: false,
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/public", express.static("public"));
app.get("/", (req, res) => {
	res.status(200).send({ response: ENVIRONMENT });
});
app.use(coreRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dbConnection();

module.exports = app;
