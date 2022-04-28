const asyncHandler = require("express-async-handler");

//@desc Get all goals
//@route GET /api/goals
//@access Public
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		mesaage: "Get Goals",
	});
});

//@desc Update a goal
//@route PUT /api/goals/:id
//@access Public
const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Update Goal ${req.params.id}`,
	});
});

//@desc Delete a goal
//@route DELETE /api/goals/:id
//@access Public
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Delete Goal ${req.params.id}`,
	});
});

//@desc Add a goal
//@route POST /api/goals
//@access Public
const addGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		throw new Error("No text provided");
	}
	console.log(req.body.text);
	res.status(200).json({
		message: "Add Goal",
	});
});

module.exports = {
	getGoals,
	updateGoal,
	deleteGoal,
	addGoal,
};
