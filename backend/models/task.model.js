const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoItem = new Schema({
    id: { type: Date, default: new  Date().getTime() },
    text: { type: String, required: true },
    isComplete: { type: Boolean, default: false},
    userId: { type: String, required: true },
});

module.exports = mongoose.model("Task", todoItem);