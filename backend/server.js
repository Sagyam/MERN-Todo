const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
	//Set static folder
	app.use(express.static(path.join(__dirname, "../frontend", "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => res.send("Please set NODE_ENV to production"));
}
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port ${port}`.cyan.bold);
});
