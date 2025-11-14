const masterController = require("../controllers/masterController");
const router = require("express").Router();
const { adminAuth, seniorAuth, masterAuth } = require("../middlewares/authMiddlewares");
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
router.post("/register", validateBody(accountCreateSchema), seniorAuth, masterController.register);
router.get("/all", seniorAuth, masterController.getAllmasters);
router.put("/:id/update-status", seniorAuth, masterController.updateStatus);
router.put("/:id/reset-password", seniorAuth, masterController.resetPassword);

router
    .route("/:id")
    .get(seniorAuth, masterController.getProfile)
    .put(seniorAuth, validateBody(accountUpdateSchema), masterController.updateProfile)
    .delete(seniorAuth, masterController.deleteProfile);

module.exports = router;
