const Admin = require("../models/adminModel");
const Senior = require("../models/seniorModel");
const Master = require("../models/masterModel");
const Agent = require("../models/agentModel");
const User = require("../models/userModel");

const { verifyToken } = require("../utils/helper");

// Verify token and attach admin to request
const adminAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);

            req.admin = await Admin.findById(decoded.id).select("-password");

            if (!req.admin) {
                return res.status(401).json({ message: "Admin not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

const seniorAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);

            req.senior = await Senior.findById(decoded.id).select("-password");

            if (!req.senior) {
                return res.status(401).json({ message: "Senior not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

const masterAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);

            req.master = await Master.findById(decoded.id).select("-password");

            if (!req.master) {
                return res.status(401).json({ message: "Master not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

const agentAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);

            req.agent = await Agent.findById(decoded.id).select("-password");

            if (!req.agent) {
                return res.status(401).json({ message: "Master not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

const userAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Master not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { adminAuth, seniorAuth, masterAuth, agentAuth, userAuth };
