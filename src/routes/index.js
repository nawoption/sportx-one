const router = require("express").Router();

router.use("/admin", require("./adminRoute"));

router.use("/senior", require("./seniorRoute"));

router.use("/master", require("./masterRoute"));

router.use("/agent", require("./agentRoute"));

router.use("/user", require("./userRoute"));

module.exports = router;
