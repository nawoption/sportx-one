const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "Admin" },
        isChangedPassword: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
