const userController = require("../controllers/userController");
const router = require("express").Router();
const {
    agentAuth,
    seniorAuth,
    masterAuth,
    userAuth,
    canEditUser,
    adminAuth,
} = require("../middlewares/authMiddlewares");
const { validateBody } = require("../middlewares/validator");
const { loginSchema, changePasswordSchema } = require("../validations/commonValidation");
const { accountCreateSchema, userAccountUpdateSchema } = require("../validations/accountValidation");

// User routes
router.post("/login", validateBody(loginSchema), userController.login);
router.get("/profile/detail", userAuth, userController.getProfile);
router.put("/profile/change-password", userAuth, validateBody(changePasswordSchema), userController.changePassword);
router.post("/generate-access-token", userController.generateAccessToken);
router.get("/verify-token", userAuth, userController.verifyToken);

// Agent routes
router.post("/register/by-agent", validateBody(accountCreateSchema), agentAuth, userController.register);
router.get("/all/by-agent", agentAuth, userController.getAllUsers);
router.put("/:id/update-status/by-agent", agentAuth, canEditUser, userController.updateStatus);
router.put("/:id/reset-password/by-agent", agentAuth, canEditUser, userController.resetPassword);

router
    .route("/:id/by-agent")
    .get(agentAuth, userController.getProfile)
    .put(agentAuth, canEditUser, validateBody(userAccountUpdateSchema), userController.updateProfile);

// Master routes
router.post("/register/by-master", validateBody(accountCreateSchema), masterAuth, userController.register);
router.get("/all/by-master", masterAuth, userController.getAllUsers);
router.put("/:id/update-status/by-master", masterAuth, canEditUser, userController.updateStatus);
router.put("/:id/reset-password/by-master", masterAuth, canEditUser, userController.resetPassword);

router
    .route("/:id/by-master")
    .get(masterAuth, userController.getProfile)
    .put(masterAuth, canEditUser, validateBody(userAccountUpdateSchema), userController.updateProfile);

// Senior routes
router.post("/register/by-senior", validateBody(accountCreateSchema), seniorAuth, userController.register);
router.get("/all/by-senior", seniorAuth, userController.getAllUsers);
router.put("/:id/update-status/by-senior", seniorAuth, canEditUser, userController.updateStatus);
router.put("/:id/reset-password/by-senior", seniorAuth, canEditUser, userController.resetPassword);

router
    .route("/:id/by-senior")
    .get(seniorAuth, userController.getProfile)
    .put(seniorAuth, canEditUser, validateBody(userAccountUpdateSchema), userController.updateProfile);

// Admin routes
router.post("/register/by-admin", adminAuth, validateBody(accountCreateSchema), userController.register);
router.get("/all/by-admin", adminAuth, userController.getAllUsers);
router.put("/:id/update-status/by-admin", adminAuth, canEditUser, userController.updateStatus);
router.put("/:id/reset-password/by-admin", adminAuth, canEditUser, userController.resetPassword);

router
    .route("/:id/by-admin")
    .get(adminAuth, userController.getProfile)
    .put(adminAuth, canEditUser, validateBody(userAccountUpdateSchema), userController.updateProfile)
    .delete(adminAuth, canEditUser, userController.deleteProfile);

module.exports = router;
