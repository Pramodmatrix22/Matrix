const router = require("express").Router();
const helpController =require("../controller/help");
router.get("/",helpController.find,);
router.get("/:id",helpController.findOne,);
router.post("/",helpController.create);
router.delete("/:id", helpController.delete);
router.put("/", helpController.update);
module.exports = router;