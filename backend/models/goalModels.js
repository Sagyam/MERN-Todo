const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		text: {
			type: String,
			required: [true, "A goal must have text"],
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Goal", goalSchema);
