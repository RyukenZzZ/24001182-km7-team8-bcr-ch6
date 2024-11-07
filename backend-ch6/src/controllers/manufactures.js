const manufactureService = require("../services/manufactures");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

// Get all manufactures
exports.getManufactures = async (req, res, next) => {
  const data = await manufactureService.getManufactures(req);
  if (!data.length) {
    throw new NotFoundError("No manufactures found");
  }
  successResponse(res, data, "Successfully fetched all manufactures");
};

// Get manufacture by ID
exports.getManufactureById = async (req, res, next) => {
  const { id } = req.params;
  const data = await manufactureService.getManufactureById(id);
  if (!data) {
    throw new NotFoundError("Manufacture not found");
  }
  successResponse(res, data, "Successfully fetched manufacture");
};

// Create a new manufacture
exports.createManufacture = async (req, res, next) => {
  const data = await manufactureService.createManufacture(req.body, req.files);
  successResponse(res, data, "Successfully created manufacture");
};

// Update manufacture by ID
exports.updateManufacture = async (req, res, next) => {
  const { id } = req.params;
  const data = await manufactureService.updateManufacture(
    id,
    req.body,
    req.files
  );
  if (!data) {
    throw new NotFoundError("Manufacture not found for update");
  }
  successResponse(res, data, "Successfully updated manufacture");
};

// Delete manufacture by ID
exports.deleteManufactureById = async (req, res, next) => {
  const { id } = req.params;
  const data = await manufactureService.deleteManufactureById(id);
  if (!data) {
    throw new NotFoundError("Manufacture not found for deletion");
  }
  successResponse(res, data, "Successfully deleted manufacture");
};
