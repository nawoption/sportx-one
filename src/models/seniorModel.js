const mongoose = require("mongoose");

const seniorSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        contact: { type: String },
        role: { type: String, default: "Senior" },
        cashBalance: { type: Number, default: 0 },
        accountBalance: { type: Number, default: 0 },
        commissionSetting: { type: mongoose.Schema.Types.ObjectId, ref: "CommissionSetting" },
        limitSetting: { type: mongoose.Schema.Types.ObjectId, ref: "LimitSetting" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
        status: {
            type: String,
            enum: ["ACTIVE", "BANNED"],
            default: "ACTIVE",
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Senior", seniorSchema);
