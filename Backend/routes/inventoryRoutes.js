const router = require("express").Router();
const controller = require("../controllers/inventoryController");
const auth = require("../Middleware/authMiddleware");

router.get("/", auth,controller.getInventory);
router.post("/in",auth, controller.stockIn);
router.post("/out", auth, controller.stockOut);

module.exports = router;
