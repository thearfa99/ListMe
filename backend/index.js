require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { authenticateToken } = require("./utilities.js");
const User = require("./models/user.model.js");
const Task = require("./models/task.model.js");
const config = require("./config.json");

const app = express();

mongoose.connect(config.connectionString);

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.status(400).json({ error: true, message: "User already exists" });
    }

    const user = new User({ fullName, email, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    return res.json({ error: false, user, accessToken, message: "Registration Successful" });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userInfo = await User.findOne({ email });
    if (!userInfo) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    return res.json({ error: false, message: "Login Successful", email, accessToken });
});

app.post("/add-task", authenticateToken, async (req, res) => {
    const { text, isComplete } = req.body;
    const { user } = req.user;

    if (!text.trim()) {
        return res.status(400).json({ error: true, message: "Please add a task" });
    }

    try {
        const task = new Task({
            text,
            isComplete: isComplete ?? false,
            userId: user._id,
        });
        await task.save();
        return res.json({
            error: false,
            task,
            message: "Task added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.post("/update-task/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { isComplete } = req.body;
<<<<<<< HEAD
=======
    const { user } = req.user;
>>>>>>> ea83db4a8bfdae82fa47dee25d555d879b5bb551

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id },
            { isComplete: isComplete },
            { new: true},
        );

        if (!task) {
            return res.status(404).json({
                error: true,
                message: "Task not found or unauthorized",
            });
        }

        return res.json({
            error: false,
            task,
            message: "Task updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});

module.exports = app;
