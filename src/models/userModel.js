const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        contact: { type: String },
        role: { type: String, default: "User" },
        limitSetting: { type: mongoose.Schema.Types.ObjectId, ref: "LimitSetting" },
        senior: { type: mongoose.Schema.Types.ObjectId, ref: "Senior" },
        master: { type: mongoose.Schema.Types.ObjectId, ref: "Master" },
        agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, refPath: "createdByModel" },
        createdByModel: { type: String, enum: ["Admin", "Senior", "Master", "Agent"] },
        status: {
            type: String,
            enum: ["ACTIVE", "BANNED"],
            default: "ACTIVE",
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
