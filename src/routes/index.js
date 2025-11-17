const router = require("express").Router();

router.use("/admin", require("./adminRoute"));

router.use("/senior", require("./seniorRoute"));

router.use("/master", require("./masterRoute"));

router.use("/agent", require("./agentRoute"));

module.exports = router;
