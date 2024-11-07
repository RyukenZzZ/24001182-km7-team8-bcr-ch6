const express = require("express");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const {
    validateGetModels,
    validateGetModelById,
    validateDeleteModelById,
    validateCreateModel,
    validateUpdateModel,
} = require("../middlewares/models");
const {
    getModels,
    getModelById,
    deleteModelById,
    createModel,
    updateModel,
} = require("../controllers/models");

const router = express.Router();

router
.route("/") 
.get(authorization(adminRole, userRole), validateGetModels, getModels)
.post(authorization(adminRole),validateCreateModel, createModel);

router
.route("/:id")
.get(authorization(adminRole, userRole), validateGetModelById, getModelById)
.put(authorization(adminRole), validateUpdateModel, updateModel)
.delete(authorization(adminRole), validateDeleteModelById, deleteModelById);

module.exports = router;