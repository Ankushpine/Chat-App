const router = require("express").Router();

router.use("/auth", require("./auth-routes"));
router.use("/message", require("./message-routes"));
router.use("/user" , require("./user-routes"));

module.exports = router;

 