const jwt = require("jsonwebtoken");
const brypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Register new user
//@route POST /api/user
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	//Check if input is valid
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({
			success: false,
			message: "Please enter all fields",
		});
	}

	//check if user already exists
	const user = await User.findOne({ email });
	if (user) {
		return res.status(400).json({
			success: false,
			message: "User already exists",
		});
	}

	//hash password
	const salt = await brypt.genSalt(10);
	const hashedPassword = await brypt.hash(password, salt);

	//create new user
	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (newUser) {
		res.status(201).json({
			success: true,
			message: "User created",
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			token: generateToken(newUser._id),
		});
	} else {
		res.status(500).json({
			success: false,
			message: "User not created",
		});
	}
});

//@desc Authenticate user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
	//Check if input is valid
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message: "Please enter all fields",
		});
	}

	//check if user exists
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({
			success: false,
			message: "User does not exist",
			user,
		});
	}

	//check if password is correct
	const isMatch = await brypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).json({
			success: false,
			message: "Invalid password",
		});
	}

	res.status(200).json({
		success: true,
		message: "User logged in",
		id: user._id,
		name: user.name,
		email: user.email,
		token: generateToken(user._id),
	});
});

//@desc Get user data
//@route GET /api/user/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
	const { id, name, email } = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		message: "User data retrieved",
		id,
		name,
		email,
	 });
});

//Generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

module.exports = { registerUser, loginUser, getMe };
