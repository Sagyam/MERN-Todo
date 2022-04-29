const mongoose = require("mongoose");

const Schema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [4, "Password must be at least 4 characters"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", Schema);
