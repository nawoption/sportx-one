const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        contact: { type: String },
        cashBalance: { type: Number, default: 0 },
        accountBalance: { type: Number, default: 0 },
        limitSetting: { type: mongoose.Schema.Types.ObjectId, ref: "LimitSetting" },
        senior: { type: mongoose.Schema.Types.ObjectId, ref: "Senior" },
        master: { type: mongoose.Schema.Types.ObjectId, ref: "Master" },
        agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, refPath: "createdByModel" },
        createdByModel: { type: String, enum: ["Senior", "Master", "Agent"] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
