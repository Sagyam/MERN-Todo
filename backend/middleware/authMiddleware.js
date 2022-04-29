const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
	let token;
	try {
		const startsWithBearer = req.headers.authorization.startsWith("Bearer ");
		token = req.headers.authorization.split(" ")[1];
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: "Missing or invalid authorization header",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: "Token is not valid",
		});
	}
});

module.exports = { protect };
