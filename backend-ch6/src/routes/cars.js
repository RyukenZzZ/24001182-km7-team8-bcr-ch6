const express = require("express");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const {
  validateGetParams,
  validatePostCars,
  validatePutCars,
  validateGetQuery,
} = require("../middlewares/cars");
const {
  getCars,
  getCarsById,
  addCars,
  updateCars,
  deleteCars,
} = require("../controllers/cars");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetQuery, getCars)
  .post(authorization(adminRole),validatePostCars, addCars);
router
  .route("/:id")
  .get(authorization(adminRole, userRole),validateGetParams, getCarsById)
  .put(authorization(adminRole),validatePutCars, updateCars)
  .delete(authorization(adminRole),validateGetParams, deleteCars);
module.exports = router;

