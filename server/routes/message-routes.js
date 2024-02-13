const router = require("express").Router();
const messageController = require("../controller/message-controller")
const protectRoutes = require("../middleware/protectRoute");

router.post("/send/:id" , protectRoutes , messageController.sendMessage);
router.get("/get/:id" , protectRoutes , messageController.getMessage);

module.exports=router;