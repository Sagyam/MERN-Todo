const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModels");

//@desc Get all goals
//@route GET /api/goals
//@access Public
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();
	res.status(200).json({
		success: true,
		goals,
	});
});

//@desc Update a goal
//@route PUT /api/goals/:id
//@access Public
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400).json({
			success: false,
			message: "Goal not found",
		});
		throw new Error("Goal not found");
	} else {
		const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json({
			success: true,
			goal: updateGoal,
		});
	}
});

//@desc Delete a goal
//@route DELETE /api/goals/:id
//@access Public
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400).json({
			success: false,
			message: "Goal not found",
		});
		throw new Error("Goal not found");
	} else {
		await goal.remove();
		res.status(200).json({
			success: true,
			message: `Delete Goal ${req.params.id}`,
		});
	}
});

//@desc Add a goal
//@route POST /api/goals
//@access Public
const addGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		throw new Error("No text provided");
	}
	const goal = await Goal.create({
		text: req.body.text,
	});
	res.status(200).json({
		success: true,
		goal,
	});
});

module.exports = {
	getGoals,
	updateGoal,
	deleteGoal,
	addGoal,
};
