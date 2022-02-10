//@desc Get all goals
//@route GET /api/goals
//@access Public
const getGoals = function (req, res) {
	res.status(200).json({
		mesaage: "Get Goals",
	});
};

//@desc Update a goal
//@route PUT /api/goals/:id
//@access Public
const updateGoal = function (req, res) {
	res.status(200).json({
		message: `Update Goal ${req.params.id}`,
	});
};

//@desc Delete a goal
//@route DELETE /api/goals/:id
//@access Public
const deleteGoal = function (req, res) {
	res.status(200).json({
		message: `Delete Goal ${req.params.id}`,
	});
};

//@desc Add a goal
//@route POST /api/goals
//@access Public
const addGoal = function (req, res) {
	console.log(req.body);
	res.status(200).json({
		message: "Add Goal",
	});
};

module.exports = {
	getGoals,
	updateGoal,
	deleteGoal,
	addGoal,
};
