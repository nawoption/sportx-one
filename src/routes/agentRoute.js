const agentController = require("../controllers/agentController");
const router = require("express").Router();
const { agentAuth, seniorAuth, masterAuth } = require("../middlewares/authMiddlewares");
const { validateBody } = require("../middlewares/validator");
const { loginSchema, changePasswordSchema } = require("../validations/commonValidation");
const { accountCreateSchema, accountUpdateSchema } = require("../validations/accountValidation");

// Agent routes
router.post("/login", validateBody(loginSchema), agentController.login);
router.get("/profile/detail", agentAuth, agentController.getProfile);
router.put("/profile/change-password", agentAuth, validateBody(changePasswordSchema), agentController.changePassword);
router.post("/generate-access-token", agentController.generateAccessToken);
router.get("/verify-token", agentAuth, agentController.verifyToken);

// Master routes
router.post("/register", validateBody(accountCreateSchema), masterAuth, agentController.register);
router.get("/all", masterAuth, agentController.getAllagents);
router.put("/:id/update-status", masterAuth, agentController.updateStatus);
router.put("/:id/reset-password", masterAuth, agentController.resetPassword);

router
    .route("/:id")
    .get(masterAuth, agentController.getProfile)
    .put(masterAuth, validateBody(accountUpdateSchema), agentController.updateProfile)
    .delete(masterAuth, agentController.deleteProfile);

module.exports = router;
