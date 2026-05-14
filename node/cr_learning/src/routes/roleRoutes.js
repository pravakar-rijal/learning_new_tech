const { Router } = require("express");

const RoleController = require("../controllers/roleController");

const router = Router();

router.get("/", RoleController.getAllRoles);
router.get("/:id", RoleController.getRoleById);
router.post("/", RoleController.createRole);
router.put("/:id", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

module.exports = router;