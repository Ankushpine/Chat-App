const router = require("express").Router();
const protectRoutes = require("../middleware/protectRoute");
const userControlller = require('../controller/user-controller')

router.get('/',protectRoutes, userControlller.getUsersForSideBar)

module.exports = router;