const mongoose = require("mongoose");
const { Schema } = mongoose;
const helpSchema = new Schema({ name: String }, { timestamps: true });
const helpModel = mongoose.model("help", helpSchema);
module.exports = helpModel;
