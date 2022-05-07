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
			required: [true, "A goal must have a deadline"],
		},
		startTime: {
			type: String,
			required: [true, "A goal must have a start time"],
		},
		endTime: {
			type: String,
			required: [true, "A goal must have an end time"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Goal", goalSchema);
