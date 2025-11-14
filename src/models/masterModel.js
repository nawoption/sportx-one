const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        contact: { type: String },
        role: { type: String, default: "Master" },
        cashBalance: { type: Number, default: 0 },
        accountBalance: { type: Number, default: 0 },
        commissionSetting: { type: mongoose.Schema.Types.ObjectId, ref: "CommissionSetting" },
        limitSetting: { type: mongoose.Schema.Types.ObjectId, ref: "LimitSetting" },
        senior: { type: mongoose.Schema.Types.ObjectId, ref: "Senior" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, refPath: "createdByModel" },
        createdByModel: { type: String, enum: ["Admin", "Senior"] },
        status: {
            type: String,
            enum: ["ACTIVE", "BANNED"],
            default: "ACTIVE",
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Master", masterSchema);
