const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModels");
const User = require("../models/userModels");

//@desc Get all goals
//@route GET /api/goals
//@access Public
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
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
		return res.status(400).json({
			success: false,
			message: "Goal not found",
		});
	} else if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "User not found",
		});
	} else if (goal.user.toString() !== req.user.id) {
		return res.status(401).json({
			success: false,
			message: "You are not authorized to delete this goal",
		});
	} else {
		const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json({
			success: true,
			message: "Goal updated successfully",
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
		return res.status(400).json({
			success: false,
			message: "Goal not found",
		});
	} else if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "User not found",
		});
	} else if (goal.user.toString() !== req.user.id) {
		return res.status(401).json({
			success: false,
			message: "You are not authorized to delete this goal",
		});
	} else {
		goal.remove();
		res.status(200).json({
			success: true,
			message: "Goal deleted",
			id: req.params.id,
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
		user: req.user.id,
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
