const inputParser = require("../util/inputParser");

const Service = (model) => {
	return {
		async find(param) {
			try {
				const { perPage, page, search } = param;
				const total = await model.find().count();
				const data = await model
					.find({}, { __v: 0 })
					.skip(perPage * page)
					.limit(perPage)
					.sort({ createdAt: "desc" });
				if (data.length > 0) {
					return {
						statusCode: 200,
						message: "Data available",
						data: {
							response: data,
							page: page,
							showing: data.length,
							total: total,
						},
					};
				} else {
					return {
						statusCode: 200,
						message: "Data Empty",
						data: {
							response: [],
							page: page,
							showing: data.length,
							total: total,
						},
					};
				}
			} catch (err) {
				throw new Error(String(err));
			}
		},
		async findOne(id) {
			try {
				const data = await model.findOne({ _id: id });
				if (data) {
					return {
						statusCode: 200,
						message: "Data available",
						data: data,
					};
				} else {
					return {
						statusCode: 400,
						message: "Data not available",
						data: [],
					};
				}
			} catch (err) {
				throw new Error(String(err));
			}
		},

		async create(param) {
			try {
				const body = inputParser(param);
				const data = await model.create(body);
				if (data) {
					return {
						statusCode: 200,
						message: "Data added succesfully",
						data: data,
					};
				}
			} catch (err) {
				throw new Error(String(err));
			}
		},

		async update(param) {
			try {
				const id = param._id || param.id;
				const body = inputParser(param);
				console.log(id, body);
				delete body._id || body.id;
				const data = await model.findByIdAndUpdate({ _id: id }, { ...body });
				if (data) {
					return {
						statusCode: 200,
						message: "Data updated succesfully",
						data: data,
					};
				}
			} catch (err) {
				throw new Error(String(err));
			}
		},
		async delete(id) {
			try {
				const data = await model.deleteOne({ _id: id });
				if (data) {
					return {
						statusCode: 200,
						message: "Data deleted succesfully",
						data: data,
					};
				}
			} catch (err) {
				throw new Error(String(err));
			}
		},
	};
};

module.exports = Service;
