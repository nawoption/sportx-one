const masterController = require("../controllers/masterController");
const router = require("express").Router();
const { adminAuth, seniorAuth, masterAuth, canEditMaster } = require("../middlewares/authMiddlewares");
const { validateBody } = require("../middlewares/validator");
const { loginSchema, changePasswordSchema } = require("../validations/commonValidation");
const { accountCreateSchema, accountUpdateSchema } = require("../validations/accountValidation");

// Master routes
router.post("/login", validateBody(loginSchema), masterController.login);
router.get("/profile/detail", masterAuth, masterController.getProfile);
router.put("/profile/change-password", masterAuth, validateBody(changePasswordSchema), masterController.changePassword);
router.post("/generate-access-token", masterController.generateAccessToken);
router.get("/verify-token", masterAuth, masterController.verifyToken);

// Senior routes
router.post("/register/by-senior", validateBody(accountCreateSchema), seniorAuth, masterController.register);
router.get("/all/by-senior", seniorAuth, masterController.getAllMasters);
router.put("/:id/update-status/by-senior", seniorAuth, canEditMaster, masterController.updateStatus);
router.put("/:id/reset-password/by-senior", seniorAuth, canEditMaster, masterController.resetPassword);

router
    .route("/:id/by-senior")
    .get(seniorAuth, masterController.getProfile)
    .put(seniorAuth, canEditMaster, validateBody(accountUpdateSchema), masterController.updateProfile);

// Admin routes
router.post("/register/by-admin", adminAuth, validateBody(accountCreateSchema), masterController.register);
router.get("/all/by-admin", adminAuth, masterController.getAllMasters);
router.put("/:id/update-status/by-admin", adminAuth, canEditMaster, masterController.updateStatus);
router.put("/:id/reset-password/by-admin", adminAuth, canEditMaster, masterController.resetPassword);

router
    .route("/:id/by-admin")
    .get(adminAuth, masterController.getProfile)
    .put(adminAuth, canEditMaster, validateBody(accountUpdateSchema), masterController.updateProfile);

module.exports = router;
