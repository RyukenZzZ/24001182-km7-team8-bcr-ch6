const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
  validateDeleteManufactureById,
} = require("../middlewares/manufacturesValidation");
const manufacturesController = require("../controllers/manufactures");

// Route definitions
router
  .route("/")
  .get(authorization(adminRole, userRole),validateGetManufactures, manufacturesController.getManufactures)
  .post(authorization(adminRole),validateCreateManufacture, manufacturesController.createManufacture);

router
  .route("/:id")
  .get(authorization(adminRole, userRole),validateGetManufactureById, manufacturesController.getManufactureById)
  .put(authorization(adminRole),validateUpdateManufacture, manufacturesController.updateManufacture)
  .delete(authorization(adminRole),
    validateDeleteManufactureById,
    manufacturesController.deleteManufactureById
  );

module.exports = router;
