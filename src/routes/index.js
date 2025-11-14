const router = require("express").Router();

router.use("/admin", require("./adminRoute"));

router.use("/senior", require("./seniorRoute"));

router.use("/master", require("./masterRoute"));

module.exports = router;
