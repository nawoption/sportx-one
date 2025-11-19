const router = require("express").Router();
const PaymentController = require("../controllers/paymentTransactionController");
const { anyAuth } = require("../middlewares/authMiddlewares");
const { validateBody } = require("../middlewares/validator");
const { paymentTransactionSchema } = require("../validations/paymentValidation");

// Create a payment transaction (transfer)
// Any authenticated role can create a transaction (actor is taken from the token)
router.post("/create", anyAuth, validateBody(paymentTransactionSchema), PaymentController.createTransaction);

module.exports = router;
