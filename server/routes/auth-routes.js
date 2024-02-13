const router = require("express").Router();
const authControllers = require("../controller/auth-controller");

router.post("/signup", authControllers.signUp);
router.post("/signin", authControllers.signIn);
router.post("/signout", authControllers.signOut);

module.exports = router;
