const mongoose = require("mongoose");

const balanceAccountSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "ownerModel",
        },
        ownerModel: {
            type: String,
            required: true,
            enum: ["Admin", "Senior", "Master", "Agent", "User"],
        },
        cashBalance: { type: Number, default: 0 },
        accountBalance: { type: Number, default: 0 },
        commissionBalance: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("BalanceAccount", balanceAccountSchema);
