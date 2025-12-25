const router = require("express").Router();
const controller = require("../controllers/productController");
const auth = require("../Middleware/authMiddleware");

router.post("/",auth, controller.createProduct);
router.get("/", auth, controller.getProducts);
router.get("/:id", auth, controller.getSingleProduct);


router.put("/:id", auth, controller.updateProduct);


router.delete("/:id", auth, controller.deleteProduct);

module.exports = router;
