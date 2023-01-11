module.exports = (req, res) => {
	const { statusCode, data, message } = res.response;
	const success = statusCode >= 400 ? false : true;
	if (!statusCode || !message)
		return res
			.status(500)
			.send({ message: "Proper response properties not set" });
	const customResponse = {
		success,
		statusCode,
		message,
		response: data,
	};

	return res.status(statusCode).send(customResponse);
};
