require("dotenv").config();
console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model.js");
const Task = require("./models/task.model.js");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities.js");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// CREATE ACCOUNT
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName.trim()) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }

    if (!email.trim()) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password.trim()) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exist",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400).json({ message: "User not found " });
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
});

// Add task
app.post("/add-task", authenticateToken, async (req, res) => {
    const { id, text, isComplete } = req.body;
    const { user } = req.user;

    if (!text.trim()) {
        return res.status(400).json({ error: true, message: "Please add a task " });
    }

    try {
        const task = new Task({
            id,
            text,
            isComplete,
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

app.listen(8000, () => {
    console.log('Server started on port 8000');
});

module.exports = app;
