const Controller = (service) => {
	return {
		async find(req, res, next) {
			try {
				const page = Math.max(0, req.query.page) || 0;
				const perPage = req.query.size || 10;
				console.log(page, perPage);
				const search = req.query.search;
				res.response = await service.find({ perPage, page, search });
			} catch (error) {
				res.response = {
					statusCode: 500,
					message: "Internal Server Error",
					data: String(error),
				};
			} finally {
				next();
			}
		},

		async findOne(req, res, next) {
			try {
				const id = req.params.id;
				res.response = await service.findOne(id);
			} catch (error) {
				res.response = {
					statusCode: 500,
					message: "Internal Server Error",
					data: String(error),
				};
			} finally {
				next();
			}
		},
		async create(req, res, next) {
			try {
				const body = req.body;
				res.response = await service.create(body);
				console.log(res.response);
			} catch (error) {
				res.response = {
					statusCode: 500,
					message: "Internal Server Error",
					data: String(error),
				};
			} finally {
				next();
			}
		},

		async update(req, res, next) {
			try {
				const body = req.body;
				res.response = await service.update(body);
			} catch (error) {
				res.response = {
					statusCode: 500,
					message: "Internal Server Error",
					data: String(error),
				};
			} finally {
				next();
			}
		},

		async delete(req, res, next) {
			try {
				const id = req.params.id;
				res.response = await service.delete(id);
			} catch (error) {
				res.response = {
					statusCode: 500,
					message: "Internal Server Error",
					data: String(error),
				};
			} finally {
				next();
			}
		},
	};
};

module.exports = Controller;
