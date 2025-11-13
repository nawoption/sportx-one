const router = require("express").Router();

router.use("/admin", require("./adminRoute"));

router.use("/senior", require("./seniorRoute"));

module.exports = router;
