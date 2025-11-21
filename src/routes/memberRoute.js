const memberController = require("../controllers/memberController");
const express = require("express");
const router = express.Router();
const { adminAuth, anyAuth } = require("../middlewares/authMiddlewares");

// Get all Users by Role
router.get("/by-role/:role", adminAuth, memberController.getAllUsersByRole);

// Get Downline Users
router.get("/downline-users", anyAuth, memberController.getDownlineUsers);

// Get User by ID and Role
router.get("/:id", anyAuth, memberController.getUserPaymentInfo);

module.exports = router;
