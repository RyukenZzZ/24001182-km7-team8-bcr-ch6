const express = require("express");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const {
  validateGetParamsCarsType,
  validateGetQueryType,
  validatePostCarsType,
  validatePutCarsType,
} = require("../middlewares/type");
const {
  getCarsType,
  getCarsTypeById,
  addCarsType,
  updateCarsType,
  deleteCarsType,
} = require("../controllers/type");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetQueryType, getCarsType)
  .post(authorization(adminRole), validatePostCarsType, addCarsType);
router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetParamsCarsType, getCarsTypeById)
  .put(authorization(adminRole), validatePutCarsType, updateCarsType)
  .delete(authorization(adminRole), validateGetParamsCarsType, deleteCarsType);
module.exports = router;
