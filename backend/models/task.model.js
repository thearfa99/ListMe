const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const todoItem = new Schema({
    id: { type: String, default: uuidv4 },  // UUID for unique task identification
    text: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdTime: { type: Date, default: Date.now },  // Timestamp for task creation
    completedTime: { type: Date },  // Timestamp for task completion
    description: { type: String }  // Optional description field
});

module.exports = mongoose.model("Task", todoItem);
