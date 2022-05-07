const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		goal: {
			type: String,
			required: [true, "Goal is required"],
		},
		completed: {
			type: Boolean,
			default: false,
		},
		deadline: {
			type: Date,
			required: false,
		},
		startTime: {
			type: String,
			required: false,
		},
		endTime: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Goal", goalSchema);
